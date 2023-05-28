import { Injectable } from '@angular/core';
import { Role } from '../../models/sc/role';
import { ApiObjectData } from '../../models/apiObjectData';
import { Observable } from 'rxjs';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  controller = 'role';

  constructor(private base: BaseService) { }

  get(id): Observable<ApiObjectData> {
    return this.base.get(id, this.controller);
  }

  gets(): Observable<ApiObjectData> {
    return this.base.gets(this.controller);
  }

  getRoleIdsData(): Observable<ApiObjectData> {
    return this.base.gets(this.controller+'/GetRoleIdsData');
  }

  getByStatus(id:any,roleId:any){
    return this.base.gets(this.controller+'/GetByStatus/'+id+'/'+roleId);
  }

  searchInRole(obj: Role) {
    return this.base.save(this.controller+'/SearchInRole', obj);
  }

  save(obj: Role) {
    return this.base.save(this.controller, obj);
  }

  remove(id: number) {
    return this.base.remove(this.controller, id);
  }

  // getAllRoles()
  // {
  //   http://matrixzone.ddns.net:30/api/form
  //   return this.base.gets("form");

  // }
}
