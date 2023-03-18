import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiObjectData } from '../../models/apiObjectData';
import { Store } from '../../models/st/store';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  controller = 'Store';
  constructor(private base: BaseService) { }

  get(id: number): Observable<ApiObjectData> {
    return this.base.get(id, this.controller);
  }

  gets(): Observable<ApiObjectData> {
    return this.base.gets(this.controller);
  }

  save(obj: Store) {
    return this.base.save(this.controller, obj);
  }

  remove(id: number) {
    return this.base.remove(this.controller, id);
  }
  
  delete(id:any){
    return this.base.delete(this.controller,id);
  }
}
