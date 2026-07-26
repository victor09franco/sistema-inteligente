import { Routes } from '@angular/router';

import { NavegacionComponent } from './barra-navegacion/navegacion/navegacion.component';

import { FormularioComponent } from './pages/formulario/formulario.component';

import { XgboostComponent } from './pages/xgboost/xgboost.component';
import { ResulHibridoComponent } from './pages/resul-hibrido/resul-hibrido.component';
import { RandonForestComponent } from './pages/randon-forest/randon-forest.component';

import { HistorialComponent } from './pages/historial/historial.component';
import { HomeComponent } from './pages/home/home.component';
import { InformacionComponent } from './pages/informacion/informacion.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';

export const routes: Routes = [
  {
    path: '',
    component: NavegacionComponent,
    children: [
      
      {
        path: 'inicio',
        component: HomeComponent,
      },
      {
        path: 'formulario',
        component: FormularioComponent
      },
      {
        path: 'historial',
        component: HistorialComponent
      },
      {
        path: 'random-forest',
        component: RandonForestComponent
      },
      
      {
        path: 'xgboost',
        component: XgboostComponent
      },
      {
        path: 'resul-hibrido',
        component: ResulHibridoComponent
      },
      {
        path: 'informacion',
        component: InformacionComponent,
      },
      {
        path: 'estadisticas',
        component: EstadisticasComponent,
      },
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      }
    ]
  }
];