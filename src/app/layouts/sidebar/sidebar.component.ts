import { BaseService } from '../../core/services/base/base.service';
import { MenuService } from '../../core/services/sc/menu.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import MetisMenu from 'metismenujs';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { MENU } from './menu';
import { MenuItem } from './menu.model';
import { NewMenuItem } from './newmenu.model';
import { NewMenu } from './menu';

import { SIDEBAR_COLOR } from '../layouts.model';
import { takeUntil } from 'rxjs/operators';
import { Menu } from 'src/app/core/models/sc/menu';
import { AuthService } from 'src/app/core/services/sc/auth.service';
import { User } from 'src/app/core/models/sc/user';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})

/**
 * Sidebar Component
 */
export class SidebarComponent implements OnInit {
  @ViewChild('sideMenu') sideMenu!: ElementRef;
  public menu: any[];
  menuItems: MenuItem[] = [];
  newmenu: any;
  newMenuItems: NewMenuItem[] = [];
  // apiMenu: any[];


  api: any;
  apiMenu: any[]= [];
  isSidebar: any;

  constructor(
    private router: Router,
    public baseService: BaseService,
    public translate: TranslateService,
    private menuService: MenuService,
    public elementRef: ElementRef,
    public authService: AuthService
  ) {
    translate.setDefaultLang('ar');
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this._activateMenuDropdown();
      }
    });
    this.authService.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user')!)
    );
    this.authService.user = JSON.parse(localStorage.getItem('user')!);
  }

  ngOnInit(): void {
    // this.menuItems = MENU;
    // this.newMenuItems = NewMenu;
    if (this.authService.currentUserValue) {
      //  this.sidebarItems = ROUTES.filter((sidebarItem) => sidebarItem);
      this.apiMenu = JSON.parse(localStorage.getItem('routeMenuItems')!)
    }
    this.isSidebar = SIDEBAR_COLOR;
    if (this.isSidebar === 'dark') {
      document.body.setAttribute('data-sidebar', 'dark');
    }
 
  }

  /**
   * Initialize
   */
  // initialize(): void {
  //   // this.menuItems = MENU;
  //   this.newMenuItems = NewMenu;
  // }

  /***
   * Activate droup down set
   */
  ngAfterViewInit() {
    // this.menu = new MetisMenu('#side-menu');
    this.api = new MetisMenu('#side-menu');
    this._activateMenuDropdown();
  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   * @param cat
   * @param menu
   */

  hasItems(item: any) {
    return item.submenu !== undefined ? item.submenu.length > 0 : false;
  }

  // hasItemstype(item: NewMenuItem) {
  //   return item.type === 'group'
  // }

  // hasItemTypeSub(item: NewMenuItem) {
  //   return item.type === 'collapse'
  // }

  // hasItemsub(item: NewMenuItem) {
  //   return item.type === 'item'
  // }

  /**
   * remove active and mm-active class
   */
  _removeAllClass(className: any) {
    const els = document.getElementsByClassName(className);
    while (els[0]) {
      els[0].classList.remove(className);
    }
  }

  /**
   * Activate the parent dropdown
   */
  _activateMenuDropdown() {
    this._removeAllClass('mm-active');
    this._removeAllClass('mm-show');
    const links: any = document.getElementsByClassName('side-nav-link-ref');
    let menuItemEl = null;
    // tslint:disable-next-line: prefer-for-of
    const paths = [];
    for (let i = 0; i < links.length; i++) {
      paths.push(links[i]['pathname']);
    }
    var itemIndex = paths.indexOf(window.location.pathname);
    if (itemIndex === -1) {
      const strIndex = window.location.pathname.lastIndexOf('/');
      const item = window.location.pathname.substr(0, strIndex).toString();
      menuItemEl = links[paths.indexOf(item)];
    } else {
      menuItemEl = links[itemIndex];
    }
    if (menuItemEl) {
      menuItemEl.classList.add('active');
      const parentEl = menuItemEl.parentElement;
      if (parentEl) {
        parentEl.classList.add('mm-active');
        const parent2El = parentEl.parentElement.closest('ul');
        if (parent2El && parent2El.id !== 'side-menu') {
          parent2El.classList.add('mm-show');
          const parent3El = parent2El.parentElement;
          if (parent3El && parent3El.id !== 'side-menu') {
            parent3El.classList.add('mm-active');
            const childAnchor = parent3El.querySelector('.has-arrow');
            const childDropdown = parent3El.querySelector('.has-dropdown');
            if (childAnchor) {
              childAnchor.classList.add('mm-active');
            }
            if (childDropdown) {
              childDropdown.classList.add('mm-active');
            }
            const parent4El = parent3El.parentElement;
            if (parent4El && parent4El.id !== 'side-menu') {
              parent4El.classList.add('mm-show');
              const parent5El = parent4El.parentElement;
              if (parent5El && parent5El.id !== 'side-menu') {
                parent5El.classList.add('mm-active');
                const childanchor = parent5El.querySelector('.is-parent');
                if (childanchor && parent5El.id !== 'side-menu') {
                  childanchor.classList.add('mm-active');
                }
              }
            }
          }
        }
      }
    }
  }
}
