import { AfterViewInit, ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  isLoading = false;
  cd = inject(ChangeDetectorRef)
  loaderService = inject(LoaderService);

  ngAfterViewInit(): void {
    this.loaderService.requestCount$.subscribe(res => {
      this.isLoading = res > 0;
      this.cd.detectChanges();
    });
  }
}
