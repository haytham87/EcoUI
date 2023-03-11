import { SignalRService } from './core/services/hubSignal/signalR.service';
import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import config from 'devextreme/core/config';
import { locale, loadMessages } from "devextreme/localization";
import arMessages from "../assets/data/devextreme/ar.json";
import { Router } from '@angular/router';
import { ConfigService } from './core/services/base/config.service';
import { AuthService } from './core/services/sc/auth.service';
import { BaseService } from './core/services/base/base.service';
import { User } from './core/models/sc/user';

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
    private signalrService:SignalRService
  ) {
    config({ rtlEnabled: true, forceIsoDateParsing: true });
  }


  ngOnInit() {
    loadMessages(arMessages);
    locale('ar');
    this.baseService.dir = 'rtl';
    this.baseService.lang = 'ar';
    this.baseService.isRTL = true;
    localStorage.setItem('dir', 'rtl');
    localStorage.setItem('lang', 'ar');
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

