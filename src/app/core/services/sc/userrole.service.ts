import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { ApiObjectData } from '../../models/apiObjectData';
import { Observable } from 'rxjs';
import { UserRole } from '../../models/sc/userRole';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  controller = 'userrole';

  constructor(private base: BaseService) { }

  get(id): Observable<ApiObjectData> {
    return this.base.get(id, this.controller);
  }

  gets(): Observable<ApiObjectData> {
    return this.base.gets(this.controller);
  }

  getByRoleId(id:number):Observable<ApiObjectData>{
    return this.base.gets(this.controller+'/GetByRole/'+id);
  }

  save(obj: UserRole) {
    return this.base.save(this.controller, obj);
  }

  saveMulti(obj: UserRole){
    return this.base.save(this.controller+'/SaveMulti',obj)
  }

  remove(id: number) {
    return this.base.remove(this.controller, id);
  }

  saveBatch(model: any) {
    return this.base.saveBatch(this.controller + '/SaveBatch/', model);
  }
}
