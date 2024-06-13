import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { environement } from 'src/Environnement/environement';

@Injectable({
  providedIn: 'root'
})
export class UniversiteService {

  private UrlBackend= environement.baseurl;
  constructor(private http:HttpClient) { }
  getAlluniversite(token:any)
  {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(`${this.UrlBackend}/universite/retrieve-all-universites`,{headers});
  }
  /*getEtudiantsPagination(offset: number, pageSize: number) {
    return this.http.get(`${this.UrlBackend}/universite/pagination/${offset}/${pageSize}`);
  }*/
  searchUniversites(query: string,token:any) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(`${this.UrlBackend}/universite/search?query=${query}`,{headers});
  }
  addUniversite(universite: any,token:any) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    console.log("reached here",universite);
    return this.http.post(`${this.UrlBackend}/universite/add-universite`, universite,{headers});
  }
  updateUniversite(universite: any, id: number,token:any) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.put(`${this.UrlBackend}/universite/update-universite`, universite,{headers});
  }
  fetchUniversiteById(id: number,token:any) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    console.log("id",id);
    return this.http.get(`${this.UrlBackend}/universite/retrieve-universite/${id}`,{headers});
    
  }
  removeUniversite(id: number,token:any) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.delete(`${this.UrlBackend}/universite/remove-universite/${id}`,{headers});
  }
}
