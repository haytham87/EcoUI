import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { DashboardsComponent } from './dashboards/dashboards.component';
import { BoxiconsComponent } from '../pages/icons/boxicons/boxicons.component';
import { DripiconsComponent } from './icons/dripicons/dripicons.component';
import { FontawsomeComponent } from './icons/fontawsome/fontawsome.component';
import { MaterialdesignComponent } from './icons/materialdesign/materialdesign.component';
import { BasicComponent } from './tables/basic/basic.component';
import { ChartsComponent } from './charts/charts.component';
import { UiComponent } from './ui/ui.component';


const routes: Routes = [
  {
    path: 'home',
    component: DashboardsComponent
  },
  {
    path: 'boxicons',
    component: BoxiconsComponent
  },
  {
    path: 'dripicons',
    component: DripiconsComponent
  },
  {
    path: 'fontawsome',
    component: FontawsomeComponent
  },
  {
    path: 'materialdesign',
    component: MaterialdesignComponent
  },
  {
    path: 'basic',
    component: BasicComponent
  },
  {
    path: 'charts',
    component: ChartsComponent
  },
  {
    path: 'ui',
    component: UiComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
