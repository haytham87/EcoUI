import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Menu } from '../../models/sc/menu';
import { ApiObjectData } from '../../models/apiObjectData';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  controller = 'Menu';

  constructor(private base: BaseService) { }

  get(id: number): Observable<ApiObjectData> {
    return this.base.get(id, this.controller);
  }

  gets(): Observable<ApiObjectData> {
    return this.base.gets(this.controller);
  }
  getUserMenus(): Observable<ApiObjectData> {
    return this.base.gets(this.controller + '/GetUserMenus');
  }

  save(obj: Menu) {
    return this.base.save(this.controller, obj);
  }

  remove(id: number) {
    return this.base.remove(this.controller, id);
  }

}
