import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { PrediccionService, EvaluacionEstadistica } from '../../services/prediccion.service';

type NivelRiesgo = 'bajo' | 'medio' | 'alto';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent {

  // ── Estado base ────────────────────────────────────────────────
  evaluaciones = signal<EvaluacionEstadistica[]>([]);
  cargando = signal(true);
  error = signal<string | null>(null);

  // ── Filtros ───────────────────────────────────────────────────
  filtroTipo = signal<string>('todos');
  filtroCanton = signal<string>('todos');

  cantones = ['todos', 'Guayaquil', 'Durán', 'Samborondón'];
  tiposEvaluacion = [
    { valor: 'todos', etiqueta: 'Todas' },
    { valor: 'diabetes', etiqueta: 'Diabetes' },
    { valor: 'cardiovascular', etiqueta: 'Cardiovascular' },
  ];

  constructor(private prediccionService: PrediccionService) {
    this.cargarDatos();
  }

  cargarDatos() {
    this.cargando.set(true);
    this.error.set(null);
    this.prediccionService.obtenerEstadisticas().subscribe({
      next: datos => {
        this.evaluaciones.set(datos);
        this.cargando.set(false);
      },
      error: () => {
        // El endpoint GET /api/v1/evaluaciones todavía no existe o falló.
        this.error.set('No se pudieron cargar las estadísticas. Verifica que el endpoint /evaluaciones esté disponible en el backend.');
        this.cargando.set(false);
      }
    });
  }

  onFiltroTipoChange(event: Event) {
    this.filtroTipo.set((event.target as HTMLSelectElement).value);
  }

  onFiltroCantonChange(event: Event) {
    this.filtroCanton.set((event.target as HTMLSelectElement).value);
  }

  // ── Datos filtrados (filtrado en cliente; si el volumen crece, mover a filtros de backend) ──
  evaluacionesFiltradas = computed(() => {
    const tipo = this.filtroTipo();
    const canton = this.filtroCanton();
    return this.evaluaciones().filter(ev =>
      (tipo === 'todos' || ev.tipo_enfermedad === tipo) &&
      (canton === 'todos' || ev.canton === canton)
    );
  });

  // Deriva un nivel de riesgo (bajo/medio/alto) a partir de prob_hibrida,
  // solo para presentación en el gráfico de distribución.
  private nivelRiesgo(ev: EvaluacionEstadistica): NivelRiesgo {
    const prob = ev.prob_hibrida <= 1 ? ev.prob_hibrida * 100 : ev.prob_hibrida;
    if (prob >= 70) return 'alto';
    if (prob >= 40) return 'medio';
    return 'bajo';
  }

  // ── KPIs ──────────────────────────────────────────────────────
  totalEvaluaciones = computed(() => this.evaluacionesFiltradas().length);

  porcentajeConRiesgo = computed(() => {
    const datos = this.evaluacionesFiltradas();
    if (!datos.length) return 0;
    const conRiesgo = datos.filter(ev => ev.hay_riesgo).length;
    return Math.round((conRiesgo / datos.length) * 100);
  });

  evaluacionesEsteMes = computed(() => {
    const ahora = new Date();
    return this.evaluacionesFiltradas().filter(ev => {
      const f = new Date(ev.fecha_hora);
      return f.getMonth() === ahora.getMonth() && f.getFullYear() === ahora.getFullYear();
    }).length;
  });

  cantonConMasEvaluaciones = computed(() => {
    const conteo: Record<string, number> = {};
    for (const ev of this.evaluacionesFiltradas()) {
      conteo[ev.canton] = (conteo[ev.canton] || 0) + 1;
    }
    const entradas = Object.entries(conteo);
    if (!entradas.length) return '—';
    return entradas.sort((a, b) => b[1] - a[1])[0][0];
  });

  // ── Datos para gráficos (formato ngx-charts) ─────────────────

  // Evaluaciones por mes, separadas por tipo (line chart multi-serie)
  datosPorMes = computed(() => {
    const datos = this.evaluacionesFiltradas();
    const meses: { clave: string; etiqueta: string }[] = [];
    const hoy = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1);
      meses.push({
        clave: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
        etiqueta: d.toLocaleDateString('es-EC', { month: 'short' }),
      });
    }
    const tipos = ['diabetes', 'cardiovascular'];
    const nombres: Record<string, string> = { diabetes: 'Diabetes', cardiovascular: 'Cardiovascular' };

    return tipos.map(tipo => ({
      name: nombres[tipo] ?? tipo,
      series: meses.map(m => ({
        name: m.etiqueta,
        value: datos.filter(ev => ev.tipo_enfermedad === tipo && ev.fecha_hora.startsWith(m.clave)).length,
      })),
    }));
  });

  // Distribución de niveles de riesgo (derivados de prob_hibrida)
  datosPorRiesgo = computed(() => {
    const datos = this.evaluacionesFiltradas();
    const niveles: { clave: NivelRiesgo; etiqueta: string }[] = [
      { clave: 'bajo', etiqueta: 'Riesgo bajo' },
      { clave: 'medio', etiqueta: 'Riesgo medio' },
      { clave: 'alto', etiqueta: 'Riesgo alto' },
    ];
    return niveles.map(n => ({
      name: n.etiqueta,
      value: datos.filter(ev => this.nivelRiesgo(ev) === n.clave).length,
    }));
  });

  // Top establecimientos recomendados (bar horizontal)
  datosPorEstablecimiento = computed(() => {
    const datos = this.evaluacionesFiltradas();
    const conteo: Record<string, number> = {};
    for (const ev of datos) {
      if (!ev.hospital_top1) continue;
      conteo[ev.hospital_top1] = (conteo[ev.hospital_top1] || 0) + 1;
    }
    return Object.entries(conteo)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([nombre, valor]) => ({ name: nombre, value: valor }));
  });

  // Evaluaciones por cantón y tipo de seguro (bar vertical agrupado)
  datosPorCantonSeguro = computed(() => {
    const datos = this.evaluacionesFiltradas();
    const cantonesReales = ['Guayaquil', 'Durán', 'Samborondón'];
    const seguros = ['IESS', 'MSP', 'ISSFA', 'ISSPOL', 'Privado', 'Ninguno'];
    return cantonesReales.map(canton => ({
      name: canton,
      series: seguros.map(seguro => ({
        name: seguro,
        value: datos.filter(ev => ev.canton === canton && ev.tipo_seguro === seguro).length,
      })),
    }));
  });

  // Bonus: qué modelo "gana" con más frecuencia (random_forest / xgboost / híbrido)
  datosPorModeloGanador = computed(() => {
    const datos = this.evaluacionesFiltradas();
    const conteo: Record<string, number> = {};
    for (const ev of datos) {
      if (!ev.modelo_ganador) continue;
      conteo[ev.modelo_ganador] = (conteo[ev.modelo_ganador] || 0) + 1;
    }
    return Object.entries(conteo).map(([nombre, valor]) => ({ name: nombre, value: valor }));
  });

  // ── Paleta de colores (coherente con el resto del sitio) ──────
  esquemaPrincipal: Color = {
    name: 'esquemaPrincipal',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#e67e22', '#c0392b', '#2e86ab', '#8e44ad', '#27ae60', '#0d9488'],
  };

  esquemaRiesgo: Color = {
    name: 'esquemaRiesgo',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#27ae60', '#f39c12', '#c0392b'],
  };
}