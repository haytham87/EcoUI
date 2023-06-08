import { SignalRService } from './core/services/hubSignal/signalR.service';
import { Component, OnInit, AfterViewChecked, Inject ,Renderer2} from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { locale, loadMessages } from 'devextreme/localization';
import config from 'devextreme/core/config';
import messages from '../assets/data/devextreme/locale.json';
import { Router } from '@angular/router';
import { ConfigService } from './core/services/base/config.service';
import { AuthService } from './core/services/sc/auth.service';
import { BaseService } from './core/services/base/base.service';
import { User } from './core/models/sc/user';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Top Code';
  jwtHelper = new JwtHelperService();
  isFullscreen = false;
  constructor(private configService: ConfigService,
    private authService: AuthService,
    private baseService: BaseService,
    private router: Router,
    private signalrService:SignalRService,
    private translate: TranslateService,
    @Inject(DOCUMENT) private document: any,
    private renderer: Renderer2
  ) {
    config({ rtlEnabled: true, forceIsoDateParsing: true });
  }


  ngOnInit() {
    loadMessages(messages);
    if (localStorage.getItem('dir')) {
      this.baseService.dir = localStorage.getItem('dir');
      this.baseService.lang = localStorage.getItem('lang');
      this.baseService.isRTL = localStorage.getItem('dir') === 'rtl' ? true : false;
    }
    else {
      this.baseService.dir = 'rtl';
      this.baseService.lang = 'ar';
      this.baseService.isRTL = true;
      localStorage.setItem('dir', this.baseService.dir);
      localStorage.setItem('lang', this.baseService.lang);
    }
    document.getElementsByTagName('html')[0].setAttribute('dir', this.baseService.dir);
    this.renderer.addClass(this.document.body,this.baseService.dir);
    config({ rtlEnabled: this.baseService.isRTL, forceIsoDateParsing: true });
    locale(this.baseService.lang);
    this.translate.use(this.baseService.lang);
    const token = localStorage.getItem('token');
    const user: User|any = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (user) {
      this.authService.currentUser = user;
    }

  }
}

