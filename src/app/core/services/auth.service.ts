import { inject, Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../constants/storage-keys.constant";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  router = inject(Router)

  get UserToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.USER_TOKEN);
  }

  set UserToken(token: string) {
    localStorage.setItem(STORAGE_KEYS.USER_TOKEN, token)
  }

  logout() {
    this.clearUserData();
    this.router.navigate(['/login'])
  }

  clearUserData() {
    localStorage.clear();
  }
}
