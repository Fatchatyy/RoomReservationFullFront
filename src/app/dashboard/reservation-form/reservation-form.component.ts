import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/helpers/auth.service';
import { ReservationService } from 'src/app/service/reservation.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent {

  reservation : any = {};
  id = 0;
  token : any="";
  constructor(private reservationService:ReservationService,private router:Router,private ac:ActivatedRoute,private auth : AuthService){}
  ngOnInit() {
    this.auth.userToken$.subscribe((data:any)=>{
      this.token=data;
    })
    this.id = this.ac.snapshot.params['id'];
      this.reservationService.fetchUserById(this.id,this.token).subscribe({
        next : (data)=>this.reservation = data as any
      })
      console.log("user id: ", this.id);
      console.log("this.reservation: ", this.reservation);
    
  }
  add(f: NgForm) {
    console.log(typeof(f.value))
    console.log("function works !")
    this.auth.userToken$.subscribe((data:any)=>{
      this.token = data;
    })
    if (this.id !== undefined) {
      console.log("chekcing reservation for update", this.reservation)
      this.reservationService.updateReservation(this.reservation, this.id,this.token).subscribe({
        next: () => 
        this.router.navigate(['/dashboard/listereservation']),
      });
    } else {
      console.log("checking reservation for add",this.reservation);
      
      this.reservationService.addReservation(this.reservation,this.token).subscribe({
        next: () => this.router.navigate(['/dashboard/listereservation']),
      });
    }
  }

  getButtonMessage() {
    console.log(this.id)
    return this.id !== undefined ? 'Update Reservation' : 'Add reservation';
  }
}
