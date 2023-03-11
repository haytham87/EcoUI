import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiObjectData } from '../../models/apiObjectData';
import { BaseService } from '../base/base.service';
import { Organization } from '../../models/Hr/organzation';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  controller = 'Organization';

  constructor(private base: BaseService) { }

  get(id: number): Observable<ApiObjectData> {
    return this.base.get(id, this.controller);
  }

  gets(): Observable<ApiObjectData> {
    return this.base.gets(this.controller);
  }

  getByUser(){
    return this.base.gets(this.controller+'/GetByUser');
  }

  save(obj: Organization) {
    return this.base.save(this.controller, obj);
  }

  remove(id: number) {
    return this.base.remove(this.controller, id);
  }
}
