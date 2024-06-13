import { Injectable } from '@angular/core';
import { HttpClient, HttpParams , HttpHeaders} from '@angular/common/http';
import { environement } from 'src/Environnement/environement';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private UrlBackend= environement.baseurl;


  constructor(private http:HttpClient) { }
  getAllReservation(token:any)
  {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(`${this.UrlBackend}/reservations/retrieve-all-reservations`,{headers});
  }
  addReservation(reservation: any,token:any) {
    console.log("reached here",reservation);
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post(`${this.UrlBackend}/reservations/add-reservation`, reservation,{headers});
  }
  updateReservation(reservation: any, id: number,token:any) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.put(`${this.UrlBackend}/reservations/update-reservation`, reservation,{headers});
  }
  fetchUserById(id: number,token:any) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(`${this.UrlBackend}/reservations/retrieve-reservation/${id}`,{headers});
  }
  removeReservation(id: number,token:any) 
  {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.delete(`${this.UrlBackend}/reservations/remove-reservation/${id}`,{headers});
  }
 
 
  
  verifyCaptcha(recaptchaResponse: string,token:any): Observable<string> {
    const params = new HttpParams().set('recaptchaResponse', recaptchaResponse);
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post(`${this.UrlBackend}/reservations/yourEndpoint`, {}, { params, responseType: 'text',headers });
  }
  generatePdf(id: number,token:any): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    console.log("reached here");
    return this.http.get<any>(`${this.UrlBackend}/reservations/generate/${id}`,{headers});
  }
}
