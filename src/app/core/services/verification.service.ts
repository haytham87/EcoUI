import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';
import { ApiObjectData } from '../models/apiObjectData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  controller = 'Verification';
  constructor(private base: BaseService) { }

  get(email: string): Observable<ApiObjectData> {
    return this.base.gets(this.controller+'/SendVerifiByEmail/'+email);
  }
}
