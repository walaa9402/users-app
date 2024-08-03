import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { USER_API } from '../apis/user.api';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(USER_API.LIST);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(USER_API.CREATE, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(USER_API.UPDATE(user.id), user);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(USER_API.DELETE(userId));
  }
}
