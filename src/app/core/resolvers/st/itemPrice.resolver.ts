import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable} from 'rxjs';
import { ApiObjectData } from '../../models/apiObjectData';
import { BaseService } from '../../services/base/base.service';
import { ItemPriceService } from '../../services/st/item-price.service';

@Injectable({
  providedIn: 'root'
})
export class ItemPriceResolver implements Resolve<ApiObjectData|null> {
  constructor(
    private service: ItemPriceService,
    private baseService: BaseService
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<ApiObjectData|null> {
      return this.baseService.resolveGet(this.service, route, '/page/item');
  }
}

@Injectable({
  providedIn: 'root'
})
export class ItemPricesResolver implements Resolve<ApiObjectData> {
  constructor(
    private service: ItemPriceService,
    private baseService: BaseService
  ) {}
  resolve(): Observable<ApiObjectData> {
    return this.baseService.resolveGets(this.service);
  }
}
