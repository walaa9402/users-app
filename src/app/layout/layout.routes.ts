import { Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

const LayoutRoutes: Routes = [
  {
    path: "", redirectTo: "login", pathMatch: "full"
  },
  { path: "login", loadComponent: () => import("../modules/authentication/features/login/login.component") },
  {
    path: "user",
    canActivate: [AuthGuard],
    loadComponent: () => import("../modules/user/features/user-list/user-list.component")
  },
]

export default LayoutRoutes
