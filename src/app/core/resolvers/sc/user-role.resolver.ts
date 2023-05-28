import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { UserRoleService } from "../../services/sc/userrole.service";
import { ApiObjectData } from "../../models/apiObjectData";
import { Injectable } from "@angular/core";
import { BaseService } from "../../services/base/base.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class UserRoleResolver  implements Resolve<ApiObjectData> {
    constructor(
      private service: UserRoleService,
      private baseService: BaseService
    ) {}
    resolve(route: ActivatedRouteSnapshot): Observable<ApiObjectData> {
  
        return this.baseService.resolveGet(this.service, route, '/page/userroles');
    }
  }
  
  
  @Injectable({
    providedIn: 'root'
  })
  export class UserRoleByRoleResolver  implements Resolve<ApiObjectData> {
    constructor(
      private service: UserRoleService,
      private baseService: BaseService
    ) {}
    resolve(route: ActivatedRouteSnapshot): Observable<ApiObjectData> {
  
        return this.baseService.resolveOperation(this.service.getByRoleId(route.params.id));
    }
  }
  
  @Injectable({
    providedIn: 'root'
  })
  export class UserRolesResolver implements Resolve<ApiObjectData> {
    constructor(
      private service: UserRoleService,
      private baseService: BaseService
    ) {}
    resolve(): Observable<ApiObjectData> {
      return this.baseService.resolveGets(this.service);
    }
  }