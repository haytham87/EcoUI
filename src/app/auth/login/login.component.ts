import { VerificationService } from './../../core/services/verification.service';
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
import { UserService } from 'src/app/core/services/sc/user.service';
import { ApiObjectData } from 'src/app/core/models/apiObjectData';


declare var require;
const Swal = require('sweetalert2');

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
  forgetPsw:boolean=false;
  year: number = new Date().getFullYear();

  verifiCode:any;
  typeCode:boolean=false;


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
    private userService: UserService,
    private verificationService:VerificationService
  ) { super() }

  ngOnInit(): void {
    if(this.forgetPsw==false){
      this.loginForm = this.formBuilder.group({
        email: [
          '',
          [Validators.required, Validators.minLength(3)]
        ],
        password: ['', Validators.required]
      });
    }
    
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

  showForget(){
    this.forgetPsw=true;
  }

  showLogin(){
    this.forgetPsw=false;
  }

  checkUserNameExsit(){
    if(this.user.email!==''||this.user.email!==null){
      this.baseService.blockStart();
      this.userService.getUserByUserName(this.user.email).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (apiData:ApiObjectData)=>{
          this.baseService.blockStop();
          if(apiData.message.type==='Success'){
            this.verificationService.get(this.user.email).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
              (verif:ApiObjectData)=>{
                if(verif.message.type==='Success'){
                this.verifiCode  = verif.returnData ;
                this.alertService.success('تم إرسال الكود الخاص بك على البريد الالكتروني')
                this.typeCode=true;
              }
                else
                  this.alertService.error(verif.message.content);
              },error=>{
                this.alertService.error(error);
                this.baseService.blockStop();
              }
            )
          }
          else if(apiData.message.type==='Error'){
            if(apiData.message.content==='No User Found')
              this.alertService.error(this.translate.instant('noUserFound'))
          }
        },error=>{
          this.baseService.blockStop();
          this.alertService.error(error);
        }
      )
    }
  }

  checkCode(){
    if(this.user.receveCode==this.verifiCode){
      this.alertService.success('تم تغيير كلمة المرور وارسالها على البريد الالكتروني')
    }
    else  
      this.alertService.warning('يرجي التاكد من كود التحقق المرسل هلى البريد الالكتروني')
  }
}
