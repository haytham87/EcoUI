import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from './services/base/alert.service';
import { BaseService } from './services/base/base.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ], providers: [ BaseService, AlertService]
})
export class CoreModule { }
