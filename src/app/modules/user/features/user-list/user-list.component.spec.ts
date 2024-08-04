import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { NgForOf } from '@angular/common';
import { of } from 'rxjs';

import UserListComponent from './user-list.component'; // Import as default for standalone
import { UserListHeaderComponent } from '../../components/user-list-header/user-list-header.component';
import { DialogService } from '../../../../core/services/dialog.service';
import { User } from '../../../../models/user.model';
import { loadUsers, deleteUser } from '../../../../store/user.actions';
import { UserDetailsComponent } from '../user-details/user-details.component';

// Mock DialogService
class MockDialogService {
  confirm = jasmine.createSpy('confirm').and.returnValue(Promise.resolve(true));
  open = jasmine.createSpy('open');
}

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let store: Store;
  let dialogService: MockDialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent, UserListHeaderComponent, NgForOf, StoreModule.forRoot({})], // Move to imports
      providers: [
        { provide: DialogService, useClass: MockDialogService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    dialogService = TestBed.inject(DialogService) as unknown as MockDialogService;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadUsers action on initialization', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(loadUsers());
  });

  it('should call confirm dialog on confirmDelete', async () => {
    const user: User = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      avatar: 'https://example.com/avatar/johndoe.jpg'
    };
    await component.confirmDelete(user);
    expect(dialogService.confirm).toHaveBeenCalledWith('Are you sure you want to delete', 'John Doe');
  });

  it('should call deleteUser action if confirmed', async () => {
    spyOn(store, 'dispatch');
    const user: User = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      avatar: 'https://example.com/avatar/johndoe.jpg'
    };
    dialogService.confirm.and.returnValue(Promise.resolve(true));
    await component.confirmDelete(user);
    expect(store.dispatch).toHaveBeenCalledWith(deleteUser({ userId: 1 }));
  });

  it('should not call deleteUser action if not confirmed', async () => {
    spyOn(store, 'dispatch');
    const user: User = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      avatar: 'https://example.com/avatar/johndoe.jpg'
    };
    dialogService.confirm.and.returnValue(Promise.resolve(false));
    await component.confirmDelete(user);
    expect(store.dispatch).not.toHaveBeenCalledWith(deleteUser({ userId: 1 }));
  });

  it('should open UserDetailsComponent on updateUser', () => {
    const user: User = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      avatar: 'https://example.com/avatar/johndoe.jpg'
    };
    component.updateUser(user);
    expect(dialogService.open).toHaveBeenCalledWith(UserDetailsComponent, 'sm', { id: user.id, name: 'John Doe', job: '' });
  });
});
