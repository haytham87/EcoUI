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
  spesificPhotos:ItemPhoto[];
  itemCategoryId = 0;
  id: number;
  selectedItem: any;
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

    downloads: any[];
    file: File = null;
  constructor(
    private itemService: ItemService,
    public baseService: BaseService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private itemCategoryService: CategoryService,
    private itemPhotoService:ItemPhotoService,
    private uploadService:UploadService
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
        console.log(data);
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
    this.editCate = true;
  }

  editCategory(){
    this.popCategory = true;
  }

  deleteCategory(){
    
  }

  showPopCategory() {
    this.popCategory = true;
    this.editCate = false;
  }


  hidePopCategory() {
    this.popCategory = false;
    this.treeData.instance.refresh();
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
            }
          )
          if(this.itemPhoto.photoUrl!==''||this.itemPhoto.photoUrl!==null){
            this.itemPhoto.categoryId = this.itemCategory.id;
            this.itemPhotoService.save(this.itemPhoto).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
              (data:ApiObjectData|any)=>{
                // this.categoriesPhoto = data.returnData ;
              }
            )
          }
          this.hidePopCategory();
        }
      },
      error => {
        this.baseService.blockStop();
        console.log(error);
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
  clearSelection(){
    this.focusedRowKey=-1;
    this.itemCategoryId=0;
    this.treeData.instance.refresh();
    this.categoriesPhoto=[]
  }

  onFocusedCatRowChanged(e) {
    if (e) {
      this.itemCategoryId = e;
      this.itemCategoryService
        .get(this.itemCategoryId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (objectData: ApiObjectData) => {
            this.itemCategory = objectData.returnData as Category;
            this.catHasChild = this.itemCategory.hasChild;
            this.categoriesPhoto = this.itemCategory.itemPhotos
            console.log(this.categoriesPhoto)
            if (this.itemCategory.parentId === null) {
              this.id = 0;
            }
            else {
              this.id = this.itemCategory.parentId;
            }

          },
          (error) => {
            console.log(error);
          }
        );
    }

  }

  onCategoryRowRemoving(e) {
    this.removeCategoryItem(e);
  }

  deleteCategoryRow() {
    this.treeData.instance.deleteRow(
      this.treeData.instance.getRowIndexByKey(this.itemCategoryId)
    );
  }

  removeCategoryItem(ev) {
    const promise = new Promise<void>((resolve, reject) => {
      this.baseService.blockStart();
      this.itemCategoryService.remove(ev.data.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (apiObjectData: ApiObjectData|any) => {
          this.baseService.blockStop();
          this.alertService.message(apiObjectData.message);
          if (apiObjectData.message.type === 'Success') {
            this.itemCategoryId = 0;
            resolve();
          } else {
            reject();
          }
        },
        error => {
          this.baseService.blockStop();
          console.log(error);
          reject();
        }
      );
    });
    ev.cancel = promise;

  }

  //#endregion
 
}

