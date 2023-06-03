import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/core/services/base/alert.service';
import { AuthService } from 'src/app/core/services/sc/auth.service';
import { BaseService } from 'src/app/core/services/base/base.service';
import { MenuService } from 'src/app/core/services/sc/menu.service';
import { BaseComponent } from 'src/app/pages/base/base/base.component';
import { User } from 'src/app/core/models/sc/user';
import { FormService } from 'src/app/core/services/sc/form.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  extends BaseComponent implements OnInit {
  user={} as User;
  loginForm: FormGroup;
  submitted = false;
  error = '';
  hide = true;
  screens: any;
  year: number = new Date().getFullYear();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private menuService: MenuService,
    private formService: FormService,
    public baseService: BaseService,
    private alertService: AlertService,
    private translate: TranslateService,
  ) { super() }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.minLength(3)]
      ],
      password: ['', Validators.required]
    });
  }

  // onSubmit() {
  //   // this.submitted = true;
  //   // this.router.navigateByUrl('/page/home');
  // }

  onSubmit(){
    this.submitted = true;
    this.error = '';
    if (this.loginForm.invalid) {
      this.error = 'اسم المستخدم أو كلمة المرور غير صحيحه';
      return;
    } else {
      this.baseService.blockStart();
      this.authService.login(this.user).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (data: any) => {
          const user = data;
          if(user.user.isDisabled==true) {
            this.baseService.blockStop();
            this.alertService.error('عفوا هذا المستخدم تم ايقافه');
          }
          else if (user) {
            this.baseService.blockStop();
            localStorage.setItem('token', user.token);
            localStorage.setItem('user', JSON.stringify(user.user));
            this.authService.currentUserSubject = new BehaviorSubject<User>(
              JSON.parse(localStorage.getItem('user')!)
            );
            this.authService.currentUser = this.authService.currentUserSubject.asObservable();
            this.authService.decodedToken = this.authService.jwtHelper.decodeToken(user.token);
            this.authService.user = user.user;
            this.alertService.success(this.translate.instant('toastrMsg.youAreLoggedInSuccessfully'));
            this.getUerMenu();
          }
        },
        error => {
          this.baseService.blockStop();
          this.alertService.error('عفوا يوجد خطأ فى اسم المستخدم أو كلمة المرور');
          console.log(error);
        },
        () => {
          // this.router.navigateByUrl('/page/home');
        }
      );
    }
  }

  getUerMenu() {
    this.menuService.getUserMenus().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      data => {
        this.baseService.blockStop();
        localStorage.setItem('routeMenuItems', JSON.stringify(data.returnData));
      },
      error => {
        this.baseService.blockStop();
        console.log(error);
      },
      () => {
        this.getUserScreens();
      }
    );
  }

  getUserScreens() {
    this.formService.getUserForms().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      data => {
        this.baseService.blockStop();
        localStorage.setItem('userScreens', JSON.stringify(data.returnData));
      },
      error => {
        this.baseService.blockStop();
    
      },
      () => {
        this.router.navigateByUrl('/page/home');
      }
    );
  }

}
