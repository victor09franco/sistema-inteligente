import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

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

  // ── Beneficios del sistema ────────────────────────────────────
  beneficios = [
    { ico: '⚡', titulo: 'Detección temprana', desc: 'Identifica el riesgo de diabetes y enfermedad cardiovascular en segundos, antes de que los síntomas sean evidentes.' },
    { ico: '🎯', titulo: 'Predicción precisa', desc: 'Combina dos algoritmos de Machine Learning con más del 97% de precisión AUC-ROC en ambas patologías.' },
    { ico: '🏥', titulo: 'Derivación inteligente', desc: 'Recomienda automáticamente los 3 establecimientos más adecuados según el seguro y cantón de residencia del paciente.' },
    { ico: '📋', titulo: 'Historial clínico', desc: 'Guarda cada evaluación para hacer seguimiento de la evolución del riesgo del paciente a lo largo del tiempo.' },
  ];
  
  // ── Señales de alerta clínica (reemplaza sección enfermedades) ──
  alertas = [
    {
      categoria: 'Diabetes',
      color: '#000000',
      colorBg: '#f0fdf9',
      colorBorder: '#99f6e4',
      ico: '🩸',
      intro: 'La diabetes tipo 2 se desarrolla de forma silenciosa durante años. Conocer las señales permite actuar antes de que cause daño en órganos vitales.',
      senales: [
        { titulo: 'Sed y micción excesivas', desc: 'El cuerpo intenta eliminar el exceso de glucosa por la orina, generando deshidratación constante.' },
        { titulo: 'Fatiga persistente', desc: 'Sin insulina efectiva, las células no reciben energía de la glucosa y el paciente siente cansancio sin causa aparente.' },
        { titulo: 'Visión borrosa', desc: 'Los niveles altos de glucosa afectan el cristalino del ojo, alterando temporalmente la visión.' },
        { titulo: 'Cicatrización lenta', desc: 'La hiperglucemia deteriora la circulación y la función inmune, dificultando la reparación de heridas.' },
        { titulo: 'Entumecimiento en pies o manos', desc: 'El daño a los nervios periféricos (neuropatía) es uno de los primeros signos de diabetes no controlada.' },
      ],
      factores: ['Obesidad o sobrepeso', 'Sedentarismo', 'Antecedentes familiares', 'Hipertensión arterial', 'Mayores de 45 años'],
      umbral: 'HbA1c ≥ 6.5% o glucosa en ayunas ≥ 126 mg/dL — criterios ADA para diagnóstico de diabetes.',
    },
    {
      categoria: 'Enfermedades Cardiovasculares',
      color: '#020202',
      colorBg: '#fff5f5',
      colorBorder: '#fca5a5',
      ico: '❤️',
      intro: 'Las enfermedades cardiovasculares son la primera causa de muerte a nivel mundial. El 80% de los casos prematuros son prevenibles con detección oportuna.',
      senales: [
        { titulo: 'Dolor o presión en el pecho', desc: 'Sensación de opresión, quemadura o peso en el centro del pecho, especialmente durante el esfuerzo físico.' },
        { titulo: 'Falta de aire al esfuerzo', desc: 'Dificultad para respirar al realizar actividades que antes no la generaban: subir escaleras, caminar rápido.' },
        { titulo: 'Palpitaciones irregulares', desc: 'Sensación de que el corazón late de forma rápida, lenta o irregular sin razón aparente.' },
        { titulo: 'Mareos o desmayos repentinos', desc: 'Pueden indicar arritmias o caída brusca del flujo sanguíneo al cerebro por obstrucción arterial.' },
        { titulo: 'Dolor irradiado al brazo o mandíbula', desc: 'Señal clásica de isquemia cardíaca. El dolor puede no estar en el pecho sino en el brazo izquierdo, cuello o mandíbula.' },
      ],
      factores: ['Hipertensión arterial', 'Colesterol elevado', 'Tabaquismo', 'Diabetes no controlada', 'Historia familiar de cardiopatía'],
      umbral: 'La pendiente plana o descendente del ST en ECG de esfuerzo, combinada con angina, son señales de riesgo alto en este sistema.',
    },
  ];

  tabAlertaActiva = 0;

  // ── Cómo usar el sistema ─────────────────────────────────────
  pasos = [
    {
      num: '01',
      titulo: 'Ingresa la cédula del paciente',
      desc: 'El sistema reconoce automáticamente a pacientes previos y completa sus datos. Para pacientes nuevos, complete nombre, apellido y fecha de nacimiento.',
      img: 'https://static.vecteezy.com/system/resources/thumbnails/066/526/572/small/doctor-working-on-computer-in-modern-office-healthcare-professional-photo.jpg',
      alt: 'Persona ingresando datos en computadora'
    },
    {
      num: '02',
      titulo: 'Selecciona el tipo de evaluación',
      desc: 'Elige entre Diabetes o Cardiovascular. Los campos clínicos aparecen dinámicamente según la patología seleccionada.',
      img: 'https://static.vecteezy.com/system/resources/thumbnails/015/590/246/small/hand-of-doctor-touching-icon-digital-healthcare-on-modern-interface-health-care-and-modern-medical-services-concept-photo.jpg',
      alt: 'Médico revisando formulario clínico'
    },
    {
      num: '03',
      titulo: 'Completa los datos clínicos',
      desc: 'Ingresa los valores de laboratorio y signos vitales con rangos validados en cada campo. El sistema indica si algún valor está fuera de rango.',
      img: 'https://gacetamedica.com/wp-content/uploads/2020/11/GettyImages-969910224-1.jpg',
      alt: 'Exámenes de laboratorio clínico'
    },
    {
      num: '04',
      titulo: 'Recibe el resultado y la derivación',
      desc: 'El sistema muestra la probabilidad de riesgo de los tres modelos y, si hay riesgo, los 3 mejores establecimientos de salud para el paciente.',
      img: 'https://thumbs.dreamstime.com/b/edificio-del-hospital-59693686.jpg',
      alt: 'Médico revisando resultados con paciente'
    },
  ];

  // ── Zona de cobertura ─────────────────────────────────────────
  cantones = [
    { nombre: 'Guayaquil', hospitales: 45, desc: 'Mayor cobertura con hospitales de Nivel 3 especializados.' },
    { nombre: 'Durán',     hospitales: 8,  desc: 'Establecimientos IESS y MSP para derivación.' },
    { nombre: 'Samborondón', hospitales: 7, desc: 'Clínicas y hospitales de nivel 2 y 3.' },
  ];

  seguros = [
    { tipo: 'IESS',    desc: 'Instituto Ecuatoriano de Seguridad Social', color: '#1d6fa0' },
    { tipo: 'MSP',     desc: 'Ministerio de Salud Pública',               color: '#0d9488' },
    { tipo: 'ISSFA',   desc: 'Fuerzas Armadas',                           color: '#854d0e' },
    { tipo: 'ISSPOL',  desc: 'Policía Nacional',                          color: '#6d28d9' },
    { tipo: 'Privado', desc: 'Todos los establecimientos',                 color: '#374151' },
    { tipo: 'Ninguno', desc: 'MSP + ONGs + sin fines de lucro',           color: '#0d6b4f' },
  ];

  // ── FAQ ───────────────────────────────────────────────────────
  faqAbierto: number | null = null;
  toggleFaq(i: number) { this.faqAbierto = this.faqAbierto === i ? null : i; }

  faqs = [
    { q: '¿El sistema reemplaza al médico?',
      a: 'No. El sistema es una herramienta de apoyo a la decisión clínica. Los resultados deben ser interpretados siempre por un profesional de salud. El sistema calcula probabilidades estadísticas, no diagnósticos definitivos.' },
    { q: '¿Qué significa una probabilidad híbrida del 75%?',
      a: 'Significa que el modelo estima un 75% de probabilidad de que el paciente presente la condición evaluada. Cualquier valor igual o mayor al 50% activa la alerta de riesgo y la recomendación de establecimientos.' },
    { q: '¿Por qué el sistema recomienda un hospital y no otro?',
      a: 'El motor de recomendación filtra los establecimientos por tipo de seguro del paciente, tipología clínica para la patología detectada, nivel de atención (priorizando Nivel 3) y cantón de residencia del paciente.' },
    { q: '¿Los datos del paciente quedan guardados?',
      a: 'Sí. Al enviar la evaluación, el sistema almacena automáticamente los datos clínicos, el resultado de los modelos y los hospitales recomendados. Están disponibles en el módulo Historial para consultas futuras.' },
    { q: '¿Puedo evaluar al mismo paciente varias veces?',
      a: 'Sí. Cada evaluación queda registrada de forma independiente. Al ingresar la cédula nuevamente, el sistema lo reconoce y muestra la tendencia de riesgo entre evaluaciones.' },
    { q: '¿Qué es el HbA1c y por qué es importante?',
      a: 'La hemoglobina glucosilada (HbA1c) mide el promedio de glucosa en sangre de los últimos 2-3 meses. Es el indicador más confiable de control glucémico a largo plazo. Valores ≥ 6.5% son criterio diagnóstico de diabetes según la ADA.' },
    { q: '¿Cómo interpreta el sistema la pendiente del segmento ST?',
      a: 'La pendiente del ST en el ECG de esfuerzo es el predictor más potente de enfermedad cardiovascular en este sistema. Una pendiente plana o descendente, combinada con depresión del ST y angina por ejercicio, incrementa significativamente el riesgo detectado.' },
  ];

  // ── Avisos ────────────────────────────────────────────────────
  avisos = [
    { ico: '⚠️', texto: 'Los resultados son de apoyo clínico y no constituyen un diagnóstico definitivo.' },
    { ico: '🔒', texto: 'Los datos se almacenan con fines de seguimiento clínico institucional.' },
    { ico: '🩺', texto: 'Consulte siempre con un profesional de salud para interpretar los resultados.' },
  ];


}
