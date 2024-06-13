import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/helpers/auth.service';
import { ReservationService } from 'src/app/service/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  id: number = 0;
  reservation : any;
  token : any ="";
  constructor(private _activated: ActivatedRoute, private reservationService : ReservationService ,private auth:AuthService ) {
   
    /** pathParam exemple localhsot:4200/user/1/test*/
    this._activated.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      console.log(params.get('anneeUniversitaire'))
      console.log(params.get('id'));
    })
    this._activated.params.subscribe((params) => {
      console.log(params['anneeUniversitaire']);
      console.log(params['id']);
    });
    console.log(this._activated.snapshot.paramMap.get('anneeUniversitaire'));
    console.log(this._activated.snapshot.params['anneeUniversitaire']);
    
    /** Query Param exemple : localhost:4200/user/1/test?min=5 */
    this._activated.queryParamMap.subscribe((params) => {
      console.log(params.get('min'));
    });
    this.auth.userToken$.subscribe((data:any)=>{
      this.token=data;
    })
    this.reservationService.fetchUserById(this.id,this.token).subscribe({
      next : (data)=> {this.reservation = data as any}
    })


  }
}
