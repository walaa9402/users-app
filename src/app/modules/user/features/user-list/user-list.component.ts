import { Component } from '@angular/core';
import { UserListHeaderComponent } from '../../components/user-list-header/user-list-header.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserListHeaderComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export default class UserListComponent {

}
