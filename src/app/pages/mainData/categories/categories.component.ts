import { ItemPhotoService } from './../../../core/services/st/item-photo.service';
import { UploadService } from './../../../core/services/bs/upload.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ApiObjectData } from 'src/app/core/models/apiObjectData';
import { BaseComponent } from '../../base/base/base.component';
import { NgForm } from '@angular/forms';
import { DxTreeListComponent } from 'devextreme-angular';

import { Category } from 'src/app/core/models/st/category';
import dxTreeList from 'devextreme/ui/tree_list';
import DataGrid from 'devextreme/ui/data_grid';
import { ItemService } from 'src/app/core/services/st/item.service';
import { BaseService } from 'src/app/core/services/base/base.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/core/services/base/alert.service';
import { CategoryService } from 'src/app/core/services/st/category.service';
import { Item } from 'src/app/core/models/st/item';
import { ItemPhoto } from 'src/app/core/models/st/itemPhoto';
import { TranslateService } from '@ngx-translate/core';


declare var require;
const Swal = require('sweetalert2');

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent extends BaseComponent implements OnInit {
  @ViewChild('editForm', { static: true }) editForm: NgForm;
  @ViewChild('treeData', { static: false }) treeData: DxTreeListComponent;

  
  itemCategory = {} as Category;
  itemCategories: Category[];
  categoriesPhoto:any[]
  itemPhoto= {} as ItemPhoto;
  itemCategoryId = 0;
  id: number;
  focusedRowKey: number;
  parentId = false;
  height = 0;
  heightItem = 0;
  itemId = 0;
  dataCategotyTreeInstance: dxTreeList;
  disablebuttton: boolean = false;
  popCategory: boolean = false;
  popItem: boolean = false;
  editCate: boolean = true;
  editCateItem: boolean = true;
  catHasChild: boolean;
photoId:number=0;
forAddPic:boolean=false;
    downloads: any[];
    file: File = null;
  constructor(
    private itemService: ItemService,
    public baseService: BaseService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private itemCategoryService: CategoryService,
    private itemPhotoService:ItemPhotoService,
    private uploadService:UploadService,
    private translate :TranslateService
  ) { super();
    this.downloads = [
      { value: 1, name: 'new row', icon: 'plus' },
      {
        value: 2, name: 'edit row', icon: 'edit'},
      { value: 3, name: 'delete row', icon: 'trash' }

    ];
  }

  ngOnInit(): void {
    this.height = window.innerHeight - 220;
    this.heightItem = window.innerHeight - 220;
    this.loadData();
  }

  loadData() {
    this.route.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      data => {
        this.itemCategories = data.itemCategories.returnData;
      },
      error => {
        this.alertService.error(error)
      }
    );
  }

  //#region Category Data
  addCategory() {
    this.itemCategory = {} as Category;
    this.itemPhoto = {} as ItemPhoto;
    if (this.itemCategoryId != 0) {
      this.itemCategory.parentId = this.itemCategoryId;
    }
    this.popCategory = true;
    this.editCate = false;
  }

  editCategory(){
    if (this.itemCategoryId == 0)
      this.alertService.warning('قم باختيار فئة اولاَ');
    else {
      this.baseService.blockStart();
      this.itemCategoryService.get(this.itemCategoryId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (cat:ApiObjectData|any)=>{
          this.baseService.blockStop();
          this.itemCategory = cat.returnData as Category;
          if(this.itemCategory.parentId===null) this.id=0;
          this.popCategory = true;
        },error=>{
          this.baseService.blockStop();
          this.alertService.error(error)
        }
      )
      
      // this.editCate = true;
    }
  }

  deleteCategory(){
    if (this.itemCategoryId == 0)
      this.alertService.warning(this.translate.instant('selectElementFirst'));
    else {
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
          this.itemCategoryService.remove(this.itemCategoryId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
          (apidata:ApiObjectData|any)=>{
            if(apidata.message.type==='Error'){
              this.baseService.blockStop();
              if(apidata.message.log='This Cat related'){
                Swal.fire({
                  title: this.translate.instant('Category.relatedCat'),
                  icon: 'error',
                  cancelButtonText: this.translate.instant('back'),
                  confirmButtonText: this.translate.instant('cancel')
                });
              }
            }
            else{
              this.baseService.blockStop();
              this.itemCategories = this.itemCategories.filter(cat=> cat.id!=this.itemCategoryId);
              this.itemCategoryId=0;
              this.categoriesPhoto=[]
              Swal.fire({                
                icon: 'success',
                title: this.translate.instant('deletedDone'),
                showConfirmButton: false,
                timer: 1500
              })
            }
          }
          )
        }
      })
    }
  }

  showPopCategory() {
    this.popCategory = true;
    this.editCate = false;
  }


  hidePopCategory() {
    this.popCategory = false;
    // this.treeData.instance.refresh();
  }

  saveCategory() {
    // this.lookup.parentId = this.id;
    // if (this.viewCategory.parentId!==null){
    //   this.alertService.error('لقد تم اختبار نوع فرعى وليس اساسى برجاء اختيار نوع اساسى');
    // }
    // else{
    //this.itemCategory.parentId=0;
    if (this.id != 0) {
      this.itemCategory.parentId = this.id;
    }
 
    this.baseService.blockStart();
    this.itemCategoryService.save(this.itemCategory).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (apiObjectData: ApiObjectData|any) => {
        this.baseService.blockStop();
        this.itemCategory = apiObjectData.returnData as Category;
        this.alertService.message(apiObjectData.message);
        if (apiObjectData.message.type === 'Success') {
          // this.editForm.reset(this.itemCategory);
          this.itemCategoryService.gets().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
            (objectData: ApiObjectData) => {
              this.itemCategories = objectData.returnData as Category[];
            },
            error=>{
              this.baseService.blockStop();
              this.alertService.error(error);
            }
          )
          if(this.itemPhoto.photoUrl!==''||this.itemPhoto.photoUrl!==null){
            this.itemPhoto.categoryId = this.itemCategory.id;
            this.itemPhotoService.save(this.itemPhoto).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
              (data:ApiObjectData|any)=>{
                 this.itemPhotoService.getsByCategoryId(this.itemCategory.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
                  (photos:ApiObjectData)=>{
                    this.categoriesPhoto = photos.returnData as ItemPhoto[];
                  },error=>{
                    this.baseService.blockStop();
                    this.alertService.error(error);
                  }
                 )
              },error=>{
                this.baseService.blockStop();
                this.alertService.error(error);
              }
            )
          }
          this.hidePopCategory();
        }
      },
      error => {
        this.baseService.blockStop();
        this.alertService.error(error);
      }
    );
    // }

  }

  onFileChanged(event) {
    this.file = event.target.files[0];
    document.getElementById('categoryImg_input').textContent = this.file.name;
    this.uploadService
      .CategoryImage(this.file)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: any) => {
        this.itemPhoto.photoUrl = data.filePath;
        // this.itemPhoto.photoImage = data.file;
      });
  }

  onPhotClicked(Id){
    if(Id) this.photoId = Id
  }

  onFileUpdate(event){
    this.file = event.target.files[0];
    this.itemPhoto={}as ItemPhoto;
    document.getElementById('updateImg').textContent = this.file.name;
    this.baseService.blockStart();
    this.uploadService
      .CategoryImage(this.file)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: any) => {
        this.itemPhoto.photoUrl = data.filePath;
       if(this.forAddPic===false)  this.itemPhoto.id = this.photoId;
        this.itemPhoto.categoryId = this.itemCategoryId;
        this.itemPhotoService.save(this.itemPhoto).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
          (data:ApiObjectData|any)=>{
            if(data.message.type==='Success'){
              this.baseService.blockStop();
              this.itemPhotoService.getsByCategoryId(this.itemCategoryId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
                (data:ApiObjectData)=>{
                  this.categoriesPhoto = data.returnData as ItemPhoto[];
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
              this.categoriesPhoto = this.categoriesPhoto.filter(item=>item.id != id);
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

  clearSelection(){
    this.focusedRowKey=-1;
    this.itemCategoryId=0;
    this.treeData.instance.refresh();
    this.categoriesPhoto=[]
  }

  setMainPhoto(id){
    if(id){
      this.baseService.blockStart();
      this.itemPhotoService.setCatMain(id,this.itemCategoryId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (photoD:ApiObjectData|any)=>{
          this.baseService.blockStop();
          this.categoriesPhoto= photoD.returnData as ItemPhoto[];
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
      this.itemCategoryId = e;
      this.baseService.blockStart();
      this.itemCategoryService
        .get(this.itemCategoryId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (objectData: ApiObjectData) => {
            this.itemCategory = objectData.returnData as Category;
            this.catHasChild = this.itemCategory.hasChild;
            this.itemPhotoService.getsByCategoryId(this.itemCategoryId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
              (photo:ApiObjectData|any)=>{
                this.baseService.blockStop();
                this.categoriesPhoto = photo.returnData as ItemPhoto[];
                if(this.categoriesPhoto.length===0) this.editCate=false;
                else this.editCate=true;
              },
              error =>{
                this.baseService.blockStop();
                this.alertService.error(error);
              }
            )
            if (this.itemCategory.parentId === null) {
              this.id = 0;
            }
            else {
              this.id = this.itemCategory.parentId;
            }

          },
          (error) => {
            this.alertService.error(error);
            this.baseService.blockStop();
          }
        );
    }

  }

  addImage(){
    this.forAddPic=true;
    this.itemPhoto= {} as ItemPhoto;
    this.itemPhoto.categoryId= this.itemCategoryId;
  }

  //#endregion
 
}

