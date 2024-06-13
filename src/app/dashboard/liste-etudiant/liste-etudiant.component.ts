import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { EtudiantService } from 'src/app/service/etudiant.service';
import { FormControl } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Observable, Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/core/helpers/auth.service';

@Component({
  selector: 'app-liste-etudiant',
  templateUrl: './liste-etudiant.component.html',
  styleUrls: ['./liste-etudiant.component.css'],
  providers: [EtudiantService, FilterPipe]
})


export class ListeEtudiantComponent implements OnInit{
  sortAscending = true;
 sortDescending = false;
 filterName: string = '';
 Listeetudiant: any = {};
 currentPage: number = 1;
  totalPages: number = 10;
  pageSize: number = 3;
  token:any="";
  constructor(private etudiantservice:EtudiantService, private _router: Router, private auth : AuthService){
  }
  ngOnInit(): void {
    this.recuperetudiant(0, 3); 
   // this.recuperetudiants(); 
  };
   /*this.sortOrderControl.valueChanges.subscribe((value) => {
    if (value) {
      this.doSorting(value);
    }
  });*/
  
  sortStudents(prop: string) {
    this.sortAscending = !this.sortAscending;
    this.sortDescending = !this.sortDescending;
 
    if (this.sortAscending) {
      this.Listeetudiant.sort((a:any, b:any) => a[prop].localeCompare(b[prop]));
    } else {
      this.Listeetudiant.sort((a:any, b:any) => b[prop].localeCompare(a[prop]));
    }
 }
 recuperetudiant(offset: number, pageSize: number) {
  this.auth.userToken$.subscribe((data:any)=>{
    this.token=data;
  })
  this.etudiantservice.getEtudiantsPagination(offset, pageSize,this.token).subscribe(
    (data:any) => {
      console.log(data);
      this.Listeetudiant = data.response.content;
    },
    (error) => {
      console.error(error);
    }
  );
}
/*recuperetudiants() {
  this.etudiantservice.getAlletudiant().subscribe(
    (data: any) => {
      console.log(data);
      this.Listeetudiant = data.response; // Ou ajustez cette assignation en fonction de la structure des données
    },
    (error) => {
      console.error(error);
    }
  );
}*/

  sortStudent() {
    if (Array.isArray(this.Listeetudiant)) {
      this.Listeetudiant = this.sortStudentsByName(this.Listeetudiant);
    }
  }
  sortStudentsByName(students: any[]): any[] {
    return students.sort((a, b) => {
      const nameA = a.nomEt.toUpperCase();
      const nameB = b.nomEt.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.recuperetudiant(this.currentPage - 1, this.pageSize);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.recuperetudiant(this.currentPage - 1, this.pageSize);
    }
  }
  ToDetails(etudiant: any) {
    this._router.navigate(['dashboard/etudiant/', etudiant.idEtudiant, etudiant.nomEt]);
    console.log("etudiantID",etudiant.idEtudiant);
  }
  deleteEtudiant(id: number) { 
    this.auth.userToken$.subscribe((data:any)=>{
      this.token=data;
    })
    this.etudiantservice.removeEtudiant(id,this.token).subscribe({
       next : ()=>this.Listeetudiant = this.Listeetudiant.filter((etudiant : any )=>etudiant.idEtudiant!== id) }); 
      }

      downloadPDF() {
        this.auth.userToken$.subscribe((data:any)=>{
          this.token=data;
        })
        this.etudiantservice.downloadEtudiantPDF(this.token).subscribe(
          (data: Blob) => {
            const blob = new Blob([data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
          },
          (error) => {
            console.error(error);
          }
        );
      }
}
