import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environement } from 'src/Environnement/environement';
import { AuthService } from '../core/helpers/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddfoyerService {
  private UrlBackend = environement.baseurl;
  constructor(private http: HttpClient, private auth: AuthService) {}

  token: any = '';
    public addfoyer(foyerdata: any,token:any):Observable<any>
    {
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

  return this.http.post(`${this.UrlBackend}/foyer/add-foyer`,foyerdata,{headers});

    }
  }

