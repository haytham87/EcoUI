import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable} from 'rxjs';
import { ApiObjectData } from '../../models/apiObjectData';
import { BaseService } from '../../services/base/base.service';
import { ItemService } from '../../services/st/item.service';

@Injectable({
  providedIn: 'root'
})
export class ItemResolver implements Resolve<ApiObjectData|null> {
  constructor(
    private service: ItemService,
    private baseService: BaseService
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<ApiObjectData|null> {
      return this.baseService.resolveGet(this.service, route, '/page/item');
  }
}

@Injectable({
  providedIn: 'root'
})
export class ItemsResolver implements Resolve<ApiObjectData> {
  constructor(
    private service: ItemService,
    private baseService: BaseService
  ) {}
  resolve(): Observable<ApiObjectData> {
    return this.baseService.resolveGets(this.service);
  }
}
