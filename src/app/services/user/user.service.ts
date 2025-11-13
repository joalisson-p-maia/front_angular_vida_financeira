import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginType } from '../../types/LoginType';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  urlLogin = "http://localhost:3000/api/users/login";

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string): Observable<LoginType>{
    const body = {
      'email': email,
      'password': password
    };

    return this.http.post<LoginType>(this.urlLogin, body);
  }
}
