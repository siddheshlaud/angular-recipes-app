import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { AuthResponseData } from "../models/auth-response-data.model";
import { catchError, tap } from "rxjs/operators";
import { throwError, Subject } from "rxjs";
import { User } from "../models/user.model";

@Injectable()
export class AuthService {
  user: Subject<User> = new Subject<User>();
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBs6lvQmSiKyQtkGFY35-Ggf_x2NEA2OBI",
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(respData => {
          this.handleAuthentication(
            respData.email,
            respData.locaId,
            respData.idToken,
            +respData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBs6lvQmSiKyQtkGFY35-Ggf_x2NEA2OBI",
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(respData => {
          this.handleAuthentication(
            respData.email,
            respData.locaId,
            respData.idToken,
            +respData.expiresIn
          );
        })
      );
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = "An Unknown error occured!";

    if (!errorRes.error || !errorRes.error) {
      return throwError(errorMsg);
    }

    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMsg = "The email address is already in use by another account.";
        break;
      case "OPERATION_NOT_ALLOWED":
        errorMsg = "Password sign-in is disabled for this project.";
        break;
      case "TOO_MANY_ATTEMPTS_TRY_LATER":
        errorMsg =
          "We have blocked all requests from this device due to unusual activity. Try again later.";
        break;
      case "EMAIL_NOT_FOUND":
        errorMsg =
          "There is no user record corresponding to this identifier. The user may have been deleted.";
        break;
      case "INVALID_PASSWORD":
        errorMsg = "The username/password is invalid";
        break;
      case "USER_DISABLED":
        errorMsg = "The user account has been disabled by an administrator.";
        break;
    }

    return throwError(errorMsg);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000); // respData.expiresIn is in secs
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }
}
