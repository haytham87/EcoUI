import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { ApiObjectData } from '../../models/apiObjectData';
import { Observable } from 'rxjs';
import { ItemPhoto } from '../../models/st/itemPhoto';

@Injectable({
  providedIn: 'root'
})
export class ItemPhotoService {

  controller = 'ItemPhoto';
  constructor(private base: BaseService) { }

  get(id: number): Observable<ApiObjectData> {
    return this.base.get(id, this.controller);
  }

  getsByCategoryId(id: number) {
    return this.base.gets(this.controller + '/GetByCategoryId/' + id);
  }

  getsByItemId(id: number) {
    return this.base.gets(this.controller + '/GetByItemId/' + id);
  }
  gets(): Observable<ApiObjectData> {
    return this.base.gets(this.controller);
  }

  setCatMain(id:number,catId:number){
    return this.base.gets(this.controller+'/SetCatMain/'+id+'/'+catId);
  }

  setItemMain(id:number,itemId:number){
    return this.base.gets(this.controller+'/SetItemMain/'+id+'/'+itemId);
  }

  save(obj: ItemPhoto) {
    return this.base.save(this.controller, obj);
  }

  remove(id: number) {
    return this.base.remove(this.controller, id);
  }
  
  delete(id:any){
    return this.base.delete(this.controller,id);
  }
}
