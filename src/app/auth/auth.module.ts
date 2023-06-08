import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgOtpInputModule } from  'ng-otp-input';

import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    LoginComponent,
    ForgetPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    NgOtpInputModule
  ]
})
export class AuthModule { }