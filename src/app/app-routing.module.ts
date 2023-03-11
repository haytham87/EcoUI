import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout.component';
import { Page404Component } from './extrapages/page404/page404.component';
import { AdminGuard } from './core/guard/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full'},
  { path: 'auth', component: LoginComponent, loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: 'page', component: LayoutComponent, canActivate:[AdminGuard], loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
  { path: 'extra-pages', loadChildren: () => import('./extrapages/extrapages.module').then(m => m.ExtrapagesModule) },
  { path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
