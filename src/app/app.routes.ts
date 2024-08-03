import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    loadComponent: () => import("./layout/layout.component"),
    loadChildren: () => import("./layout/layout.routes"),
  },
  {
    path: "**",
    loadComponent: () =>
      import("./pages/not-found/not-found.component").then(page => page.NotFoundComponent),
  },
];
