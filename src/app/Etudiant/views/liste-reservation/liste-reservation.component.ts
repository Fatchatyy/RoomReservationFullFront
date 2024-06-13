import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/helpers/auth.service';
import { ReservationService } from 'src/app/service/reservation.service';

declare var grecaptcha: any;

@Component({
  selector: 'app-liste-reservation',
  templateUrl: './liste-reservation.component.html',
  styleUrls: ['./liste-reservation.component.css']
})
export class ListeReservationComponent implements OnInit {
  listeReservation: any = {};
  token!: string;
  recaptchaResponse: string = '';
  captchaVerified = false; // Add a flag to track if captcha is verified
  tokenn:any ="";

  constructor(private reservationService: ReservationService, private _router: Router, private auth: AuthService) {}

  ngOnInit(): void {
   this.recuperReservation();
  }



  recuperReservation() {
    this.auth.userToken$.subscribe((data:any)=>{
      this.tokenn = data;
    })
    this.reservationService.getAllReservation(this.tokenn).subscribe(
      (data) => {
        console.log(data);
        this.listeReservation = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  ToDetails(reservation: any) {

    this._router.navigate(['dashboard', reservation.idReservation, reservation.anneeUniversitaire]);
  }

  deleteRervation(id: number) {
    this.auth.userToken$.subscribe((data:any)=>{
      this.tokenn=data;
    })
    this.reservationService.removeReservation(id,this.tokenn).subscribe({
      next: () => (this.listeReservation = this.listeReservation.filter((reservation: any) => reservation.idReservation !== id))
    });
  }


  
}
