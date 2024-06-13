import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environement } from 'src/Environnement/environement';


@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  private UrlBackend= environement.baseurl;
  constructor(private http:HttpClient) { }
  getAlletudiant(token:any)
  {

    return this.http.get(`${this.UrlBackend}/etudiant/retrieve-all-etudiants`);
  }
  getEtudiantsPagination(offset: number, pageSize: number,token:any) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(`${this.UrlBackend}/etudiant/pagination/${offset}/${pageSize}`,{headers});
  }
  downloadEtudiantPDF(token:any) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(`${this.UrlBackend}/etudiant/openpdf`, { responseType: 'blob',headers },);
  }
  addEtudiant(etudiant: any,token:any) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    console.log("reached here",etudiant);
    return this.http.post(`${this.UrlBackend}/etudiant/add-etudiant`, etudiant,{headers});
  }
  updateEtudiant(etudiant: any, id: number,token:any) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.put(`${this.UrlBackend}/etudiant/update-etudiant`, etudiant,{headers});
  }
  fetchUserById(id: number,token:any) {
    console.log("id",id);
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(`${this.UrlBackend}/etudiant/retrieve-etudiant/${id}`,{headers});
    
  }
  removeEtudiant(id: number,token:any) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.delete(`${this.UrlBackend}/etudiant/remove-etudiant/${id}`,{headers});
  }
}
