import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../base/base/base.component';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/core/models/sc/user';
import { UserType } from 'src/app/core/models/sc/userType';
import { BaseService } from 'src/app/core/services/base/base.service';
import { UserService } from 'src/app/core/services/sc/user.service';
import { AlertService } from 'src/app/core/services/base/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UploadService } from 'src/app/core/services/bs/upload.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends BaseComponent implements  OnInit {
  @ViewChild('editForm', { static: true }) editForm: NgForm;
  @ViewChild("headerActions") headerActions: ElementRef;

  user= {} as User;
  itemCheck:boolean;
  userTypes: UserType[];
  sample:boolean=false;
  itemAdded:boolean=false;
  userScreens:any;
  pageType:string;
  itemId:number=0;

  photoId:number=0;
forAddPic:boolean=false;
    downloads: any[];
    file: File = null;
    photosLenght:number=0;
    stoped:boolean=false;
  constructor(
    public baseService:BaseService,
    private userService:UserService,
    private alertService:AlertService,
    private route:ActivatedRoute,
    private translate:TranslateService,
    private router:Router
  ) { super() }

  ngOnInit(){
    this.loadData();
  }

  ngAfterViewInit() {
    var userScreen = this.userScreens.filter((o) => o.nameEn === "users")[0];
    if (userScreen) {
      for (let i = 0; i < this.headerActions.nativeElement.children.length; i++) {
        let flag = false;
        userScreen.action.forEach(userAction => {
          if (this.headerActions.nativeElement.children[i].accessKey === userAction.nameEn) {
            flag = true;
            return;
          }
        });
        if (!flag) {
          this.headerActions.nativeElement.removeChild(this.headerActions.nativeElement.children[i]);
          i--;
        }
      }
    }
    else {
      for (let i = 0; i < this.headerActions.nativeElement.children.length; i++) {
        this.headerActions.nativeElement.removeChild(this.headerActions.nativeElement.children[i]);
        i--;
      }
    }
  }

  loadData(){
    this.userScreens = localStorage.getItem('userScreens');
    this.route.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      data=>{
        this.userTypes = data.userTypes.returnData;
        this.route.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
        if (params.type === 'add') {
          this.pageType='add';
          this.itemAdded=false;
          this.itemId =0;
        }
        else{
           this.pageType='edit'
           this.user = data.user.returnData;
           this.itemAdded=true;
           this.itemId=this.user.id;
           this.stoped=this.user.isDisabled;
        }
      })
    }
    )
  }
}
