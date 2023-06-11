import { Injectable } from '@angular/core';
import { ApiObjectData } from '../../models/apiObjectData';
import { Observable } from 'rxjs';
import { UserType } from '../../models/sc/userType';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {
  controller = 'UserType';
  constructor(private base: BaseService) { }

  get(id: any): Observable<ApiObjectData> {
    return this.base.get(id, this.controller);
  }

  gets(): Observable<ApiObjectData> {
    return this.base.gets(this.controller);
  }

  save(obj: UserType) {
    return this.base.save(this.controller, obj);
  }

  remove(id: any) {
    return this.base.remove(this.controller, id);
  }
}
