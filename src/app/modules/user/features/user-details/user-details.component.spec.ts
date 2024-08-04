import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailsComponent } from './user-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store, StoreModule } from '@ngrx/store';
import { addUser, updateUser } from '../../../../store/user.actions';
import { UserState } from '../../../../store/user.reducer';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let activeModal: NgbActiveModal;
  let store: Store<{ users: UserState }>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailsComponent, ReactiveFormsModule, StoreModule.forRoot({})],
      providers: [
        NgbActiveModal,
        {
          provide: Store,
          useValue: {
            dispatch: jasmine.createSpy('dispatch')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    activeModal = TestBed.inject(NgbActiveModal);
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.form.controls['name'].value).toBe('');
    expect(component.form.controls['job'].value).toBe('');
  });

  it('should set form values when data input is provided', () => {
    component.data = { id: 1, name: 'John Doe', job: 'Developer' };
    component.ngOnInit();
    expect(component.form.value).toEqual({ id: 1, name: 'John Doe', job: 'Developer' });
  });

  it('should dispatch addUser action when form is submitted for new user', () => {
    component.form.setValue({ id: null, name: 'Jane Doe', job: 'Designer' });
    component.handleSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(addUser({ user: { name: 'Jane Doe', job: 'Designer' } }));
  });

  it('should dispatch updateUser action when form is submitted for existing user', () => {
    component.data = { id: 1, name: 'John Doe', job: 'Developer' };
    component.ngOnInit();
    component.handleSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(updateUser({ user: { id: 1, name: 'John Doe', job: 'Developer' } }));
  });

  it('should call NgbActiveModal close when closing dialog', () => {
    spyOn(activeModal, 'close');
    component.closeDialog();
    expect(activeModal.close).toHaveBeenCalled();
  });

  it('should show correct submit button text', () => {
    expect(component.submitButtonText).toBe('Add');
    component.data = { id: 1, name: 'John Doe', job: 'Developer' };
    expect(component.submitButtonText).toBe('Update');
  });

  it('should show name error when name is invalid and form submitted', () => {
    component.formSubmitted = true;
    component.form.controls['name'].setValue('');
    expect(component.showNameError).toBe(true);
  });

  it('should show job error when job is invalid and form submitted', () => {
    component.formSubmitted = true;
    component.form.controls['job'].setValue('');
    expect(component.showJobError).toBe(true);
  });
});
