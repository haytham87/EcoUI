import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiObjectData } from '../../models/apiObjectData';
import { Category } from '../../models/st/category';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  controller = 'Category';
  constructor(private base: BaseService) { }

  get(id: number): Observable<ApiObjectData> {
    return this.base.get(id, this.controller);
  }

  gets(): Observable<ApiObjectData> {
    return this.base.gets(this.controller);
  }

  save(obj: Category) {
    return this.base.save(this.controller, obj);
  }

  uplaod(file: File) {
    return this.base.postFile('upload', 'CategoryImage', file);
  }

  remove(id: number) {
    return this.base.remove(this.controller, id);
  }
  
  delete(id:any){
    return this.base.delete(this.controller,id);
  }
}
