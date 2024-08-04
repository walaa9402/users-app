import { Component } from '@angular/core';
import { BreadcrumbComponent, IBreadcrumbItem } from '../../../../core/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-user-list-header',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './user-list-header.component.html',
  styleUrl: './user-list-header.component.scss'
})
export class UserListHeaderComponent {
  readonly userListBreadcrumbItems: IBreadcrumbItem[] = [
    { label: "Home", route: null },
    { label: "Dashboard", route: null },
  ]
}
