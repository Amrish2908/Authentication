import { Injectable } from '@angular/core';
import { config } from '../../config';
import { HttpClient } from '@angular/common/http';
import { AuthResponce } from '../../appInterface/auth-responce.interface';
import { ErrorService } from '../Error/error.service';
import { catchError, Observable, Subject, tap } from 'rxjs';
import { User } from 'src/app/appModels/userModels';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  user = new Subject<User>();
  constructor(private http: HttpClient, private errMsg: ErrorService) { }


  signUp(email: any, password: any) {
    return this.http.post<AuthResponce>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + config.Api_key, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(err => {
        return this.errMsg.heanderError(err);
      }))
  }
  signIn(email: any, password: any) {
    return this.http.post<AuthResponce>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + config.Api_key, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(err => {
        return this.errMsg.heanderError(err);
      }))
  }

  //  authenticatedUser(email: any, userId: any, token: any, expiresIn: any) {
  //   const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  //   const user = new User(email, userId, token, expirationDate)

  //   this.user.next(user)
  // }

}
