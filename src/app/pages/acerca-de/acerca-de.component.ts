import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acerca-de',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent {

  
  tabFase: number = 0;
 
  // ── Ficha del proyecto ──────────────────────────────────────
  ficha = {
    titulo: 'Sistema inteligente de recomendación para derivación a establecimientos de salud, basado en Machine Learning y estadísticas avanzadas, para optimizar acceso y resolución en población ecuatoriana',
    institucion: 'Universidad de Guayaquil',
    facultad: 'Ciencias Matemáticas y Físicas',
    carrera: 'Software',
    area: 'Inteligencia Artificial y Ciencias de Datos',
    periodo: '2024 – 2026',
    tutor: 'Ing. Lorenzo Cevallos Torres, PhD.',
  };
 
  integrantes = [
    { nombre: 'Franco Quimi Victor German' },
    { nombre: 'Pachay Arregui Cristhian Andrés'},
  ];
 
  // ── Palabras clave ───────────────────────────────────────────
  palabrasClave = [
    'Machine Learning', 'Sistema de Recomendación', 'Derivación hospitalaria',
    'Salud Digital', 'Estadísticas Avanzadas', 'Ecuador', 'Enfermedades crónicas'
  ];
 
  // ── Objetivos ────────────────────────────────────────────────
  objetivoGeneral = 'Desarrollar un sistema inteligente de recomendación para la derivación de pacientes con enfermedades crónicas a establecimientos de salud, mediante la aplicación de técnicas de Machine Learning y análisis de datos, con el propósito de optimizar la toma de decisiones, mejorar el acceso oportuno a los servicios y fortalecer la capacidad de resolución del sistema sanitario.';
 
  objetivosEspecificos = [
    { n: 'OE1', texto: 'Analizar la fundamentación teórica y metodológica relacionada con sistemas inteligentes de recomendación en salud, derivación sanitaria, Machine Learning y estadísticas avanzadas.' },
    { n: 'OE2', texto: 'Diseñar un modelo analítico basado en variables sociodemográficas, territoriales y clínicas para identificar patrones asociados a la derivación de pacientes.' },
    { n: 'OE3', texto: 'Implementar algoritmos de Machine Learning y análisis estadístico avanzado para construir un sistema capaz de detectar riesgo de enfermedad crónica y generar recomendaciones de derivación.' },
    { n: 'OE4', texto: 'Evaluar el desempeño del sistema mediante métricas de precisión y capacidad predictiva, para determinar su utilidad como herramienta de apoyo clínico.' },
  ];
 
  // ── Marcos metodológicos ─────────────────────────────────────
  marcos = [
    { nombre: 'DSRM', autor: 'Gregório et al., 2021', desc: 'Design Science Research Methodology — orienta el diseño, desarrollo y evaluación del sistema como artefacto digital en 6 fases.', ico: '🔬' },
    { nombre: 'CRISP-ML(Q)', autor: 'Studer et al., 2021', desc: 'Estructura el desarrollo técnico del prototipo en 6 fases iterativas con aseguramiento de calidad.', ico: '⚙️' },
    { nombre: 'DECIDE-AI', autor: 'Vasey et al., 2022', desc: 'Guía la validación del sistema mediante juicio de expertos, evaluando pertinencia clínica y usabilidad.', ico: '✅' },
  ];
 
  // ── Hipótesis ────────────────────────────────────────────────
  hipotesis = {
    pregunta: '¿Es posible desarrollar un sistema inteligente basado en Machine Learning que detecte el riesgo de diabetes mellitus y enfermedades cardiovasculares en pacientes de la Zona 8 del Ecuador con una precisión (AUC-ROC) igual o superior a 0,95, y que recomiende automáticamente el establecimiento de salud más adecuado según el tipo de seguro, cantón de residencia y tipología del establecimiento?',
    criterio: 'AUC-ROC ≥ 0,95 en el conjunto de prueba independiente (20% de cada dataset)',
    resultados: [
      { modelo: 'Diabetes Híbrido', valor: 0.976, cumple: true },
      { modelo: 'Cardiovascular Híbrido', valor: 0.9996, cumple: true },
    ]
  };
 
  // ── Fuentes de datos ─────────────────────────────────────────
  fuentes = [
    { archivo: 'diabetes.csv', fuente: 'Mustafa (2023) — Kaggle', registros: '100,000', variables: '9', detalle: 'Target diabetes (0/1) · 91.5% sin / 8.5% con diabetes' },
    { archivo: 'Cardiovascular.csv', fuente: 'Dumlao (2023) — Kaggle', registros: '1,000', variables: '14', detalle: 'Target cardiovascular (0/1) · 42% sin / 58% con enfermedad' },
    { archivo: 'GS3_result_Avanzada.xlsx', fuente: 'GeoSalud MSP (2026)', registros: '276', variables: '12', detalle: 'Establecimientos N2/N3 con nombre oficial e institución' },
    { archivo: 'hospitales.csv', fuente: 'ERAS-INEC (2013)', registros: '375', variables: '—', detalle: 'Referencia geográfica (cantón/parroquia), Guayas' },
    { archivo: 'hospitales_privados_zona8.csv', fuente: 'Elaboración propia', registros: '4', variables: '5', detalle: 'Hospitales privados identificados en Zona 8' },
  ];
 
  // ── Fases CRISP-ML(Q) detalladas ─────────────────────────────
  fasesCrisp = [
    {
      num: '01', titulo: 'Comprensión del negocio y los datos',
      items: [
        'Identificación de objetivos del sistema de detección',
        'Selección de fuentes: datasets clínicos (Kaggle) + hospitalarios (INEC, MSP)',
        'Análisis exploratorio (EDA) sobre ambos datasets clínicos',
        'Diabetes: HbA1c_level y blood_glucose_level con mayor correlación (r > 0.40)',
        'Cardiovascular: vasos principales, depresión ST y dolor de pecho como predictores clave'
      ]
    },
    {
      num: '02', titulo: 'Preparación y calidad de datos',
      items: [
        'Diabetes: sin valores nulos en las 9 variables',
        'Codificación LabelEncoder en gender y smoking_history',
        'Partición 80/20 estratificada: 80,000 train / 20,000 test',
        'SMOTE sobre training: 73,200 / 73,200 registros balanceados',
        'Cardiovascular: 53 registros con colesterol=0 imputados con mediana (326.0 mg/dl)',
        'Cardiovascular: partición 800 train / 200 test, sin SMOTE (balance natural 42/58)'
      ]
    },
    {
      num: '03', titulo: 'Transformación y generación de variables',
      items: [
        'Sin normalización adicional — RF y XGBoost son invariantes a escala',
        'Construcción del catálogo unificado de 60 establecimientos (Zona 8)',
        'Integración GeoSalud MSP + ERAS-INEC + privados identificados',
        'Filtrado por tipología: Hospital de Especialidades, General, Clínica General',
        'Reglas de elegibilidad por tipo de seguro: IESS, MSP, Ninguno, ISSFA, ISSPOL, Privado'
      ]
    },
    {
      num: '04', titulo: 'Modelado',
      items: [
        'Random Forest: n_estimators=100, max_depth=10, class_weight=balanced',
        'XGBoost: n_estimators=100, learning_rate=0.1, max_depth=6, scale_pos_weight=10.8',
        'Modelo Híbrido: promedio ponderado 40% RF + 60% XGBoost',
        'Entrenamiento independiente para diabetes y cardiovascular',
        'Serialización de modelos en formato .pkl con encoders y columnas'
      ]
    },
    {
      num: '05', titulo: 'Evaluación',
      items: [
        'Validación cruzada k=5 sobre ambos datasets',
        'AUC-ROC Diabetes Híbrido = 0.9760 (umbral ≥ 0.95 ✓)',
        'AUC-ROC Cardiovascular Híbrido = 0.9996 (umbral ≥ 0.95 ✓)',
        'Diez casos de prueba cubriendo los 3 cantones de la Zona 8',
        'Verificación de coherencia clínica y geográfica de recomendaciones'
      ]
    },
    {
      num: '06', titulo: 'Implementación y comunicación',
      items: [
        'Exportación de 8 archivos .pkl: modelos, encoders y columnas',
        'Backend FastAPI consumiendo los modelos para inferencia en tiempo real',
        'Frontend Angular con formulario dinámico y motor de recomendación',
        'Base de datos PostgreSQL para persistencia de pacientes y evaluaciones',
        'Documento de tesis y artículo científico para revista indexada Q2-Q3'
      ]
    },
  ];
 
  // ── Del Colab al sistema en producción ───────────────────────
  pipelineDesarrollo = [
    {
      etapa: 'Google Colab',
      ico: '📓',
      color: 'colab',
      titulo: 'Notebook SISTEMA_SALUD.ipynb',
      descripcion: 'Entorno donde se realizó todo el ciclo de Data Science: carga de datasets, limpieza, balanceo con SMOTE, entrenamiento de Random Forest y XGBoost, evaluación con métricas y construcción del motor de recomendación hospitalaria.',
      entregables: ['Análisis exploratorio (EDA)', 'Modelos entrenados y validados', 'Catálogo hospitalario unificado', 'Casos de prueba verificados']
    },
    {
      etapa: 'Exportación',
      ico: '📦',
      color: 'export',
      titulo: 'Serialización con joblib',
      descripcion: 'Los modelos finales, los codificadores categóricos y las listas de columnas se serializaron en formato .pkl, permitiendo su uso en inferencia sin necesidad de reentrenar el modelo en producción.',
      entregables: ['rf_diabetes.pkl / xgb_diabetes.pkl', 'rf_cardiovascular.pkl / xgb_cardiovascular.pkl', 'encoder_gender.pkl / encoder_smoking.pkl', 'catalogo_unificado.pkl / mediana_colesterol.pkl']
    },
    {
      etapa: 'Backend',
      ico: '⚙️',
      color: 'backend',
      titulo: 'API REST con FastAPI + PostgreSQL',
      descripcion: 'Se construyó un backend en Python que carga los modelos .pkl al iniciar, expone endpoints REST para predicción, pacientes e historial, y persiste cada evaluación en una base de datos relacional PostgreSQL.',
      entregables: ['Endpoint POST /predecir', 'ORM SQLAlchemy con 6 tablas', 'Validación Pydantic de entrada', 'Lógica de recomendación hospitalaria']
    },
    {
      etapa: 'Frontend',
      ico: '🖥️',
      color: 'frontend',
      titulo: 'Interfaz Angular',
      descripcion: 'El cliente Angular consume la API mediante un formulario dinámico que se adapta a la enfermedad seleccionada, muestra resultados con las probabilidades de los 3 modelos, y permite consultar el historial de evaluaciones de cada paciente.',
      entregables: ['Formulario clínico dinámico', 'Historial con búsqueda por cédula/nombre', 'Componentes explicativos de cada modelo', 'Visualización de hospitales recomendados']
    },
  ];
 
  // ── Entregables ──────────────────────────────────────────────
  entregables = [
    { ico: '📓', texto: 'Notebook documentado con preprocesamiento, entrenamiento y motor de recomendación' },
    { ico: '💾', texto: 'Modelos serializados (.pkl) listos para inferencia sin reentrenamiento' },
    { ico: '🖥️', texto: 'Prototipo funcional full-stack: Angular + FastAPI + PostgreSQL' },
    { ico: '📊', texto: 'Informe de resultados con métricas de los 6 modelos entrenados' },
    { ico: '📄', texto: 'Manual técnico del sistema' },
  ];
 
  // ── Limitaciones ─────────────────────────────────────────────
  limitaciones = [
    'Los datos provienen de fuentes secundarias públicas que podrían no estar completamente actualizadas o estandarizadas.',
    'El sistema no contempla integración en tiempo real con plataformas institucionales del MSP.',
    'No incluye implementación directa en instituciones de salud — se limita a un prototipo validado en entorno controlado.',
    'El estudio se delimita geográficamente a la Zona 8 del Ecuador (Guayaquil, Durán, Samborondón).',
    'La base ERAS-INEC data de 2013, usada únicamente como referencia geográfica (cantón/parroquia), no operativa.',
  ];

}