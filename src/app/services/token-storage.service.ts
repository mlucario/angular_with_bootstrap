import { Injectable } from '@angular/core';
import { UserToken } from '../models/auth-model/user-token';


const TOKEN_KEY = "auth-token";
const USER_KEY = "auth-user";
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(){
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USER_KEY);
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
  }

  public saveTokenToSessionStorage(token : string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public saveTokenToLocalStorage(token : string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getTokenFromSessionStorage(): string{
    return window.sessionStorage.getItem(TOKEN_KEY) || "";
  }

  public getTokenFromLocalStorage(): string{
    return window.localStorage.getItem(TOKEN_KEY) || "";
  }

  public saveUserToSessionStorage(user: UserToken ): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public saveUserToLocalStorage(user: UserToken ): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUserFromSessionStorage(): any{    
    return JSON.parse(window.sessionStorage.getItem(USER_KEY) || '{}');
  }

  public getUserFromLocalStorage(): any{    
    return JSON.parse(window.localStorage.getItem(USER_KEY) || '{}');
  }

}
