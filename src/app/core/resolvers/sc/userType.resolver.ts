import { Injectable } from "@angular/core";
import { ApiObjectData } from "../../models/apiObjectData";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { BaseService } from "../../services/base/base.service";
import { RoleService } from "../../services/sc/role.service";
import { UserTypeService } from "../../services/sc/user-type.service";

@Injectable({
    providedIn: 'root'
  })
  export class UserTypeResolver implements Resolve<ApiObjectData> {
    constructor(
      private service: UserTypeService,
      private baseService: BaseService
    ) {}
    resolve(route: ActivatedRouteSnapshot): Observable<ApiObjectData> {
        return this.baseService.resolveGet(this.service, route, '/page/roles');
    }
  }
  
  @Injectable({
    providedIn: 'root'
  })
  export class UserTypesResolver implements Resolve<ApiObjectData> {
    constructor(
      private service: UserTypeService,
      private baseService: BaseService
    ) {}
    resolve(): Observable<ApiObjectData> {
  
      return this.baseService.resolveGets(this.service);
    }
  }