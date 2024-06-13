import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/helpers/auth.service';
import { EtudiantService } from 'src/app/service/etudiant.service';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent {
  id: number = 0;
  etudiant : any;
  token:any ="";
  constructor(private _activated: ActivatedRoute, private etudiantService : EtudiantService, private auth: AuthService  ) {

    /** pathParam exemple localhsot:4200/user/1/test*/
    this._activated.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      console.log(params.get('nomEt'))
      console.log(params.get('prenomEt'))
      console.log(params.get('id'));
    })
    this._activated.params.subscribe((params) => {
      console.log(params['nomEt']);
      console.log(params['prenomEt']);
      console.log(params['id']);
    });
    console.log(this._activated.snapshot.paramMap.get('nomEt'));
    console.log(this._activated.snapshot.params['prenomEt']);
    
    /** Query Param exemple : localhost:4200/user/1/test?min=5 */
    this._activated.queryParamMap.subscribe((params) => {
      console.log(params.get('min'));
    });
    this.auth.userToken$.subscribe((data:any)=>{
      this.token=data;
    })
    this.etudiantService.fetchUserById(this.id,this.token).subscribe({
      next : (data)=> {
        console.log("etudiant",data);
        this.etudiant = data as any
        
        console.log("iddd",this.id);
      }
    })


  }

}
