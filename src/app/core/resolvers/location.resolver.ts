import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable} from 'rxjs';
import { ApiObjectData } from '../models/apiObjectData';
import { BaseService } from '../services/base/base.service';
import { LocationService } from '../services/location.service';

@Injectable({
  providedIn: 'root'
})
export class LocationResolver implements Resolve<ApiObjectData|null> {
  constructor(
    private service: LocationService,
    private baseService: BaseService
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<ApiObjectData|null> {
      return this.baseService.resolveGet(this.service, route, '/page/branch');
  }
}

@Injectable({
  providedIn: 'root'
})
export class LocationsResolver implements Resolve<ApiObjectData> {
  constructor(
    private service: LocationService,
    private baseService: BaseService
  ) {}
  resolve(): Observable<ApiObjectData> {
    return this.baseService.resolveGets(this.service);
  }
}
