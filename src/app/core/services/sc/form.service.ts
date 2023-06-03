import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiObjectData } from '../../models/apiObjectData';
import { Form } from '../../models/sc/form';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})

export class FormService {

  controller = 'Form';
  constructor(private base: BaseService) { }

  get(id: any): Observable<ApiObjectData> {
    return this.base.get(id, this.controller);
  }

  gets(): Observable<ApiObjectData> {
    return this.base.gets(this.controller);
  }

  getUserForms(): Observable<ApiObjectData> {
    return this.base.gets(this.controller + '/GetUserForms/');
  }

  getByMenu(ids: any[]) {
    return this.base.save(this.controller+'/GetByMenuId',ids)
  }

  save(obj: Form) {
    return this.base.save(this.controller, obj);
  }

  remove(id: any) {
    return this.base.remove(this.controller, id);
  }
}