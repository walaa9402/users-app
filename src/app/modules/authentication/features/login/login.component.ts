// login.component.ts

import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { LoginRequest, LoginResponse } from '../../../../models/auth.model';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Corrected styleUrl to styleUrls
})
export default class LoginComponent {

  formSubmitted: boolean = false;
  form: FormGroup;

  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  constructor() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get showEmailError(): boolean {
    const { email } = this.form.controls;
    return this.formSubmitted || email.touched;
  }

  get showPasswordError(): boolean {
    const { password } = this.form.controls;
    return this.formSubmitted || password.touched;
  }

  handleFormSubmit(): void {
    this.formSubmitted = true;
    if (this.form.valid) {
      const payload: LoginRequest = this.form.getRawValue();
      this.authService.login(payload).subscribe({
        next: (res: LoginResponse) => {
          this.authService.UserToken = res.token;
          this.router.navigate(['/user']);
        },
        error: (err) => {
          console.error('Login failed', err);
          // Handle login error, e.g., show an error message
        }
      });
    }
  }
}
