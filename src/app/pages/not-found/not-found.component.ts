import { Component, inject } from "@angular/core";

import { Router, RouterModule } from "@angular/router";

@Component({
  selector: "app-not-found",
  standalone: true,
  imports: [RouterModule],
  templateUrl: "./not-found.component.html",
  styleUrls: ["./not-found.component.scss"],
})
export class NotFoundComponent {
  router = inject(Router);

  handleBackClick() {
    this.router.navigate(['/login']);

  }
}
