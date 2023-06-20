import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { ApiObjectData } from '../../models/apiObjectData';
import { Observable } from 'rxjs';
import { Country } from '../../models/ad/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  controller = 'Country';
  constructor(private base: BaseService) { }

  get(id: number): Observable<ApiObjectData> {
    return this.base.get(id, this.controller);
  }

  gets(): Observable<ApiObjectData> {
    return this.base.gets(this.controller);
  }

  save(obj: Country) {
    return this.base.save(this.controller, obj);
  }

  remove(id: number) {
    return this.base.remove(this.controller, id);
  }
  
  delete(id:any){
    return this.base.delete(this.controller,id);
  }
}
