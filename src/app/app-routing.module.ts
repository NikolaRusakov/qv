import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: 'app/containers/dashboard/dashboard.module#DashboardModule',
  },
  {
    path: 'token-redirect/:token',
    loadChildren: 'app/containers/redirect/redirect.module#RedirectModule',
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
