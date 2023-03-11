import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  
  public languages: string[] = ['ar','en'];

  constructor(public translate: TranslateService, private cookieService: CookieService) {

  }

  public setLanguage(lang: any) {
    this.translate.use(lang);
  }

}
