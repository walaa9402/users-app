import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadUsers, loadUsersSuccess, loadUsersFailure, addUser, addUserSuccess, addUserFailure, updateUser, updateUserSuccess, updateUserFailure, deleteUser, deleteUserSuccess, deleteUserFailure } from './user.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { UserListResponse, UserService } from '../core/services/user.service';
import { userSignal } from '../core/signals/user.signals';
import { User } from '../models/user.model';

@Injectable()
export class UserEffects {

  userService = inject(UserService);
  actions$ = inject(Actions);

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(loadUsers),
    mergeMap(() => this.userService.getUsers().pipe(
      map((res: UserListResponse) => {
        const newUsersList = [...userSignal(), ...res.data]

        userSignal.set(newUsersList); // Update signal with users
        return loadUsersSuccess({ users: newUsersList });
      }),
      catchError(error => of(loadUsersFailure({ error: error.message })))
    ))
  ));

  addUser$ = createEffect(() => this.actions$.pipe(
    ofType(addUser),
    mergeMap(action => this.userService.addUser(action.user).pipe(
      map(user => addUserSuccess({ user })),
      catchError(error => of(addUserFailure({ error: error.message })))
    ))
  ));

  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(updateUser),
    mergeMap(action => this.userService.updateUser(action.user).pipe(
      map(user => updateUserSuccess({ user })),
      catchError(error => of(updateUserFailure({ error: error.message })))
    ))
  ));

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      mergeMap(action =>
        this.userService.deleteUser(action.userId).pipe(
          map(() => deleteUserSuccess({ userId: action.userId })),
          catchError(error => of(deleteUserFailure({ error: error.message })))
        )
      )
    )
  );

  // Effect to handle successful deletion
  afterDeleteUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUserSuccess),
      tap(action => {
        alert(`User with ID ${action.userId} was successfully deleted.`); // Show success message
      }),
      map(() => loadUsers()) // Dispatch loadUsers to refresh user list
    )
  );
}
