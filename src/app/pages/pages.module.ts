import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountToModule } from 'angular-count-to';

import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbDropdownModule,
  NgbAccordionModule, NgbNavModule,
  NgbProgressbarModule, NgbTooltipModule,
  NgbPopoverModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';

import {
  DxTreeListModule,
  DxDataGridModule,
  DxSelectBoxModule,
  DxCheckBoxModule,
  DxPopupModule,
  DxButtonModule,
  DxTreeViewModule,
  DxDropDownBoxModule,
  DxTagBoxModule,
  DxListModule,
  DxScrollViewModule,
  DxTextAreaModule,
  DxTemplateModule,
  DxTooltipModule,
  DxDateBoxModule,
  DxDropDownButtonModule,
  DxHtmlEditorModule,
  DxValidatorModule,
  DxValidationSummaryModule,
  DxTextBoxModule,DxAutocompleteModule,
  DxFormModule
} from 'devextreme-angular';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { WidgetModule } from '../shared/widget/widget.module';
import { SharedModule } from '../shared/shared.module';
import { BaseComponent } from './base/base/base.component';

import { TranslateModule } from '@ngx-translate/core';


import { BoxiconsComponent } from './icons/boxicons/boxicons.component';
import { DripiconsComponent } from './icons/dripicons/dripicons.component';
import { FontawsomeComponent } from './icons/fontawsome/fontawsome.component';
import { MaterialdesignComponent } from './icons/materialdesign/materialdesign.component';
import { BasicComponent } from './tables/basic/basic.component';
import { ChartsComponent } from './charts/charts.component';
import { UiComponent } from './ui/ui.component';
import { FormsModule } from '@angular/forms';

import { ArabicCharDirective } from '../core/directives/arabicChar.directive';
import { AlphabetOnlyDirective } from '../core/directives/alphabet-only.directive';
import { EnglishCharDirective } from '../core/directives/englishChar.directive';
import { SafePipe } from '../core/pipe/safe.pipe';
import { ItemsComponent } from './mainData/items/items.component';
import { ItemComponent } from './mainData/item/item.component';
import { CategoriesComponent } from './mainData/categories/categories.component';
import { BrandsComponent } from './mainData/brands/brands.component';
import { UsersComponent } from './security/users/users.component';
import { RolesComponent } from './security/roles/roles.component';
import { UserComponent } from './security/user/user.component';

@NgModule({
  declarations: [
    SafePipe,
    DashboardsComponent,
    ArabicCharDirective,
    AlphabetOnlyDirective,
    EnglishCharDirective,
    BaseComponent,
    BoxiconsComponent,
    DripiconsComponent,
    FontawsomeComponent,
    MaterialdesignComponent,
    BasicComponent,
    ChartsComponent,
    UiComponent,
    ItemsComponent,
    ItemComponent,
    CategoriesComponent,
    BrandsComponent,
    UsersComponent,
    RolesComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    WidgetModule,
    PagesRoutingModule,
    ScrollToModule.forRoot(),
    NgApexchartsModule,
    NgbDropdownModule,
    NgbAccordionModule,
    NgbNavModule,
    NgbProgressbarModule,
    NgbCollapseModule,
    NgbTooltipModule,
    TranslateModule,
    NgbPopoverModule,
    CountToModule,
    SharedModule,DxAutocompleteModule, DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxDropDownBoxModule, DxListModule, DxPopupModule,
    DxScrollViewModule, DxSelectBoxModule, DxTagBoxModule, DxTemplateModule, DxTextAreaModule, DxTreeListModule, DxTreeViewModule,
    DxTextBoxModule, DxFormModule, DxDateBoxModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE'
    }),
  ],
  providers: [
  ]
})
export class PagesModule { }
