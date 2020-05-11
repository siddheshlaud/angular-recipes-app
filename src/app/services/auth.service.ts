import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponseData } from '../models/auth-response-data.model';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBs6lvQmSiKyQtkGFY35-Ggf_x2NEA2OBI',
      {
        email: email,
        password: password,
        returnSecureToken: true
      });
  }

}