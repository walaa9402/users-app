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
  private authService = inject(AuthService);
  private isLoggedIn: boolean = !!this.authService.UserToken;

  get mainActionText(): string {
    return this.isLoggedIn ? "enquire" : "login"
  }
}
