import { Routes } from '@angular/router';

import { NavegacionComponent } from './barra-navegacion/navegacion/navegacion.component';

import { InicioComponent } from './pages/inicio/inicio.component';
import { FormularioComponent } from './pages/formulario/formulario.component';


import { XgboostComponent } from './pages/xgboost/xgboost.component';
import { ResulHibridoComponent } from './pages/resul-hibrido/resul-hibrido.component';
import { RandonForestComponent } from './pages/randon-forest/randon-forest.component';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';
import { HistorialComponent } from './pages/historial/historial.component';

export const routes: Routes = [
  {
    path: '',
    component: NavegacionComponent,
    children: [
      {
        path: 'inicio',
        component: InicioComponent,
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
        path: 'acerca-de',
        component: AcercaDeComponent
      },
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      }
    ]
  }
];