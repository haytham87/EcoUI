import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable} from 'rxjs';
import { ApiObjectData } from '../../models/apiObjectData';
import { BaseService } from '../../services/base/base.service';
import { ReservUserService } from '../../services/sc/reserv-user.service';

@Injectable({
  providedIn: 'root'
})
export class ReservUserResolver implements Resolve<ApiObjectData|null> {
  constructor(
    private service: ReservUserService,
    private baseService: BaseService
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<ApiObjectData|null> {
      return this.baseService.resolveGet(this.service, route, '/page/brnad');
  }
}

@Injectable({
  providedIn: 'root'
})
export class ReservUsersResolver implements Resolve<ApiObjectData> {
  constructor(
    private service: ReservUserService,
    private baseService: BaseService
  ) {}
  resolve(): Observable<ApiObjectData> {
    return this.baseService.resolveGets(this.service);
  }
}
