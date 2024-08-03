import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from '../core/components/top-bar/top-bar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [TopBarComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export default class LayoutComponent {

}
