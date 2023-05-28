import { Observable, of } from "rxjs";
import { ApiObjectData } from "../../models/apiObjectData";
import { TranslateService } from "@ngx-translate/core";
import { AlertService } from "../../services/base/alert.service";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { AuthService } from "../../services/sc/auth.service";
import { BaseService } from "../../services/base/base.service";
import { UserService } from "../../services/sc/user.service";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
  })
  export class UserResolver implements Resolve<ApiObjectData> {
    constructor(
      private service: UserService,
      private baseService: BaseService
    ) { }
    resolve(route: ActivatedRouteSnapshot): Observable<ApiObjectData> {
      return this.baseService.resolveGet(this.service, route, '/page/user');
    }
  }
  
  @Injectable({
    providedIn: 'root'
  })
  export class UsersResolver implements Resolve<ApiObjectData> {
    constructor(
      private service: UserService,
      private baseService: BaseService
    ) { }
    resolve(): Observable<ApiObjectData> {
      return this.baseService.resolveGets(this.service);
    }
  }
  
  @Injectable({
    providedIn: 'root'
  })
  export class CurrantUserResolver implements Resolve<ApiObjectData> {
    constructor(
      private service: UserService,
      private baseService: BaseService
    ) { }
    resolve(): Observable<ApiObjectData> {
  
      return this.baseService.resolveOperation(this.service.getCurrant());
    }
  }
  
  @Injectable({
    providedIn: 'root'
  })
  export class UserDataResolver implements Resolve<ApiObjectData> {
    constructor(
      private service: UserService,
      private baseService: BaseService,
      private authService: AuthService,
      private router: Router,
      private alertService: AlertService,
      private translate: TranslateService
    ) { }
    resolve(): Observable<ApiObjectData> {
      return this.service.userData(this.authService.user.id).pipe(
        catchError(error => {
          this.alertService.error(this.translate.instant("toastrMsg.unexpectedError"));
  
          this.router.navigate(['']);
          return of(null);
        })
      );
  
    }
  }