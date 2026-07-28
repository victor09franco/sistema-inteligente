
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HospitalRecomendado {
  posicion_top:          number;
  nombre_hospital:       string;
  institucion:           string;
  nivel_atencion:        string;
  clase_establecimiento: string;
  canton_hospital:       string;
  parroquia_hospital:    string;
  sector:                string;
}

export interface PrediccionResponse {
  id_evaluacion:      number;
  tipo_enfermedad:    string;
  hay_riesgo:         boolean;
  prob_random_forest: number;
  prob_xgboost:       number;
  prob_hibrida:       number;
  modelo_ganador:     string;
  hospitales_top3:    HospitalRecomendado[];
  mensaje:            string;
}

export interface Paciente {
  id_paciente:      number;
  nombre:           string;
  apellido:         string;
  cedula:           string;
  fecha_nacimiento: string;
  genero:           string;
  canton:           string;
  parroquia:        string;
  area_residencia:  string;
  tipo_seguro:      string;
  fecha_registro:   string;
}

export interface EvaluacionHistorial {
  id_evaluacion:      number;
  tipo_enfermedad:    string;
  edad_al_evaluar:    number;
  fecha_hora:         string;
  estado:             string;
  hay_riesgo:         boolean | null;
  prob_random_forest: number | null;
  prob_xgboost:       number | null;   
  prob_hibrida:       number | null;
  modelo_ganador:     string | null;
  hospitales_top3:    HospitalRecomendado[];
}

export interface EvaluacionEstadistica {
  id_evaluacion:   number;
  tipo_enfermedad: string;
  fecha_hora:      string;   
  hay_riesgo:      boolean;
  prob_hibrida:    number;   
  modelo_ganador:  string;   
  canton:          string;
  tipo_seguro:     string;
  hospital_top1:   string | null;
}

@Injectable({ providedIn: 'root' })
export class PrediccionService {

  private API = 'http://localhost:8000/api/v1';
  //private API = 'https://backend-tesis-fastapi.onrender.com/api/v1';

  constructor(private http: HttpClient) {}

  predecir(payload: any): Observable<PrediccionResponse> {
    return this.http.post<PrediccionResponse>(`${this.API}/predecir`, payload);
  }

  /** Autocomplete formulario — busca por cédula exacta */
  buscarPaciente(cedula: string): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.API}/pacientes/${cedula}`);
  }

  /** Búsqueda flexible — cédula o nombre/apellido */
  buscarPacientes(q: string): Observable<Paciente[]> {
    const params = new HttpParams().set('q', q);
    return this.http.get<Paciente[]>(`${this.API}/pacientes`, { params });
  }

  /** Historial completo de evaluaciones de un paciente */
  historial(cedula: string): Observable<EvaluacionHistorial[]> {
    return this.http.get<EvaluacionHistorial[]>(`${this.API}/pacientes/${cedula}/historial`);
  }
  /**
   * Todas las evaluaciones del sistema, para el panel de Estadísticas.
   * Requiere que el backend exponga GET /api/v1/evaluaciones (ver nota
   * junto a la interfaz EvaluacionEstadistica). Admite filtros opcionales
   * por tipo de enfermedad, cantón y rango de fechas.
   */
  obtenerEstadisticas(filtros?: {
    tipo_enfermedad?: string;
    canton?: string;
    fecha_inicio?: string;
    fecha_fin?: string;
  }): Observable<EvaluacionEstadistica[]> {
    let params = new HttpParams();
    if (filtros?.tipo_enfermedad) params = params.set('tipo_enfermedad', filtros.tipo_enfermedad);
    if (filtros?.canton)          params = params.set('canton', filtros.canton);
    if (filtros?.fecha_inicio)    params = params.set('fecha_inicio', filtros.fecha_inicio);
    if (filtros?.fecha_fin)       params = params.set('fecha_fin', filtros.fecha_fin);

    return this.http.get<EvaluacionEstadistica[]>(`${this.API}/evaluaciones`, { params });
  }
}