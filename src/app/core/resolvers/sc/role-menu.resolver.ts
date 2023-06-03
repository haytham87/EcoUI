import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { ApiObjectData } from "../../models/apiObjectData";
import { RoleMenuService } from "../../services/sc/role-menu.service";
import { BaseService } from "../../services/base/base.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class RoleMenuResolver implements Resolve<ApiObjectData> {
    constructor(
      private service: RoleMenuService,
      private baseService: BaseService
    ) { }
    resolve(route: ActivatedRouteSnapshot): Observable<ApiObjectData> {
      return this.baseService.resolveGet(this.service, route, '/page/rolemenus');
    }
  }
  
  @Injectable({
    providedIn: 'root'
  })
  export class RoleMenusResolver implements Resolve<ApiObjectData> {
    constructor(
      private service: RoleMenuService,
      private baseService: BaseService
    ) { }
    resolve(): Observable<ApiObjectData> {
      return this.baseService.resolveGets(this.service);
    }
  }