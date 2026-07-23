import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resul-hibrido',
  imports: [ CommonModule],
  templateUrl: './resul-hibrido.component.html',
  styleUrls: ['./resul-hibrido.component.css', '../../modelos-shared.css']
})
export class ResulHibridoComponent {

  
  tabActivo: 'diabetes' | 'cardiovascular' = 'diabetes';
 
  comparativa = {
    diabetes: [
      { modelo: 'Random Forest', acc: '90.9%', prec: '85.1%', rec: '49.0%', f1: '62.2%', auc: '96.9%', badge: 'rf',  ganador: false },
      { modelo: 'XGBoost',       acc: '83.9%', prec: '83.3%', rec: '97.4%', f1: '89.8%', auc: '97.7%', badge: 'xgb', ganador: false },
      { modelo: 'Híbrido RF+XGB',acc: '86.6%', prec: '84.1%', rec: '54.3%', f1: '94.5%', auc: '97.6%', badge: 'hib', ganador: true  },
    ],
    cardiovascular: [
      { modelo: 'Random Forest', acc: '98.5%', prec: '99.1%', rec: '98.3%', f1: '98.7%', auc: '99.9%', badge: 'rf',  ganador: false },
      { modelo: 'XGBoost',       acc: '99.0%', prec: '99.2%', rec: '99.1%', f1: '99.1%', auc: '99.9%', badge: 'xgb', ganador: false },
      { modelo: 'Híbrido RF+XGB',acc: '99.0%', prec: '99.2%', rec: '99.1%', f1: '99.1%', auc: '100%',  badge: 'hib', ganador: true  },
    ]
  };
 
  metricas = {
    diabetes:       { accuracy: '86.6%', f1: '94.5%', auc: '97.6%', recall: '54.3%', precision: '84.1%' },
    cardiovascular: { accuracy: '99.0%', f1: '99.1%', auc: '100%',  recall: '99.1%', precision: '99.2%' },
  };
 
  pasos = [
    { n: '01', titulo: 'Formulario',      desc: 'El médico ingresa los datos clínicos del paciente',      ico: '📋' },
    { n: '02', titulo: 'Preprocesamiento',desc: 'Encoding y validación de rangos antes de predecir',      ico: '🧹' },
    { n: '03', titulo: 'RF predice',      desc: 'Random Forest genera su probabilidad de riesgo (40%)',   ico: '🌲' },
    { n: '04', titulo: 'XGBoost predice', desc: 'XGBoost genera su probabilidad de riesgo (60%)',         ico: '⚡' },
    { n: '05', titulo: 'Fusión híbrida',  desc: 'prob = 0.4 × RF + 0.6 × XGB → umbral 50%',             ico: '🔀' },
    { n: '06', titulo: 'Recomendación',   desc: 'Si hay riesgo → top 3 hospitales según seguro y cantón', ico: '🏥' },
  ];
 
  get comparativaActiva() { return this.comparativa[this.tabActivo]; }
  get metricasActivas()   { return this.metricas[this.tabActivo]; }

}
