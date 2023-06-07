import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/core/models/sc/user';
import { AlertService } from 'src/app/core/services/base/alert.service';
import { BaseService } from 'src/app/core/services/base/base.service';
import { BaseComponent } from 'src/app/pages/base/base/base.component';

@Component({
  selector: 'forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent extends BaseComponent implements OnInit {
  user={} as User;
  submitted = false;
  error = '';
  hide = true;
  screens: any;
  year: number = new Date().getFullYear();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public baseService: BaseService,
    private alertService: AlertService,
    private translate: TranslateService,
  ) { super() }

  ngOnInit(): void {
    
  }

  checkUserNameExsit(){
    if(this.user.username!==''||this.user.username!==null){

    }
  }
}
