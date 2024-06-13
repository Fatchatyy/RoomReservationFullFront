import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DahComponent } from './dah/dah.component';
import { ListefoyerComponent } from './listefoyer/listefoyer.component';
import { AddfoyerComponent } from './addfoyer/addfoyer.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ListeReservationComponent } from './liste-reservation/liste-reservation.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FilterPipe } from '../dashboard/liste-etudiant/filter.pipe';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginatorModule } from '@angular/material/paginator';
import {NgxPaginationModule} from 'ngx-pagination';
import { EtudiantService } from '../service/etudiant.service';
import { ListeUniversiteComponent } from './liste-universite/liste-universite.component';
import { UniversiteComponent } from './universite/universite.component';
import { UniversiteFormComponent } from './universite-form/universite-form.component';
import { ListeEtudiantComponent } from './liste-etudiant/liste-etudiant.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { EtudiantFormComponent } from './etudiant-form/etudiant-form.component';

/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'left',
      distance: 12,
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10,
    },
  },
  theme: 'material',
  behaviour: {
    autoHide: false,
    onClick: false,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease',
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: 'ease',
    },
    overlap: 150,
  },
};

@NgModule({
  declarations: [
    DahComponent,
    ListefoyerComponent,
    AddfoyerComponent,
    ListeReservationComponent,
    ReservationComponent,
    ReservationFormComponent,
    ListeEtudiantComponent,
    EtudiantComponent,
    EtudiantFormComponent,
    FilterPipe,
    ListeUniversiteComponent,
    UniversiteComponent,
    UniversiteFormComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,ReactiveFormsModule,
    NotifierModule.withConfig(customNotifierOptions),
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    MatPaginatorModule,
    CommonModule,
    NgxPaginationModule,
  ],
  providers: [EtudiantService],
})
export class DashboardModule { }
