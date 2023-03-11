import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiObjectData } from '../models/apiObjectData';
import { Location } from '../models/bs/location';
import { BaseService } from './base/base.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  controller = 'Location';

  constructor(private base: BaseService) { }

  get(id: number): Observable<ApiObjectData> {
    return this.base.get(id, this.controller);
  }

  gets(): Observable<ApiObjectData> {
    return this.base.gets(this.controller);
  }

  save(obj: Location) {
    return this.base.save(this.controller, obj);
  }

  remove(id: number) {
    return this.base.remove(this.controller, id);
  }

}
