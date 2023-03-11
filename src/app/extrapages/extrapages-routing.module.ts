import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Page500Component } from './page500/page500.component';
import { Page404Component } from './page404/page404.component';

const routes: Routes = [
  {
    path: '500',
    component: Page500Component
  },
  {
    path: '404',
    component: Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtrapagesRoutingModule { }
