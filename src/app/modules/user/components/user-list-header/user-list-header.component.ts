import { Component, inject } from '@angular/core';
import { BreadcrumbComponent, IBreadcrumbItem } from '../../../../core/components/breadcrumb/breadcrumb.component';
import { DialogService } from '../../../../core/services/dialog.service';
import { UserDetailsComponent } from '../../features/user-details/user-details.component';

@Component({
  selector: 'app-user-list-header',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './user-list-header.component.html',
  styleUrl: './user-list-header.component.scss'
})
export class UserListHeaderComponent {

  private readonly dialogService = inject(DialogService)

  readonly userListBreadcrumbItems: IBreadcrumbItem[] = [
    { label: "Home", link: null },
    { label: "Dashboard", link: null },
  ];

  handleAddUser() {
    this.dialogService.open(UserDetailsComponent)
  }
}
