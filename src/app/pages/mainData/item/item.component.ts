import { ItemPhotoService } from './../../../core/services/st/item-photo.service';
import { UploadService } from './../../../core/services/bs/upload.service';
import { BrandService } from './../../../core/services/st/brand.service';
import { AlertService } from './../../../core/services/base/alert.service';
import { ItemService } from './../../../core/services/st/item.service';
import { BaseService } from './../../../core/services/base/base.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../base/base/base.component';
import { Item } from 'src/app/core/models/st/item';
import { Category } from 'src/app/core/models/st/category';
import { NgForm } from '@angular/forms';
import { Brand } from 'src/app/core/models/st/brand';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ApiObjectData } from 'src/app/core/models/apiObjectData';
import { TranslateService } from '@ngx-translate/core';
import { ItemPhoto } from 'src/app/core/models/st/itemPhoto';
import { DxSelectBoxComponent } from 'devextreme-angular';

declare var require;
const Swal = require('sweetalert2');

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent extends BaseComponent implements OnInit {
  @ViewChild('editForm', { static: true }) editForm: NgForm;
  @ViewChild("headerActions") headerActions: ElementRef;
  @ViewChild("selectParent") selectParent: DxSelectBoxComponent;
  items:Item[];
  item= {} as Item;
  itemCheck:boolean;
  categories: Category[];
  brands:Brand[];
  sample:boolean=false;
  itemAdded:boolean=false;
  userScreens:any;
  pageType:string;
  itemId:number=0;
  itemsPhotos:ItemPhoto[];
  itemPhoto={} as ItemPhoto;

  photoId:number=0;
forAddPic:boolean=false;
    downloads: any[];
    file: File = null;
    photosLenght:number=0;
    stoped:boolean=false;
  constructor(
    public baseService:BaseService,
    private itemService:ItemService,
    private alertService:AlertService,
    private route:ActivatedRoute,
    private brandService:BrandService,
    private translate:TranslateService,
    private uploadService:UploadService,
    private itemPhotoService:ItemPhotoService,
    private router:Router
  ) { super() }

  ngOnInit(){
    this.loadData();
  }

  ngAfterViewInit() {
    var userScreen = this.userScreens.filter((o) => o.nameEn === "item")[0];
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
        this.categories = data.categories.returnData;
        this.items = data.items.returnData;
        this.route.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
        if (params.type === 'add') {
          this.pageType='add'
          this.item.isSample=false;
          this.itemAdded=false;
          this.itemId =0;
        }
        else{
           this.pageType='edit'
           this.item = data.item.returnData;
           console.log(this.item)
           this.itemAdded=true;
           this.itemId=this.item.id;
           this.stoped=this.item.isDisabled;
           this.itemPhotoService.getsByItemId(this.itemId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
            (photos:ApiObjectData)=>{
              this.itemsPhotos = photos.returnData as ItemPhoto[]
              if(this.itemsPhotos.length!==0) this.photosLenght=1
            }
           )
        }
      })
    }
    )
  }

  onCategorySelectedChanged(e){
    if(e){
      this.brandService.getByCategory(e.selectedItem.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (data:ApiObjectData)=>{
          this.brands = data.returnData as Brand[];
        }
      )
    }
  }

  
  checkCode(e){
   if(e.value){
    this.itemService.checkCode(e.value,this.itemId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (data:ApiObjectData)=>{
        this.itemCheck= Boolean( data.returnData) ;
        if(this.itemCheck ===true)
          this.alertService.error(this.translate.instant('thisCodeExist'))
      }
    )
   }
  }

  onCheckedChanged(e){
   if(e){
    this.item.isSample=e.value;
    if(e.value===true) this.sample=true;
    else this.sample=false;
   }
  }

  saveItem(){
    this.baseService.blockStop();
    this.itemService.save(this.item).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (itemData:ApiObjectData|any)=>{
        this.baseService.blockStop();
        if(itemData.message.type==='Success'){
          this.item = itemData.returnData as Item;
          this.alertService.success(this.translate.instant('SavedSuccess'));
          this.itemAdded=true;
          this.itemId=this.item.id;
          if(this.itemPhoto.photoUrl!==undefined&&this.itemPhoto.photoUrl!==''&&this.itemPhoto.itemId!==0){
            this.itemPhotoService.save(this.itemPhoto).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
              (itemPho:ApiObjectData|any)=>{
                this.itemsPhotos = [];
                this.itemsPhotos.push(itemPho.returnData as ItemPhoto)
              }
            ),error=>{
              this.baseService.blockStop();
              this.alertService.error(error);
            }
          }
        } 
        else{
          this.alertService.error(itemData.message.log)
        }
      },error=>{
        this.baseService.blockStop();
        this.alertService.error(error)
      }
    )
  }

  onParentChanged(e){
    if(e){
      if(e.selectedItem.id===this.item.id){
        this.alertService.error(this.translate.instant('item.parentSameId'));
       this.editForm.reset();
      }
      else{
        if(e.selectedItem.isDisabled===true)
        {
          this.alertService.error(this.translate.instant('item.thisItemStoped'))
          this.editForm.reset();
        }
      }
    }
  }

  stopItem(){
    if(this.itemId!==0){
      Swal.fire({
        title: this.translate.instant('item.confirmStop'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#00a886',
        cancelButtonColor: '#d33',
        cancelButtonText: this.translate.instant('back'),
        confirmButtonText: this.translate.instant('item.stopUseItem')
      }).then((result) => {
        if (result.isConfirmed) {
          this.baseService.blockStart();
          this.itemService.stopUseItem(this.itemId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
          (apidata:ApiObjectData|any)=>{
            
              this.baseService.blockStop();
              Swal.fire({
                icon: 'success',
                title: this.translate.instant('item.stopedDone'),
                showConfirmButton: false,
                timer: 1500
              })
              this.router.navigate(['/page/item']);
          },error=>{
            this.baseService.blockStop();
            this.alertService.error(error);
          }
          )
        }
      })
    }
  }

  unStopItem(){
    if(this.itemId!==0){
      Swal.fire({
        title: this.translate.instant('item.confirmUnStop'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#00a886',
        cancelButtonColor: '#d33',
        cancelButtonText: this.translate.instant('back'),
        confirmButtonText: this.translate.instant('item.UnstopUseItem')
      }).then((result) => {
        if (result.isConfirmed) {
          this.baseService.blockStart();
          this.itemService.unStopUseItem(this.itemId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
          (apidata:ApiObjectData|any)=>{
            
              this.baseService.blockStop();
              Swal.fire({
                icon: 'success',
                title: this.translate.instant('item.unStopDone'),
                showConfirmButton: false,
                timer: 1500
              })
              this.router.navigate(['/page/item']);
          },error=>{
            this.baseService.blockStop();
            this.alertService.error(error);
          }
          )
        }
      })
    }
  }
  //#region  for PHotos
  onFileChanged(event) {
    this.file = event.target.files[0];
    document.getElementById('categoryImg_input').textContent = this.file.name;
    this.uploadService
      .ItemImage(this.file)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: any) => {
        this.itemPhoto.photoUrl = data.filePath;
        this.itemPhoto.itemId = this.itemId;
        this.itemPhoto.isMain = true;
        this.itemPhotoService.save(this.itemPhoto).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
          (data:ApiObjectData|any)=>{
            this.itemsPhotos= new Array;
            this.itemsPhotos.push(data.returnData as ItemPhoto)
            this.itemPhoto = {}as ItemPhoto;
            this.photosLenght=1;
          }
        )
        // this.itemPhoto.photoImage = data.file;
      });
  }

  onPhotClicked(Id){
    if(Id) this.photoId = Id
    else{
      this.itemPhoto={} as ItemPhoto
    }
  }

  onFileUpdate(event){
    this.file = event.target.files[0];
    this.itemPhoto={}as ItemPhoto;
    document.getElementById('updateImg').textContent = this.file.name;
    this.baseService.blockStart();
    this.uploadService
      .ItemImage(this.file)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: any) => {
        this.itemPhoto.photoUrl = data.filePath;
       if(this.forAddPic===false)  this.itemPhoto.id = this.photoId;
        this.itemPhoto.itemId = this.itemId;
        this.itemPhotoService.save(this.itemPhoto).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
          (data:ApiObjectData|any)=>{
            if(data.message.type==='Success'){
              this.baseService.blockStop();
              this.itemPhotoService.getsByItemId(this.itemId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
                (data:ApiObjectData)=>{
                  this.itemsPhotos = data.returnData as ItemPhoto[];
                },error=>{
                  this.baseService.blockStop();
                  this.alertService.error(error);
                }
              )
            }  
            else{
              this.baseService.blockStop();
              this.alertService.error(data.message.log);
            }        
          },error=>{
            this.baseService.blockStop();
            this.alertService.error(error);
          }
        )
        // this.itemPhoto.photoImage = data.file;
      });
  }

  deletePhoto(id:number){
    if(id){
      Swal.fire({
        title: this.translate.instant('confirm delete'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#00a886',
        cancelButtonColor: '#d33',
        cancelButtonText: this.translate.instant('back'),
        confirmButtonText: this.translate.instant('delete')
      }).then((result) => {
        if (result.isConfirmed) {
          this.baseService.blockStart();
          this.itemPhotoService.delete(id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
          (apidata:ApiObjectData|any)=>{
            if(apidata.message.type==='Error'){
              this.baseService.blockStop();
              if(apidata.message.log==='This Photo Are Main'){
                Swal.fire({
                  title: this.translate.instant('ItemPhoto.mainPic'),
                  icon: 'error',
                  cancelButtonText: this.translate.instant('back'),
                  confirmButtonText: this.translate.instant('cancel')
                });
              }
              else{
                this.baseService.blockStop();
                this.alertService.error(apidata.message)
              }
            }
            else{
              this.itemsPhotos = this.itemsPhotos.filter(item=>item.id != id);
              this.baseService.blockStop();
              Swal.fire({
                icon: 'success',
                title: this.translate.instant('deletedDone'),
                showConfirmButton: false,
                timer: 1500
              })
            }
          },error=>{
            this.baseService.blockStop();
            this.alertService.error(error);
          }
          )
        }
      })
    }
  }


  setMainPhoto(id){
    if(id){
      this.baseService.blockStart();
      this.itemPhotoService.setItemMain(id,this.itemId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (photoD:ApiObjectData|any)=>{
          this.baseService.blockStop();
          this.itemsPhotos= photoD.returnData as ItemPhoto[];
        },
        error=>{
          this.baseService.blockStop();
          this.alertService.error(error);
        }
      )
    }
  }

  onFocusedCatRowChanged(e) {
    if (e) {
      this.itemId = e;
      this.baseService.blockStart();
      this.itemService
        .get(this.itemId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (objectData: ApiObjectData) => {
            this.item = objectData.returnData as Item;
            this.itemPhotoService.getsByItemId(this.itemId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
              (photo:ApiObjectData|any)=>{
                this.baseService.blockStop();
                this.itemsPhotos = photo.returnData as ItemPhoto[];
              },
              error =>{
                this.baseService.blockStop();
                this.alertService.error(error);
              }
            )
          },
          (error) => {
            this.alertService.error(error);
            this.baseService.blockStop();
          }
        );
    }

  }

  addImage(){
    this.itemPhoto= {} as ItemPhoto;
    this.itemPhoto.itemId= this.itemId;
  }

  //#endregion
}
