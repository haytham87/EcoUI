import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { ApiObjectData } from '../../models/apiObjectData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleScreenService {

  controller = 'RoleForm';

  constructor(private base: BaseService) { }

  get(id): Observable<ApiObjectData> {
    return this.base.get(id, this.controller);
  }

  gets(): Observable<ApiObjectData> {
    return this.base.gets(this.controller);
  }

  // save(obj: RoleMenu) {
  //   return this.base.save(this.controller, obj);
  // }

  remove(id: number) {
    return this.base.remove(this.controller, id);
  }

  saveBatch(model: any) {
    return this.base.saveBatch(this.controller + '/SaveBatch/', model);
  }
}
