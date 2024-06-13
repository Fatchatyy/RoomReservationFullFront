import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtudiantRoutingModule } from './etudiant-routing.module';
import { LayoutEtudiantComponent } from './layoutErudiant/layout-etudiant/layout-etudiant.component';
import { ListeFoyerComponent } from '../views/liste-foyer/liste-foyer.component';
import { ListeReservationComponent } from '../views/liste-reservation/liste-reservation.component';
import { ListeUniversiteComponent } from '../views/liste-universite/liste-universite.component';


@NgModule({
  declarations: [
    LayoutEtudiantComponent,ListeFoyerComponent,ListeReservationComponent,ListeUniversiteComponent
  ],
  imports: [
    CommonModule,
    EtudiantRoutingModule
  ]
})
export class EtudiantModule { }
