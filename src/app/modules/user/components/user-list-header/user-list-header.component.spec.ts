import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListHeaderComponent } from './user-list-header.component';
import { BreadcrumbComponent } from '../../../../core/components/breadcrumb/breadcrumb.component';
import { DialogService } from '../../../../core/services/dialog.service';
import { UserDetailsComponent } from '../../features/user-details/user-details.component';
import { Component } from '@angular/core';

// Mock Component for UserDetails
@Component({
  selector: 'app-user-details',
  template: '<div>User Details Component</div>',
})

// Mock DialogService
class MockDialogService {
  open = jasmine.createSpy('open');
}

describe('UserListHeaderComponent', () => {
  let component: UserListHeaderComponent;
  let fixture: ComponentFixture<UserListHeaderComponent>;
  let dialogService: MockDialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListHeaderComponent, BreadcrumbComponent], // Import the component and its dependencies
      providers: [{ provide: DialogService, useClass: MockDialogService }], // Provide the mock service
    }).compileComponents();

    fixture = TestBed.createComponent(UserListHeaderComponent);
    component = fixture.componentInstance;
    dialogService = TestBed.inject(DialogService) as unknown as MockDialogService;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize breadcrumb items correctly', () => {
    expect(component.userListBreadcrumbItems.length).toBe(2);
    expect(component.userListBreadcrumbItems[0].label).toBe('Home');
    expect(component.userListBreadcrumbItems[1].label).toBe('Dashboard');
  });

  it('should call dialogService.open with UserDetailsComponent when handleAddUser is called', () => {
    component.handleAddUser();
    expect(dialogService.open).toHaveBeenCalledWith(UserDetailsComponent);
  });
});
