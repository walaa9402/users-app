import { Routes } from '@angular/router';

const LayoutRoutes: Routes = [
  {
    path: "", redirectTo: "login", pathMatch: "full"
  },
  { path: "login", loadComponent: () => import("../modules/authentication/features/login/login.component") }
]

export default LayoutRoutes
