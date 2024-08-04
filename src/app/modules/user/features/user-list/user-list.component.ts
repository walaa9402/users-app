import { Component, OnInit, inject } from '@angular/core';
import { NgForOf } from '@angular/common';
import { Store } from '@ngrx/store';

import { UserListHeaderComponent } from '../../components/user-list-header/user-list-header.component';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { User } from '../../../../models/user.model';
import { UserState } from '../../../../store/user.reducer';
import { loadUsers, deleteUser } from '../../../../store/user.actions';
import { userSignal, userCountSignal } from '../../../../core/signals/user.signals';
import { DialogService } from '../../../../core/services/dialog.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserListHeaderComponent, NgForOf],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export default class UserListComponent implements OnInit {
  users = userSignal;
  userCount = userCountSignal;

  private readonly store = inject(Store<{ users: UserState }>);
  private readonly dialogService = inject(DialogService);

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
  }

  confirmDelete(user: User): void {
    this.dialogService.confirm('Are you sure you want to delete', `${user.first_name} ${user.last_name}`)
      .then((confirmed: boolean) => confirmed && this.deleteUser(user.id));
  }

  updateUser(user: User): void {
    this.dialogService.open(UserDetailsComponent, "sm", { id: user.id, name: `${user.first_name} ${user.last_name}`, job: "" });
  }

  deleteUser(userId: number): void {
    this.store.dispatch(deleteUser({ userId }));
  }
}
