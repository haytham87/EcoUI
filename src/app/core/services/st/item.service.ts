import { Item } from './../../models/st/item';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiObjectData } from '../../models/apiObjectData';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  controller = 'Item';
  constructor(private base: BaseService) { }

  get(id: number): Observable<ApiObjectData> {
    return this.base.get(id, this.controller);
  }

  getsByCategoryId(id: number) {
    return this.base.gets(this.controller + '/GetByCategory/' + id);
  }

  gets(): Observable<ApiObjectData> {
    return this.base.gets(this.controller);
  }

  save(obj: Item) {
    return this.base.save(this.controller, obj);
  }

  uplaod(file: File) {
    return this.base.postFile('upload', 'ItemImage', file);
  }

  remove(id: number) {
    return this.base.remove(this.controller, id);
  }
  
  delete(id:any){
    return this.base.delete(this.controller,id);
  }
}
