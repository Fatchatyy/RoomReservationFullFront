import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutEtudiantComponent } from './layoutErudiant/layout-etudiant/layout-etudiant.component';
import { ListeFoyerComponent } from '../views/liste-foyer/liste-foyer.component';


import { ListeUniversiteComponent } from '../views/liste-universite/liste-universite.component';
import { ListeReservationComponent } from '../views/liste-reservation/liste-reservation.component';


const routes: Routes = [
  {path:'',component:LayoutEtudiantComponent,
  children :[ 
    {path:'listefoyer',component:ListeFoyerComponent},
    {path:'ListeUniversite',component: ListeUniversiteComponent},

    {path:'listereservation',component: ListeReservationComponent},


    


    
  ]
  
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtudiantRoutingModule { }
