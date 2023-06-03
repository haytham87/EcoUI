import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  constructor(private base: BaseService) { 
   
  }

  getAllScreens()
  {
    return this.base.gets( 'form' );

  }
}
