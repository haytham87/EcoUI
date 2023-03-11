import { APP_INITIALIZER, NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { initFirebaseBackend } from './authUtils';

import { FakeBackendInterceptor } from './core/helpers/fake-backend';
import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbTooltipModule, NgbPopoverModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { LayoutsModule } from './layouts/layouts.module';
import { PagesModule } from './pages/pages.module';

import { BlockUIModule } from 'ng-block-ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtConfig, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ConfigService } from './core/services/base/config.service';
import { AuthService } from './core/services/sc/auth.service';
import { AdminGuard } from './core/guard/admin.guard';
import { SecureInnerPagesGuard } from './core/guard/SecureInnerPagesGuard.guard';
import { CookieService } from 'ngx-cookie-service';

// if (environment.defaultauth === 'firebase') {
//   initFirebaseBackend(environment.firebaseConfig);
// } else {
//   FakeBackendInterceptor;
// }
export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
export function tokenGetter() {
  return localStorage.getItem('token');
}

export function jwtConfigFactory(): JwtConfig {
  return {
    tokenGetter,
    allowedDomains: [],
    disallowedRoutes: [],
  }
}

export function jwtInitialiserFactory(configService: ConfigService, jwtConfig: JwtConfig): () => Promise<void> {
  return async () => {
    await configService.loadConfig();
    jwtConfig.allowedDomains.push(configService.config.baseUrl);
    jwtConfig.disallowedRoutes.push(configService.config.baseUrl + '/api/auth');
  };
}

const jwtOptionsProvider: Provider = {
  provide: JWT_OPTIONS,
  useFactory: jwtConfigFactory,
  deps: []
}

const jwtInitialiserProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: jwtInitialiserFactory,
  deps: [ConfigService, JWT_OPTIONS],
  multi: true,
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BlockUIModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PagesModule,
    NgbModule,
    NgbTooltipModule,
    NgbPopoverModule,
    NgbNavModule,
    LayoutsModule,
    TranslateModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: [environment.url],
        disallowedRoutes: [environment.url + '/api/auth']
      }
    })
  ],
  providers: [AuthService, AdminGuard, SecureInnerPagesGuard, CookieService, jwtInitialiserProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
