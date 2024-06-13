import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/helpers/auth.service';
import { UniversiteService } from 'src/app/service/universite.service';

@Component({
  selector: 'app-universite',
  templateUrl: './universite.component.html',
  styleUrls: ['./universite.component.css']
})
export class UniversiteComponent {
  id: number = 0;
  universite : any;
  token:any="";
  constructor(private _activated: ActivatedRoute, private universiteService : UniversiteService , private auth:AuthService ) {

    /** pathParam exemple localhsot:4200/user/1/test*/
    this._activated.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      console.log(params.get('nomUniversite'))
      console.log(params.get('adresse'))
      console.log(params.get('id'));
    })
    this._activated.params.subscribe((params) => {
      console.log(params['nomUniversite']);
      console.log(params['adresse']);
      console.log(params['id']);
    });
    console.log(this._activated.snapshot.paramMap.get('nomUniversite'));
    console.log(this._activated.snapshot.params['adresse']);
    
    /** Query Param exemple : localhost:4200/user/1/test?min=5 */
    this._activated.queryParamMap.subscribe((params) => {
      console.log(params.get('min'));
    });
    this.auth.userToken$.subscribe((data:any)=>{
      this.token=data;
    })
    this.universiteService.fetchUniversiteById(this.id,this.token).subscribe({
      next : (data)=> {
        console.log("universite",data);
        this.universite = data as any
        
        console.log("iddd",this.id);
      }
    })


  }
}
