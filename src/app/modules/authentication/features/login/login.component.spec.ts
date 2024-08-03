import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import LoginComponent from './login.component';
import { LoginRequest, LoginResponse } from '../../../../models/auth.model';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    // Create a spy for AuthService
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty fields', () => {
    const email = component.form.get('email');
    const password = component.form.get('password');
    expect(email?.value).toBe('');
    expect(password?.value).toBe('');
    expect(component.form.valid).toBeFalse();
  });

  it('should show email error when form is submitted and email is invalid', () => {
    component.formSubmitted = true;
    component.form.controls['email'].setValue('');
    expect(component.showEmailError).toBeTrue();
  });

  it('should show password error when form is submitted and password is invalid', () => {
    component.formSubmitted = true;
    component.form.controls['password'].setValue('');
    expect(component.showPasswordError).toBeTrue();
  });

  it('should not show email error if email is valid', () => {
    component.form.controls['email'].setValue('test@example.com');
    component.form.controls['email'].markAsTouched();
    expect(component.showEmailError).toBeFalse();
  });

  it('should call AuthService login with correct payload when form is valid', () => {
    const payload: LoginRequest = { email: 'test@example.com', password: 'password' };
    authServiceSpy.login.and.returnValue(of({ token: 'fake-token' } as LoginResponse));

    component.form.setValue(payload);
    component.handleFormSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledOnceWith(payload);
  });

  it('should handle login success and set UserToken', () => {
    authServiceSpy.login.and.returnValue(of({ token: 'fake-token' } as LoginResponse));
    component.form.setValue({ email: 'test@example.com', password: 'password' });

    component.handleFormSubmit();

    expect(authServiceSpy.UserToken).toBe('fake-token');
  });

  it('should handle login failure and log an error', () => {
    const consoleSpy = spyOn(console, 'error');
    authServiceSpy.login.and.returnValue(throwError(() => new Error('Login failed')));

    component.form.setValue({ email: 'test@example.com', password: 'password' });
    component.handleFormSubmit();

    expect(consoleSpy).toHaveBeenCalledWith('Login failed', jasmine.any(Error));
  });
});
