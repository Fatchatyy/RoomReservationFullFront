import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DahComponent } from './dah/dah.component';
import { ListefoyerComponent } from './listefoyer/listefoyer.component';
import { AddfoyerComponent } from './addfoyer/addfoyer.component';
import { ListeReservationComponent } from './liste-reservation/liste-reservation.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ListeEtudiantComponent } from './liste-etudiant/liste-etudiant.component';
import { EtudiantFormComponent } from './etudiant-form/etudiant-form.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { ListeUniversiteComponent } from './liste-universite/liste-universite.component';
import { UniversiteFormComponent } from './universite-form/universite-form.component';
import { UniversiteComponent } from './universite/universite.component';

const routes: Routes = [
  {
    path:'',
    component: DahComponent,
    children: [
      {
        path: 'listereservation',
        component: ListeReservationComponent,
        children:[
          { path: 'update/:id', component: ReservationFormComponent },
          { path: 'add', component: ReservationFormComponent },
        ]
      },
      {
        path: 'ListeEtudiant',
        component: ListeEtudiantComponent,
      },
      { path: 'add/etudiant', component: EtudiantFormComponent },
      { path: 'update/etudiant/:id', component: EtudiantFormComponent  },
  
      { path: 'etudiant/:id/:name', component: EtudiantComponent },
  
      {
        path: 'ListeUniversite',
        component: ListeUniversiteComponent,
      },
      { path: 'add/universite', component: UniversiteFormComponent },
      { path: 'update/universite/:id', component: UniversiteFormComponent  },
  
      { path: 'universite/:id/:name', component: UniversiteComponent },
      {
           path:"listefoyer",component:ListefoyerComponent
        },
      { path: ':id/:name', component: ReservationComponent },
      {

           path:"addfoyer", component: AddfoyerComponent
       }
    ],
  
  },
// {
//   path:"dah",component: DahComponent,
 
// },
// {
//   path:"listefoyer",component:ListefoyerComponent
// },
// {
//   path:"listereservation",component:ListeReservationComponent
// },
// { path: 'update/:id', component: ReservationFormComponent },
// { path: 'add', component: ReservationFormComponent },
// { path: ':id/:name', component: ReservationComponent },
// {

//   path:"addfoyer", component: AddfoyerComponent
// }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
