import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable} from 'rxjs';
import { ApiObjectData } from '../../models/apiObjectData';
import { BaseService } from '../../services/base/base.service';
import { CategoryService } from '../../services/st/category.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryResolver implements Resolve<ApiObjectData|null> {
  constructor(
    private service: CategoryService,
    private baseService: BaseService
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<ApiObjectData|null> {
      return this.baseService.resolveGet(this.service, route, '/page/Category');
  }
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesResolver implements Resolve<ApiObjectData> {
  constructor(
    private service: CategoryService,
    private baseService: BaseService
  ) {}
  resolve(): Observable<ApiObjectData> {
    return this.baseService.resolveGets(this.service);
  }
}
