import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AlertService } from './alert.service';
import { ConfigService } from './config.service';
import { ApiObjectData } from '../../models/apiObjectData';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  @BlockUI() blockUI: NgBlockUI;
  isRTL: boolean;
  dir: string;
  lang: string;
  
  appUrl = this.configService.config.appUrl;
  apiUrl = this.configService.config.appUrl + 'api/';
  apiReportUrl = this.configService.config.baseReportURL + 'api/';

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertService: AlertService,
    private configService: ConfigService,
  ) {
  }

  get(id: number, controller: string): Observable<ApiObjectData> {
    return this.http.get<ApiObjectData>(this.apiUrl + controller + '/' + id);
  }

  gets(controller: string): Observable<ApiObjectData> {
    return this.http.get<ApiObjectData>(this.apiUrl + controller + '/');
  }

  save(controller: string, model: any) {
    return this.http.post(this.apiUrl + controller + '/', model);
  }

  saveBatch(controller: string, model: any) {
    return this.http.post(this.apiUrl + controller + '/', model);
  }

  remove(controller: string, id: number) {
    return this.http.delete(this.apiUrl + controller + '/remove/' + id);
  }

  delete(controller: string, id: number) {
    return this.http.delete(this.apiUrl + controller + '/delete/' + id);
  }

  getByUser(id: number, controller: string): Observable<ApiObjectData> {
    return this.http.get<ApiObjectData>(
      this.apiUrl + controller + '/GetUserMenu/' + id
    );
  }

  post(controller: string, operation: string, model: any) {
    return this.http.post(this.apiUrl + controller + '/' + operation, model);
  }

  postFile(controller: string, operation: string, fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post(this.apiUrl + controller + '/' + operation, formData);
  }

  find(searchText: string, controller: string): Observable<ApiObjectData> {
    return this.http.get<ApiObjectData>(
      this.apiUrl + controller + '/find/' + searchText
    );
  }

  observ(observ: any): Observable<ApiObjectData> {
    return observ.pipe(
      catchError(error => {
        this.alertService.error(
          'حدث خطأ غير متوقع يرجي إعادة المحاولة أو مراجعة مسؤول النظام'
        );
        console.log(error);
        this.router.navigate(['']);
        return of(null);
      })
    );
  }

  observnav(observ: any, commands: any[]): Observable<ApiObjectData> {
    return observ.pipe(
      catchError(error => {
        this.alertService.error(
          'حدث خطأ غير متوقع يرجي إعادة المحاولة أو مراجعة مسؤول النظام'
        );
        console.log(error);
        this.router.navigate(commands);
        return of(null);
      })
    );
  }

  resolveGet(
    service: any,
    route: ActivatedRouteSnapshot,
    url: string
  ): Observable<ApiObjectData> {
    if (route.params.type === 'edit' || route.params.type === 'view') {
      return this.observnav(service.get(route.params.id), [
        url,
        route.params.empId
      ]);
    } else {
      return of(null);
    }
  }

  resolveGets(service: any): Observable<ApiObjectData> {
    return this.observ(service.gets());
  }

  resolveGetOther(service: any): Observable<ApiObjectData> {
    return this.observ(service);
  }

  resolveOperation(operation: any): Observable<ApiObjectData> {
    return this.observ(operation);
  }

  blockStart() {
    if (this.isRTL) {
      this.blockUI.start('تحميل البيانات');
    } else {
      this.blockUI.start('Loading Data');
    }
  }

  blockStartMsg(msg: string) {
    this.blockUI.start(msg);
  }

  blockStop() {
    this.blockUI.stop();
  }

  convetDateToString(value: NgbDateStruct): string {
    let result = '';
    if (value && value.day != null) {
      result += value.year.toString();
      result += '/';
      if (value.month.toString().length === 1) {
        result += '0' + value.month.toString();
      } else {
        result += value.month.toString();
      }
      result += '/';
      if (value.day.toString().length === 1) {
        result += '0' + value.day.toString();
      } else {
        result += value.day.toString();
      }
      return result;
    }
    return '';
  }

  convetStringToDate(value: string): NgbDateStruct {
    if (value) {
      let dateParts = value
        .substr(0, 10)
        .trim()
        .split('-');
      if (dateParts.length === 3) {
        if (dateParts[0].length === 4) {
          return {
            year: Number(dateParts[0]),
            month: Number(dateParts[1]),
            day: Number(dateParts[2])
          };
        } else if (dateParts[2].length === 4) {
          return {
            day: Number(dateParts[0]),
            month: Number(dateParts[1]),
            year: Number(dateParts[2])
          };
        }
      }
      dateParts = value
        .substr(0, 10)
        .trim()
        .split('/');
      if (dateParts.length === 3) {
        if (dateParts[0].length === 4) {
          return {
            year: Number(dateParts[0]),
            month: Number(dateParts[1]),
            day: Number(dateParts[2])
          };
        } else if (dateParts[2].length === 4) {
          return {
            day: Number(dateParts[0]),
            month: Number(dateParts[1]),
            year: Number(dateParts[2])
          };
        }
      }
    }
    return null;
  }

  CheckIdentityExsist(Identity: string, controller: string): Observable<ApiObjectData> {
    return this.http.get<ApiObjectData>(this.apiUrl + controller + '/GetByIdentityNo/' + Identity);
  }

  ByLeaveTime(controller: string): Observable<ApiObjectData> {
    return this.http.get<ApiObjectData>(this.apiUrl + controller + '/ByLeaveTime');
  }
}
