import { Injectable } from "@angular/core";
import { MenuService } from "../../services/sc/menu.service";
import { BaseService } from "../../services/base/base.service";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { ApiObjectData } from "../../models/apiObjectData";

@Injectable({
    providedIn: 'root'
  })
  export class  MenuResolver implements Resolve<ApiObjectData> {
    constructor(
      private service: MenuService,
      private baseService: BaseService
    ) {}
    resolve(route: ActivatedRouteSnapshot): Observable<ApiObjectData> {
        return this.baseService.resolveGet(this.service, route, '/page/menus');
    }
  }
  
  @Injectable({
    providedIn: 'root'
  })
  export class MenusResolver implements Resolve<ApiObjectData> {
    constructor(
      private service: MenuService,
      private baseService: BaseService
    ) {}
    resolve(): Observable<ApiObjectData> {
      return this.baseService.resolveGets(this.service);
    }
  }