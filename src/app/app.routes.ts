import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./layout/layout.component"),
    loadChildren: () => import("./layout/layout.routes"),
  },
  {
    path: "**",
    loadComponent: () =>
      import("./pages/not-found/not-found.component").then(page => page.NotFoundComponent),
  },
];
