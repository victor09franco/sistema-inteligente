import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PrediccionService, PrediccionResponse } from '../../services/prediccion.service';



@Component({
  selector: 'app-formulario',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit {

 
 form!: FormGroup;
  enfermedadSeleccionada: 'diabetes' | 'cardiovascular' | '' = '';
  edadCalculada: number | null = null;
 
  // ── Estados petición principal ───────────────────────────
  cargando  = false;
  resultado: PrediccionResponse | null = null;
  errorMsg  = '';
 
  // ── Estados búsqueda por cédula ─────────────────────────
  buscandoCedula    = false;   // spinner en el campo cédula
  pacienteEncontrado = false;  // muestra badge "Paciente encontrado"
  pacienteNuevo     = false;   // muestra badge "Paciente nuevo"
 
  parroquiasPorCanton: Record<string, string[]> = {
    'Guayaquil':   ['Tarqui','Ximena','Ayacucho','Letamendi','Olmedo','Rocafuerte','Sucre','Urdaneta','Febres Cordero','García Moreno','Pascuales','Chongón'],
    'Durán':       ['Eloy Alfaro','El Recreo'],
    'Samborondón': ['Samborondón','La Puntilla']
  };
  parroquiasDisponibles: string[] = [];
 
  constructor(
    private fb: FormBuilder,
    private prediccionService: PrediccionService
  ) {}
 
  ngOnInit(): void {
    this.form = this.fb.group({
      // ── Identificación ──────────────────────────────────
      cedula:          ['', [Validators.required, this.validarSoloDiezDigitos]],
      nombre:          ['', [Validators.required, Validators.minLength(2)]],
      apellido:        ['', [Validators.required, Validators.minLength(2)]],
      fechaNacimiento: ['', [Validators.required, this.validarFechaNacimiento]],
 
      // ── Ubicación ───────────────────────────────────────
      tipoEvaluacion:  ['', Validators.required],
      provincia:       ['Guayas'],
      canton:          ['', Validators.required],
      parroquia:       ['', Validators.required],
      areaResidencia:  ['', Validators.required],
      tipoSeguro:      ['', Validators.required],
 
      // ── Diabetes ────────────────────────────────────────
      d_genero:            [''],
      d_hipertension:      [''],
      d_enfermedadCardiaca:[''],
      d_tabaquismo:        [''],
      d_bmi:               [''],
      d_hba1c:             [''],
      d_glucosa:           [''],
 
      // ── Cardiovascular ───────────────────────────────────
      c_genero:            [''],
      c_dolorPecho:        [''],
      c_presionArterial:   [''],
      c_colesterol:        [''],
      c_glucemiaAyunas:    [''],
      c_ecg:               [''],
      c_frecuenciaCardiaca:[''],
      c_angina:            [''],
      c_depresionST:       [''],
      c_pendiente:         [''],
      c_vasosprincipales:  [''],
    });
 
    // ── Escuchar cambios en cédula con debounce ──────────
    this.form.get('cedula')!.valueChanges.pipe(
      debounceTime(600),          // espera 600ms después que el usuario deja de escribir
      distinctUntilChanged()      // solo si el valor cambió
    ).subscribe(valor => {
      this.onCedulaChange(valor);
    });
 
    // ── Calcular edad ────────────────────────────────────
    this.form.get('fechaNacimiento')?.valueChanges.subscribe(fecha => {
      this.edadCalculada = fecha ? this.calcularEdad(fecha) : null;
    });
 
    // ── Cambio de enfermedad ─────────────────────────────
    this.form.get('tipoEvaluacion')?.valueChanges.subscribe(val => {
      this.enfermedadSeleccionada = val;
      this.resultado = null;
      this.errorMsg  = '';
      this.actualizarValidaciones(val);
    });
 
    // ── Filtrar parroquias ───────────────────────────────
    this.form.get('canton')?.valueChanges.subscribe(canton => {
      this.parroquiasDisponibles = this.parroquiasPorCanton[canton] || [];
      this.form.get('parroquia')?.setValue('');
    });
  }
 
  // ── Lógica de búsqueda por cédula ───────────────────────
 
  onCedulaChange(valor: string): void {
    // Resetear estados previos
    this.pacienteEncontrado = false;
    this.pacienteNuevo     = false;
 
    // Solo buscar si tiene exactamente 10 dígitos numéricos
    if (!valor || !/^\d{10}$/.test(valor)) return;
 
    this.buscandoCedula = true;
 
    this.prediccionService.buscarPaciente(valor).subscribe({
      next: (paciente) => {
        // ✅ Paciente existe → autocompletar campos
        this.form.patchValue({
          nombre:          paciente.nombre,
          apellido:        paciente.apellido,
          fechaNacimiento: paciente.fecha_nacimiento,
          canton:          paciente.canton,
          parroquia:       paciente.parroquia,
          areaResidencia:  paciente.area_residencia,
          tipoSeguro:      paciente.tipo_seguro,
        });
 
        // Actualizar parroquias según el cantón cargado
        this.parroquiasDisponibles = this.parroquiasPorCanton[paciente.canton] || [];
 
        this.buscandoCedula    = false;
        this.pacienteEncontrado = true;
        this.pacienteNuevo     = false;
      },
      error: (err) => {
        this.buscandoCedula = false;
        if (err.status === 404) {
          // Paciente nuevo → limpiar campos para que los llene el usuario
          this.form.patchValue({
            nombre: '', apellido: '', fechaNacimiento: '',
            canton: '', parroquia: '', areaResidencia: '', tipoSeguro: '',
          });
          this.pacienteEncontrado = false;
          this.pacienteNuevo     = true;
        }
        // Si es otro error de red, no mostrar nada especial
      }
    });
  }
 
  // ── Validadores ──────────────────────────────────────────
 
  /** Solo valida 10 dígitos numéricos — sin algoritmo de Luhn */
  validarSoloDiezDigitos(control: AbstractControl): ValidationErrors | null {
    const v = control.value?.toString().trim();
    if (!v) return null;
    if (!/^\d{10}$/.test(v)) return { cedulaInvalida: true };
    return null;
  }
 
  validarFechaNacimiento(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const hoy = new Date();
    const nac = new Date(control.value);
    if (nac >= hoy) return { fechaFutura: true };
    if (hoy.getFullYear() - nac.getFullYear() > 120) return { fechaInvalida: true };
    return null;
  }
 
  calcularEdad(fechaStr: string): number {
    const hoy = new Date();
    const nac = new Date(fechaStr);
    let edad  = hoy.getFullYear() - nac.getFullYear();
    const m   = hoy.getMonth() - nac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--;
    return edad;
  }
 
  actualizarValidaciones(tipo: string): void {
    const camposDiabetes = ['d_genero','d_hipertension','d_enfermedadCardiaca','d_tabaquismo','d_bmi','d_hba1c','d_glucosa'];
    const camposCardio   = ['c_genero','c_dolorPecho','c_presionArterial','c_colesterol','c_glucemiaAyunas','c_ecg','c_frecuenciaCardiaca','c_angina','c_depresionST','c_pendiente','c_vasosprincipales'];
 
    [...camposDiabetes, ...camposCardio].forEach(campo => {
      this.form.get(campo)?.clearValidators();
      this.form.get(campo)?.setValue('');
      this.form.get(campo)?.updateValueAndValidity();
    });
 
    const activos = tipo === 'diabetes' ? camposDiabetes : tipo === 'cardiovascular' ? camposCardio : [];
    activos.forEach(campo => {
      this.form.get(campo)?.setValidators(Validators.required);
      this.form.get(campo)?.updateValueAndValidity();
    });
  }
 
  // ── Submit ───────────────────────────────────────────────
 
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
 
    const v = this.form.value;
 
    const payload: any = {
      nombre:           v.nombre,
      apellido:         v.apellido,
      cedula:           v.cedula,
      fecha_nacimiento: v.fechaNacimiento,
      canton:           v.canton,
      parroquia:        v.parroquia,
      area_residencia:  v.areaResidencia,
      tipo_seguro:      v.tipoSeguro,
      tipo_enfermedad:  this.enfermedadSeleccionada,
      edad_al_evaluar:  this.edadCalculada ?? 0,
    };
 
    if (this.enfermedadSeleccionada === 'diabetes') {
      payload.genero         = v.d_genero;
      payload.datos_diabetes = {
        hypertension:        Number(v.d_hipertension),
        heart_disease:       Number(v.d_enfermedadCardiaca),
        smoking_history:     v.d_tabaquismo,
        bmi:                 Number(v.d_bmi),
        HbA1c_level:         Number(v.d_hba1c),
        blood_glucose_level: Number(v.d_glucosa),
      };
    } else {
      payload.genero               = v.c_genero === '1' ? 'Male' : 'Female';
      payload.datos_cardiovascular = {
        tipo_dolor_pecho:        Number(v.c_dolorPecho),
        presion_arterial_reposo: Number(v.c_presionArterial),
        colesterol_serico:       Number(v.c_colesterol),
        glucemia_ayunas:         Number(v.c_glucemiaAyunas),
        electro_reposo:          Number(v.c_ecg),
        frecuencia_cardiaca_max: Number(v.c_frecuenciaCardiaca),
        angina_ejercicio:        Number(v.c_angina),
        depresion_segmento_st:   Number(v.c_depresionST),
        pendiente_st:            Number(v.c_pendiente),
        num_vasos_principales:   Number(v.c_vasosprincipales),
      };
    }
 
    this.cargando  = true;
    this.resultado = null;
    this.errorMsg  = '';
 
    this.prediccionService.predecir(payload).subscribe({
      next: (res) => {
        this.resultado = res;
        this.cargando  = false;
      },
      error: (err) => {
        console.error('Error API:', err);
        this.errorMsg = err?.error?.detail ?? 'Error al conectar con el servidor. Verifica que el backend esté corriendo.';
        this.cargando = false;
      }
    });
  }
 
  // ── Nueva evaluación ─────────────────────────────────────
  nuevaEvaluacion(): void {
    this.form.reset({ provincia: 'Guayas' });
    this.resultado              = null;
    this.errorMsg               = '';
    this.enfermedadSeleccionada = '';
    this.edadCalculada          = null;
    this.parroquiasDisponibles  = [];
    this.pacienteEncontrado     = false;
    this.pacienteNuevo          = false;
  }
 
  campoInvalido(campo: string): boolean {
    const ctrl = this.form.get(campo);
    return !!(ctrl?.invalid && ctrl?.touched);
  }
 
  get hoyMax(): string {
    return new Date().toISOString().split('T')[0];
  }
}
