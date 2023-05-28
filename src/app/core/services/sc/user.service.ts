import { Injectable } from '@angular/core';
import { ApiObjectData } from '../../models/apiObjectData';
import { Observable } from 'rxjs';
import { User, UserChangePassword } from '../../models/auth.models';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
  export class UserService {

    controller = 'user';
  
    constructor(private base: BaseService) { }
  
    get(id): Observable<ApiObjectData> {
      return this.base.get(id, this.controller);
    }
  
    getCurrant(): Observable<ApiObjectData> {
      return this.base.gets(this.controller + '/GetCurrant');
    }
  
    userData(id): Observable<ApiObjectData> {
      return this.base.get(id, this.controller + '/UserData');
    }
  
    gets(): Observable<ApiObjectData> {
      return this.base.gets(this.controller);
    }
  
    getPersonsForUser(obj :User) {
      return this.base.save(this.controller + '/GetPersonsForUser',obj);
    }
  
    checkUserNameExist(userName: string) {
      return this.base.gets(this.controller + '/CheckUserNameExist/' + userName)
    }
  
    ChangePassword(obj: UserChangePassword) {
      return this.base.save(this.controller + '/ChangePassword', obj);
    }
  
    getUserByUserName(username: string) {
      return this.base.gets(this.controller + '/GetUserByUserName/' + username)
    }
  
    changePasswordByOtp(obj: UserChangePassword) {
      return this.base.save(this.controller + '/ChangePasswordByOtp', obj);
    }
  
    searchInUser(obj: User) {
      return this.base.save(this.controller+'/SearchInUser', obj);
    }
  
    save(obj: User) {
      return this.base.save(this.controller, obj);
    }
  
    remove(id: number) {
      return this.base.remove(this.controller, id);
    }
  }