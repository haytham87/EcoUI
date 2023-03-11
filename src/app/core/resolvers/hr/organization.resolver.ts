import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable} from 'rxjs';
import { ApiObjectData } from '../../models/apiObjectData';
import { BaseService } from '../../services/base/base.service';
import { OrganizationService } from '../../services/hr/organization.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationResolver implements Resolve<ApiObjectData|null> {
  constructor(
    private service: OrganizationService,
    private baseService: BaseService
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<ApiObjectData|null> {
      return this.baseService.resolveGet(this.service, route, '/page/organization');
  }
}

@Injectable({
  providedIn: 'root'
})
export class OrganizationsResolver implements Resolve<ApiObjectData> {
  constructor(
    private service: OrganizationService,
    private baseService: BaseService
  ) {}
  resolve(): Observable<ApiObjectData> {
    return this.baseService.resolveOperation(this.service.getByUser());
  }
}
