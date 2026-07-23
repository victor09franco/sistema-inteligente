import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { PrediccionService,Paciente, EvaluacionHistorial } from '../../services/prediccion.service';


@Component({
  selector: 'app-historial',
  imports: [CommonModule, FormsModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent implements OnInit, OnDestroy {

   // ── Búsqueda ─────────────────────────────────────────────
  terminoBusqueda  = '';
  buscando         = false;
  resultadosBusqueda: Paciente[] = [];
  sinResultados    = false;
  private busqueda$ = new Subject<string>();
  private destroy$  = new Subject<void>();
 
  // ── Paciente seleccionado ─────────────────────────────────
  pacienteSeleccionado: Paciente | null = null;
 
  // ── Historial ─────────────────────────────────────────────
  evaluaciones:         EvaluacionHistorial[] = [];
  evaluacionesFiltradas: EvaluacionHistorial[] = [];
  cargandoHistorial    = false;
 
  // ── Filtro por tipo ───────────────────────────────────────
  filtroTipo: 'todas' | 'diabetes' | 'cardiovascular' = 'todas';
 
  // ── Evaluación expandida ──────────────────────────────────
  idExpandido: number | null = null;
 
  constructor(private prediccionService: PrediccionService) {}
 
  ngOnInit(): void {
    // Búsqueda con debounce — espera 500ms antes de llamar a la API
    this.busqueda$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(termino => {
      if (termino.trim().length >= 2) {
        this.ejecutarBusqueda(termino.trim());
      } else {
        this.resultadosBusqueda = [];
        this.sinResultados      = false;
      }
    });
  }
 
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
 
  // ── Buscador ─────────────────────────────────────────────
 
  onInputBusqueda(): void {
    this.busqueda$.next(this.terminoBusqueda);
    // Resetear selección si el usuario modifica el texto
    if (this.pacienteSeleccionado) {
      this.pacienteSeleccionado = null;
      this.evaluaciones         = [];
      this.evaluacionesFiltradas = [];
    }
  }
 
  ejecutarBusqueda(q: string): void {
    this.buscando       = true;
    this.sinResultados  = false;
 
    this.prediccionService.buscarPacientes(q).subscribe({
      next: (lista) => {
        this.resultadosBusqueda = lista;
        this.sinResultados      = lista.length === 0;
        this.buscando           = false;
      },
      error: () => {
        this.buscando           = false;
        this.resultadosBusqueda = [];
        this.sinResultados      = true;
      }
    });
  }
 
  // ── Seleccionar paciente ──────────────────────────────────
 
  seleccionarPaciente(paciente: Paciente): void {
    this.pacienteSeleccionado  = paciente;
    this.terminoBusqueda       = `${paciente.nombre} ${paciente.apellido}`;
    this.resultadosBusqueda    = [];
    this.filtroTipo            = 'todas';
    this.idExpandido           = null;
    this.cargarHistorial(paciente.cedula);
  }
 
  cargarHistorial(cedula: string): void {
    this.cargandoHistorial = true;
    this.evaluaciones      = [];
 
    this.prediccionService.historial(cedula).subscribe({
      next: (lista) => {
        this.evaluaciones         = lista;
        this.aplicarFiltro();
        this.cargandoHistorial    = false;
      },
      error: () => {
        this.cargandoHistorial = false;
      }
    });
  }
 
  // ── Filtro por tipo ───────────────────────────────────────
 
  aplicarFiltro(): void {
    this.evaluacionesFiltradas = this.filtroTipo === 'todas'
      ? this.evaluaciones
      : this.evaluaciones.filter(e => e.tipo_enfermedad === this.filtroTipo);
  }
 
  cambiarFiltro(tipo: 'todas' | 'diabetes' | 'cardiovascular'): void {
    this.filtroTipo  = tipo;
    this.idExpandido = null;
    this.aplicarFiltro();
  }
 
  // ── Expandir / colapsar fila ──────────────────────────────
 
  toggleDetalle(id: number): void {
    this.idExpandido = this.idExpandido === id ? null : id;
  }
 
  // ── Tendencia (comparar con evaluación anterior) ──────────
 
  tendencia(ev: EvaluacionHistorial): 'sube' | 'baja' | 'igual' | null {
    if (ev.prob_hibrida === null) return null;
 
    // Buscar evaluaciones anteriores del mismo tipo
    const mismoTipo = this.evaluaciones
      .filter(e => e.tipo_enfermedad === ev.tipo_enfermedad && e.id_evaluacion !== ev.id_evaluacion)
      .sort((a, b) => new Date(b.fecha_hora).getTime() - new Date(a.fecha_hora).getTime());
 
    if (mismoTipo.length === 0 || mismoTipo[0].prob_hibrida === null) return null;
 
    const diff = ev.prob_hibrida - mismoTipo[0].prob_hibrida;
    if (Math.abs(diff) < 0.02) return 'igual';
    return diff > 0 ? 'sube' : 'baja';
  }
 
  // ── Helpers de presentación ───────────────────────────────
 
  calcularEdad(fechaNac: string): number {
    const hoy = new Date();
    const nac = new Date(fechaNac);
    let edad  = hoy.getFullYear() - nac.getFullYear();
    const m   = hoy.getMonth() - nac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--;
    return edad;
  }
 
  formatearFecha(fechaStr: string): string {
    const f = new Date(fechaStr);
    return f.toLocaleDateString('es-EC', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
 
  porcentaje(prob: number | null): string {
    return prob !== null ? (prob * 100).toFixed(1) + '%' : '—';
  }
 
  contarPorTipo(tipo: string): number {
    return this.evaluaciones.filter(e => e.tipo_enfermedad === tipo).length;
  }
 
  limpiarBusqueda(): void {
    this.terminoBusqueda       = '';
    this.resultadosBusqueda    = [];
    this.pacienteSeleccionado  = null;
    this.evaluaciones          = [];
    this.evaluacionesFiltradas = [];
    this.sinResultados         = false;
    this.idExpandido           = null;
  }

}
