import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userName: string | null = null;

  constructor() { }

  logIn(userName: string) {
    this.userName = userName;
  }

  logOut() {
    this.userName = null;
  }
}
