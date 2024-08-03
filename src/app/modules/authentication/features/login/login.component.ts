import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormControl, Validators } from '@angular/forms'
import { LoginRequest } from '../../../../models/auth.model';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {

  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]],
  })

  // form = new FormGroup({
  //   email: new FormControl(null, [Validators.required, Validators.email]),
  //   password: new FormControl(null, [Validators.required])
  // })

  handleFormSubmit() {
    if (this.form.valid) {
      const payload: LoginRequest = this.form.getRawValue();
      this.authService.login(payload).subscribe
    }

  }

}
