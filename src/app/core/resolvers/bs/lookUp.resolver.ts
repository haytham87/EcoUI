import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable} from 'rxjs';
import { ApiObjectData } from '../../models/apiObjectData';
import { BaseService } from '../../services/base/base.service';
import { LookUpService } from '../../services/bs/lookUp.service';

@Injectable({
  providedIn: 'root'
})
export class LookUpResolver implements Resolve<ApiObjectData|null> {
  constructor(
    private service: LookUpService,
    private baseService: BaseService
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<ApiObjectData|null> {
      return this.baseService.resolveGet(this.service, route, '/page/branch');
  }
}

@Injectable({
  providedIn: 'root'
})
export class LookUpsResolver implements Resolve<ApiObjectData> {
  constructor(
    private service: LookUpService,
    private baseService: BaseService
  ) {}
  resolve(): Observable<ApiObjectData> {
    return this.baseService.resolveGets(this.service);
  }
}
