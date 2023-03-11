import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiObjectData } from '../../models/apiObjectData';
import { LookUp } from '../../models/bs/lookUp';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class LookUpService {

  controller = 'LookUp';

  constructor(private base: BaseService) { }

  get(id: number): Observable<ApiObjectData> {
    return this.base.get(id, this.controller);
  }

  gets(): Observable<ApiObjectData> {
    return this.base.gets(this.controller);
  }

  save(obj: LookUp) {
    return this.base.save(this.controller, obj);
  }

  remove(id: number) {
    return this.base.remove(this.controller, id);
  }
}
