import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { LoginRequest, LoginResponse } from '../../../../models/auth.model';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {

  formSubmitted = false;

  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]],
  })

  get showEmailError() {
    return this.formSubmitted || this.form.controls.email.touched;
  }

  get showPasswordError() {
    return this.formSubmitted || this.form.controls.password.touched;
  }

  handleFormSubmit() {
    this.formSubmitted = true;
    if (this.form.valid) {
      const payload: LoginRequest = this.form.getRawValue();
      this.authService.login(payload).subscribe((res: LoginResponse) => {
        this.authService.UserToken = res.token;

      })
    }

  }

}
