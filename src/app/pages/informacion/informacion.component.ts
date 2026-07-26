import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-informacion',
  imports: [CommonModule],
  templateUrl: './informacion.component.html',
  styleUrl: './informacion.component.css'
})
export class InformacionComponent {

   diabetesTab = signal(0);
  cardiovascTab = signal(0);
  renalTab = signal(0);

  faqOpen = signal<number | null>(null);

  toggleFaq(i: number) {
    this.faqOpen.update(v => v === i ? null : i);
  }


  stats = [
    {
      value: 'Más de 830 millones de personas',
      label: 'viven con diabetes, una enfermedad cuya prevalencia ha aumentado de forma acelerada en las últimas décadas.',
      color: '#e67e22'
    },
    {
      value: '17,9 millones de personas',
      label: 'fallecen anualmente por enfermedades cardiovasculares, convirtiéndolas en la principal causa de muerte en el mundo.',
      color: '#c0392b'
    }
  ];

  diabetesTabs = [
    {
      label: 'Síntomas',
      content: [
        'Sed excesiva',
        'Micción frecuente',
        'Fatiga',
        'Visión borrosa'
      ]
    },
    {
      label: 'Causas',
      content: [
        'Resistencia a la insulina',
        'Obesidad',
        'Sedentarismo'
      ]
    },
    {
      label: 'Tratamiento',
      content: [
        'Control glucémico',
        'Dieta balanceada',
        'Ejercicio regular'
      ]
    }
  ];

  cardiovascTabs = [
    {
      label: 'Síntomas',
      content: [
        'Dolor en el pecho',
        'Palpitaciones',
        'Falta de aire'
      ]
    },
    {
      label: 'Causas',
      content: [
        'Hipertensión',
        'Colesterol alto',
        'Tabaquismo'
      ]
    },
    {
      label: 'Tratamiento',
      content: [
        'Medicamentos',
        'Cirugía',
        'Rehabilitación'
      ]
    }
  ];

 

  tips = [
    {
      icon: '🍎',
      title: 'Alimentación saludable',
      desc: 'Consumir frutas, verduras y granos integrales reduce el riesgo de enfermedades crónicas,Reducir el consumo de azúcar, sal y grasas saturadas,Evitar alimentos ultraprocesados y bebidas azucaradas,Mantener una adecuada hidratación.',
      color: '#27ae60'
    },
    {
      icon: '🏃',
      title: 'Actividad física',
      desc: 'Practicar al menos 150 minutos de actividad física moderada por semana (caminar, correr, nadar o montar bicicleta).Reducir el tiempo de sedentarismo y realizar pausas activas durante el día.',
      color: '#e67e22'
    },
    {
      icon: '🚭',
      title: 'Evitar el tabaco y el consumo excesivo de alcohol',
      desc: 'Reduce significativamente el riesgo cardiovascular, Limitar el consumo de bebidas alcohólicas.',
      color: '#8e44ad'
    }
  ];

  complicaciones = [
    {
      icono: '👁️',
      titulo: 'Daño en la vista',
      desc: 'La retinopatía diabética y la hipertensión no controlada afectan progresivamente la retina y pueden derivar en pérdida de visión.',
      color: '#e67e22'
    },
    {
      icono: '🫀',
      titulo: 'Sobrecarga del corazón',
      desc: 'La diabetes acelera la aterosclerosis, aumentando el riesgo de infarto, insuficiencia cardíaca y accidente cerebrovascular.',
      color: '#c0392b'
    },
    {
      icono: '🦵',
      titulo: 'Neuropatía y pie diabético',
      desc: 'La glucosa elevada daña los nervios periféricos, reduciendo la sensibilidad y favoreciendo heridas que cicatrizan con dificultad.',
      color: '#2e86ab'
    },
    {
      icono: '🫘',
      titulo: 'Deterioro renal',
      desc: 'La hipertensión y la diabetes son, en conjunto, la principal causa de enfermedad renal crónica a nivel mundial.',
      color: '#8e44ad'
    },
  ];

  faqs = [
    {
      q: '¿Qué son las enfermedades crónicas?',
      a: 'Son enfermedades de larga duración que requieren seguimiento y tratamiento continuo.'
    },
    {
    q: '¿Cuáles son las enfermedades crónicas más comunes?',
    a: 'La diabetes, hipertensión, enfermedades cardiovasculares, renales y respiratorias.'
  },
  {
    q: '¿Cuáles son los síntomas de la diabetes?',
    a: 'Sed excesiva, aumento de la orina, cansancio y pérdida de peso sin causa aparente.'
  },
  {
    q: '¿Cómo puedo reducir el riesgo de enfermedades cardiovasculares?',
    a: 'Manteniendo una alimentación saludable, haciendo ejercicio y evitando el tabaco.'
  },
  {
    q: '¿Qué alimentos ayudan a cuidar el corazón?',
    a: 'Frutas, verduras, pescado, cereales integrales y alimentos bajos en grasas saturadas.'
  },
  {
    q: '¿Por qué es importante controlar la presión arterial?',
    a: 'Porque reduce el riesgo de infartos, accidentes cerebrovasculares y daño renal.'
  },
  {
    q: '¿Qué es el colesterol alto?',
    a: 'Es un exceso de grasa en la sangre que aumenta el riesgo de enfermedades del corazón.'
  }   
  ];

}
