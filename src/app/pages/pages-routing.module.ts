import { UserComponent } from './security/user/user.component';
import { CategoriesComponent } from './mainData/categories/categories.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { DashboardsComponent } from './dashboards/dashboards.component';
import { BoxiconsComponent } from '../pages/icons/boxicons/boxicons.component';
import { DripiconsComponent } from './icons/dripicons/dripicons.component';
import { FontawsomeComponent } from './icons/fontawsome/fontawsome.component';
import { MaterialdesignComponent } from './icons/materialdesign/materialdesign.component';
import { BasicComponent } from './tables/basic/basic.component';
import { ChartsComponent } from './charts/charts.component';
import { UiComponent } from './ui/ui.component';
import { ItemsComponent } from './mainData/items/items.component';
import { ItemComponent } from './mainData/item/item.component';
import { BrandsComponent } from './mainData/brands/brands.component';
import { UsersComponent } from './security/users/users.component';
import { UserResolver, UsersResolver } from '../core/resolvers/sc/user.resolver';
import { RolesResolver } from '../core/resolvers/sc/role.resolver';
import { UserRolesResolver } from '../core/resolvers/sc/user-role.resolver';
import { RolesComponent } from './security/roles/roles.component';
import { MenusResolver } from '../core/resolvers/sc/menu.resolver';
import { ScreensResolver } from '../core/resolvers/sc/screen.resolver';
import { CategoriesResolver, CategoryResolver } from '../core/resolvers/st/category.resolver';
import { ItemResolver, ItemsResolver } from '../core/resolvers/st/item.resolver';
import { BrandsResolver } from '../core/resolvers/st/brand.resolver';
import { UserTypesResolver } from '../core/resolvers/sc/userType.resolver';


const routes: Routes = [
  {
    path: 'home',
    component: DashboardsComponent
  },
  {
    path:'category',
    component:CategoriesComponent,
    data:{
      title:'Categories',
      breadcrumb:'Categories'
    },
    resolve:{
      itemCategories:CategoriesResolver
    }
  },
  {
    path:'brand',
    component:BrandsComponent,
    data:{
      title:'Brand',

    },
    resolve:{
      brands:BrandsResolver,
      categories:CategoriesResolver
    }
  },
  {
    path:'item',
    component:ItemsComponent,
    data:{
      title:'Items',
      breadcrumb:'Items'
    },
    resolve:{
      items:ItemsResolver,
      categories:CategoriesResolver,
      brands: BrandsResolver
    }
  },
  {
    path:'item/:type/:id',
    component:ItemComponent,
    data:{
      title:'Items',
      breadcrumb:'Items'
    },
    resolve:{
      categories:CategoriesResolver,
      item:ItemResolver,
      items:ItemsResolver
    }
  },
  {
    path:'users',
    component:UsersComponent,
    data: {
      title: 'Users',
      breadcrumb: 'Users'
    },
    resolve: {
      itemsDataSource: UsersResolver,
      roles: RolesResolver,
      userRoles: UserRolesResolver,
      userTypes:UserTypesResolver
    }
  },
  {
    path:'user/:type/:id',
    component:UserComponent,
    data:{

    },
    resolve:{
      user:UserResolver,
      userTypes:UserTypesResolver
    }
  },
  {
    path:'roles',
    component:RolesComponent,
    data:{
      title:'Roles',
      breadcrumb:'Roles'
    },
    resolve:{
      itemsDataSource: RolesResolver,
      menus: MenusResolver,
      selectedMenus: MenusResolver,
      screens: ScreensResolver,
    }
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
