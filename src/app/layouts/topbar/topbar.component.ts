import { BaseService } from './../../core/services/base/base.service';
import { Component, OnInit, Inject, EventEmitter, Output, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { LanguageService } from '../../core/services/language.service';
import { environment } from '../../../environments/environment';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/sc/auth.service';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
/**
 * Topbar component
 */
export class TopbarComponent implements OnInit {

  element: any;
  flagvalue: any;
  cookieValue: any;
  countryName: any;
  valueset: any;
  dir:boolean=true;
  serachOpen:boolean = false;

  constructor(@Inject(DOCUMENT) private document: any,
    private router: Router,
    private authService: AuthService,
    public languageService: LanguageService,
    public _cookiesService: CookieService,
    private authFackservice: AuthfakeauthenticationService,
    private renderer: Renderer2,
    public translate: TranslateService,
    public baseService:BaseService
  ) { }

  /***
   * Language Listing
   */
  listLang = [
    { text: 'عربي', flag: 'assets/images/flags/egypt.jpg', lang: 'ar' },
    { text: 'English', flag: 'assets/images/flags/us.jpg', lang: 'en' }

  ];

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();

  ngOnInit(): void {

    this.element = document.documentElement;
    // Cookies wise Language set
    this.cookieValue = this._cookiesService.get('lang');
    const val = this.listLang.filter(x => x.lang === this.cookieValue);
    this.countryName = val.map(element => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) { this.valueset = 'assets/images/flags/egypt.jpg'; }
    } else {
      this.flagvalue = val.map(element => element.flag);
    }
  }

  /***
   * Language Value Set
   */
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
  }

  /**
   * Fullscreen method
   */
  fullscreen() {
    document.body.classList.toggle('fullscreen-enable');
    if (
      !document.fullscreenElement && !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
   * Logout the user
   */
  logout() {
    this.router.navigateByUrl('/auth/login');
    localStorage.clear();
  }

  
  changeLangEN() {
    document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
    this.renderer.addClass(this.document.body,'ltr');
    this.baseService.isRTL= false;
    this.translate.use('en');
    this.dir = false;
  }

  changeLangAR() {
    document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
    this.renderer.addClass(this.document.body,'rtl');
    this.baseService.isRTL= true;
    this.translate.use('ar');
    this.dir = true;
  }

  openSearch() {
    const elm = document.querySelector<HTMLElement>('.searchInput')!;
    elm.style.width = '100%';
    this.serachOpen = true;
  }

  closeSearch() {
    const elm = document.querySelector<HTMLElement>('.searchInput')!;
    elm.style.width = '10px';
    this.serachOpen = false;
  }



}
