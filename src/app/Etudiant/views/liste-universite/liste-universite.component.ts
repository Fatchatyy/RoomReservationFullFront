import { Component, OnInit  } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthService } from 'src/app/core/helpers/auth.service';
import { UniversiteService } from 'src/app/service/universite.service';

@Component({
  selector: 'app-liste-universite',
  templateUrl: './liste-universite.component.html',
  styleUrls: ['./liste-universite.component.css']
})
export class ListeUniversiteComponent implements OnInit{
  Listeuniversite: any = {};
  searchQuery: string = '';
  token:any="";
  constructor(private universiteservice:UniversiteService, private _router: Router,private auth :AuthService){
  }
  ngOnInit(): void {
    //this.recuperetudiant(0, 10); 
   this.recuperuniversites()
  };
   /*this.sortOrderControl.valueChanges.subscribe((value) => {
    if (value) {
      this.doSorting(value);
    }
  });*/
  
  
 /*recuperetudiant(offset: number, pageSize: number) {
  this.etudiantservice.getEtudiantsPagination(offset, pageSize).subscribe(
    (data:any) => {
      console.log(data);
      this.Listeetudiant = data.response.content;
    },
    (error) => {
      console.error(error);
    }
  );
}*/
recuperuniversites() {
  if (this.searchQuery.trim() !== '') {
    this.auth.userToken$.subscribe((data:any)=>{
      this.token=data;
    })
    this.universiteservice.searchUniversites(this.searchQuery,this.token).subscribe(
      (data) => {
        console.log(data);
        this.Listeuniversite = data;
      },
      (error) => {
        console.error(error);
      }
    );
  } else {
    this.auth.userToken$.subscribe((data:any)=>{
      this.token=data;
    })
    this.universiteservice.getAlluniversite(this.token).subscribe(
      (data) => {
        console.log(data);
        this.Listeuniversite = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
searchUniversite() {
  this.recuperuniversites();
}


ToDetailsUniversite(universite: any) {
    this._router.navigate(['dashboard/universite/', universite.idUniversite, universite.nomUniversite]);
    console.log("universiteID",universite.idUniversite);
  }
  deleteUniversite(id: number) { 
    this.auth.userToken$.subscribe((data:any)=>{
      this.token=data;
    })
    this.universiteservice.removeUniversite(id,this.token).subscribe({
       next : ()=>this.Listeuniversite = this.Listeuniversite.filter((universite : any )=>universite.idUniversite!== id) }); 
      }
}
