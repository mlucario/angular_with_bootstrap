import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RegisterUser } from '../models/auth-model/register-user';
import { map, tap, take, exhaustMap, catchError } from 'rxjs/operators';
import { SignInAccount } from '../models/auth-model/sign-in-user';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
// TODO WILL CHANGE WHEN DEPLOY TO SERVER
const API_URL = 'http://localhost:8081/api/v1/auth/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private tokenStorageService : TokenStorageService) {}

  signUp(registerUser: RegisterUser): Observable<RegisterUser> {
    // ! user have same property with back end , so we DON'T need to do manual
    // manual : { username : user.email , password: user.password }
    return this.httpClient.post<RegisterUser>(
      API_URL + 'signup',
      registerUser,
      httpOptions
    ).pipe(
      tap(_ => console.log('signUp account')),
      catchError(this.handleError<RegisterUser>('signUp'))
    );
  }

  signIn(signInUser :SignInAccount, option: any ): Observable<RegisterUser>{
    return this.httpClient.post<RegisterUser>(API_URL+"signin", signInUser);
  }

  signOut(): void{
    this.tokenStorageService.signOut();    
  }
    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      // * user error as paramater to send
      
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

   /** Log a HeroService message with the MessageService */
   private log(message: string) {
    console.log("AuthService error occured : " + message);
  }
}
