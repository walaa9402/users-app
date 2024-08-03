import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
  authService = inject(AuthService);

  get isLoggedIn() {
    return !!this.authService.UserToken;
  }

  get mainActionText(): string {
    return this.isLoggedIn ? "enquire" : "login"
  }
}
