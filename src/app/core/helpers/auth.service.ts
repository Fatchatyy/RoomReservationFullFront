import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  userRole$ = this.userRoleSubject.asObservable();

  updateUserRole(role: any) {
    this.userRoleSubject.next(role);
  }

  private userTokenSubject = new BehaviorSubject<string | null>(null);
  userToken$ = this.userTokenSubject.asObservable();

  updateUserToken(role: any) {
    this.userTokenSubject.next(role);
  }

  login(data: any): Observable<any> {
    return this.http.post('http://localhost:8081/SpringMVC/login', data);
  }
  register(data: any): Observable<any> {
    return this.http.post('http://localhost:8081/SpringMVC/register', data);
  }

  initiatePasswordReset(data: any): Observable<any> {
    return this.http.post('http://localhost:8081/SpringMVC/initiate', data);
  }

  confirmResetPassword(data: any): Observable<any> {
    return this.http.post('http://localhost:8081/SpringMVC/confirm', data);
  }

  getUserInfo(id:any,token:any): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get('http://localhost:8081/SpringMVC/userinfo/' + id, {
      headers,
    });
  }
}
