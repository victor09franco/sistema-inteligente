import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-xgboost',
  imports: [CommonModule],
  templateUrl: './xgboost.component.html',
  styleUrls: ['./xgboost.component.css', '../../modelos-shared.css']
})
export class XgboostComponent {

  tabActivo: 'diabetes' | 'cardiovascular' = 'diabetes';
 
  metricas = {
    diabetes: {
      accuracy:  '83.9%',
      precision: '83.3%',
      recall:    '97.4%',
      f1:        '89.8%',
      auc:       '97.7%',
    },
    cardiovascular: {
      accuracy:  '99.0%',
      precision: '99.2%',
      recall:    '99.1%',
      f1:        '99.1%',
      auc:       '99.9%',
    }
  };
 
  parametros = [
    { nombre: 'n_estimators',    valor: '100',   desc: 'Número de rondas de boosting (árboles secuenciales)' },
    { nombre: 'learning_rate',   valor: '0.1',   desc: 'Tasa de aprendizaje — controla el peso de cada árbol' },
    { nombre: 'max_depth',       valor: '6',     desc: 'Profundidad máxima de cada árbol individual' },
    { nombre: 'subsample',       valor: '0.8',   desc: '80% de muestras aleatorias por árbol para reducir varianza' },
    { nombre: 'scale_pos_weight',valor: '10.76', desc: 'Ratio neg/pos para compensar desbalance en diabetes' },
    { nombre: 'use_label_encoder',valor: 'False', desc: 'Encoder desactivado para compatibilidad sklearn' },
    { nombre: 'eval_metric',     valor: 'logloss', desc: 'Métrica de evaluación durante el entrenamiento' },
    { nombre: 'random_state',    valor: '42',    desc: 'Semilla para reproducibilidad' },
  ];
 
  importanciasDiabetes = [
    { nombre: 'HbA1c_level',         valor: 0.49 },
    { nombre: 'blood_glucose_level', valor: 0.33 },
    { nombre: 'age',                 valor: 0.07 },
    { nombre: 'bmi',                 valor: 0.05 },
    { nombre: 'smoking_history',     valor: 0.03 },
    { nombre: 'gender',              valor: 0.02 },
    { nombre: 'hypertension',        valor: 0.01 },
    { nombre: 'heart_disease',       valor: 0.00 },
  ];
 
  importanciasCardio = [
    { nombre: 'pendiente',           valor: 0.64 },
    { nombre: 'electro en reposo',   valor: 0.07 },
    { nombre: 'genero',              valor: 0.06 },
    { nombre: 'glucemia en ayunas',  valor: 0.05 },
    { nombre: 'depresion ST',        valor: 0.05 },
    { nombre: 'presion arterial',    valor: 0.04 },
    { nombre: 'colesterol serico',   valor: 0.04 },
    { nombre: 'dolor de pecho',      valor: 0.03 },
    { nombre: 'vasos principales',   valor: 0.02 },
    { nombre: 'frecuencia cardiaca', valor: 0.01 },
  ];
 
  ventajas = [
    { ico: '⚡', titulo: 'Alta velocidad', desc: 'Optimizado en C++ con ejecución paralela, entrena más rápido que RF en datasets grandes.' },
    { ico: '🎯', titulo: 'Mayor Recall',   desc: 'En diabetes logró 97.4% de Recall, detectando casi todos los casos positivos reales.' },
    { ico: '🛠️', titulo: 'Regularización', desc: 'Parámetros L1 y L2 integrados evitan sobreajuste sin sacrificar rendimiento.' },
    { ico: '📉', titulo: 'Boosting secuencial', desc: 'Cada árbol corrige los errores del anterior, concentrándose en los casos difíciles.' },
  ];
 
  get metricasActivas() { return this.metricas[this.tabActivo]; }
  get importanciasActivas() {
    return this.tabActivo === 'diabetes' ? this.importanciasDiabetes : this.importanciasCardio;
  }

}
