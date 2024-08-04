import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { USER_API } from '../apis/user.api';
import { List } from '../../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private http = inject(HttpClient)

  getUsers(): Observable<UserListResponse> {
    return this.http.get<UserListResponse>(USER_API.LIST);
  }

  addUser(user: { name: string, job: string }): Observable<any> {
    return this.http.post(USER_API.CREATE, user);
  }

  updateUser(user: { id: number, name: string, job: string }): Observable<any> {
    return this.http.put<any>(USER_API.UPDATE(user.id), user);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(USER_API.DELETE(userId));
  }
}

export type UserListResponse = List<User>
