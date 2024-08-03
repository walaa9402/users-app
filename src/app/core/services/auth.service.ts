import { inject, Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../constants/storage-keys.constant";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AUTH_API } from "../apis/auth.apis";
import { LoginRequest, LoginResponse } from "../../models/auth.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  router = inject(Router);
  private http = inject(HttpClient);

  get UserToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.USER_TOKEN);
  }

  set UserToken(token: string | null) {
    localStorage.setItem(STORAGE_KEYS.USER_TOKEN, token ?? "")
  }

  login(payload: LoginRequest) {
    return this.http.post<LoginResponse>(AUTH_API.LOGIN, payload);
  }

  logout() {
    this.clearUserData();
    this.router.navigate(['/login'])
  }

  clearUserData() {
    localStorage.clear();
  }
}
