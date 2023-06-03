import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  controller = 'Upload';
  constructor(private base: BaseService) { }

    CategoryImage(file):Observable<any> {
      const formData = new FormData(); 
      formData.append("file", file, file.name);
      return this.base.save(this.controller + '/CategoryImage', formData)
  }

  DriverLiensesImage(file):Observable<any> {
      const formData = new FormData(); 
      formData.append("file", file, file.name);
      return this.base.save(this.controller + '/DriverLienses', formData)
  }


  OldMilitaryCardImage(file):Observable<any> {
      const formData = new FormData(); 
      formData.append("file", file, file.name);
      return this.base.save(this.controller + '/MilitaryCard', formData)
  }

  PersonalImage(file):Observable<any> {
      const formData = new FormData(); 
      formData.append("file", file, file.name);
      return this.base.save(this.controller + '/PersonImage', formData)
  }

  SignatureImage(file):Observable<any> {
      const formData = new FormData(); 
      formData.append("file", file, file.name);
      return this.base.save(this.controller + '/SignatureImage', formData)
  }


  IdentityImage(file):Observable<any> {
      const formData = new FormData(); 
      formData.append("file", file, file.name);
      return this.base.save(this.controller + '/Identity', formData)
  }

  MilitaryLetterImage(file):Observable<any> {
      const formData = new FormData(); 
      formData.append("file", file, file.name);
      return this.base.save(this.controller + '/MilitaryLetter', formData)
  }

  RequestLetterImage(file):Observable<any> {
      const formData = new FormData(); 
      formData.append("file", file, file.name);
      return this.base.save(this.controller + '/RequestLetter', formData)
  }

  RequestAttachment(file):Observable<any> {
      const fromData = new FormData();
      fromData.append("file", file, file.name);
      return this.base.save(this.controller + '/RequestAttachment', fromData)
  }

}
