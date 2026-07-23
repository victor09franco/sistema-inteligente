import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-randon-forest',
  imports: [CommonModule],
  templateUrl: './randon-forest.component.html',
  styleUrls: ['./randon-forest.component.css', '../../modelos-shared.css'],
})
export class RandonForestComponent {

  
  tabActivo: 'diabetes' | 'cardiovascular' = 'diabetes';
 
  metricas = {
    diabetes: {
      accuracy:  '90.9%',
      precision: '85.1%',
      recall:    '49.0%',
      f1:        '62.2%',
      auc:       '96.9%',
    },
    cardiovascular: {
      accuracy:  '98.5%',
      precision: '99.1%',
      recall:    '98.3%',
      f1:        '98.7%',
      auc:       '99.9%',
    }
  };
 
  parametros = [
    { nombre: 'n_estimators',  valor: '100',   desc: 'Número de árboles de decisión en el bosque' },
    { nombre: 'max_depth',     valor: 'None',  desc: 'Los árboles crecen hasta separar todas las clases' },
    { nombre: 'random_state',  valor: '42',    desc: 'Semilla para reproducibilidad de resultados' },
    { nombre: 'class_weight',  valor: 'balanced', desc: 'Compensa el desbalance de clases sin SMOTE' },
    { nombre: 'n_jobs',        valor: '-1',    desc: 'Usa todos los núcleos del CPU en paralelo' },
    { nombre: 'criterion',     valor: 'gini',  desc: 'Criterio de impureza para dividir cada nodo' },
  ];
 
  importanciasDiabetes = [
    { nombre: 'HbA1c_level',          valor: 0.42 },
    { nombre: 'blood_glucose_level',  valor: 0.28 },
    { nombre: 'age',                  valor: 0.16 },
    { nombre: 'bmi',                  valor: 0.08 },
    { nombre: 'smoking_history',      valor: 0.03 },
    { nombre: 'gender',               valor: 0.02 },
    { nombre: 'hypertension',         valor: 0.01 },
    { nombre: 'heart_disease',        valor: 0.00 },
  ];
 
  importanciasCardio = [
    { nombre: 'pendiente',              valor: 0.37 },
    { nombre: 'dolor de pecho',         valor: 0.15 },
    { nombre: 'presion arterial',       valor: 0.14 },
    { nombre: 'vasos principales',      valor: 0.10 },
    { nombre: 'colesterol serico',      valor: 0.08 },
    { nombre: 'electro en reposo',      valor: 0.06 },
    { nombre: 'frecuencia cardiaca',    valor: 0.05 },
    { nombre: 'depresion ST',           valor: 0.03 },
    { nombre: 'genero',                 valor: 0.01 },
    { nombre: 'glucemia en ayunas',     valor: 0.01 },
  ];
 
  get metricasActivas() {
    return this.metricas[this.tabActivo];
  }
 
  get importanciasActivas() {
    return this.tabActivo === 'diabetes'
      ? this.importanciasDiabetes
      : this.importanciasCardio;
  }

}
