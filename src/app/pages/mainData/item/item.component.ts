import { BaseService } from 'src/app/core/services/base/base.service';
import { Item } from './../../../core/models/st/item';

import { DxTreeListComponent } from 'devextreme-angular';
import dxTreeList from 'devextreme/ui/tree_list';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


import { takeUntil } from 'rxjs/operators';
import DataGrid from 'devextreme/ui/data_grid';
import { BaseComponent } from '../../base/base/base.component';
import { Category } from 'src/app/core/models/st/category';
import { ItemService } from 'src/app/core/services/st/item.service';
import { AlertService } from 'src/app/core/services/base/alert.service';
import { CategoryService } from 'src/app/core/services/st/category.service';
import { ApiObjectData } from 'src/app/core/models/apiObjectData';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent extends BaseComponent implements OnInit {
  @ViewChild('editcategoryForm', { static: true }) editcategoryForm: NgForm;
  @ViewChild('edititemForm', { static: true }) edititemForm: NgForm;
  @ViewChild('treeData', { static: false }) treeData: DxTreeListComponent;
  item = {} as Item;

  category = {} as Category;
  itemCategories: Category[];
  itemCategoryId = 0;
  id: number;
  selectedItem: any;
  focusedRowKey: number;
  selectedRowIndex = 0;
  parentId = false;
  indexLook = 1;
  indexitemLook = 1;
  height = 0;
  heightItem = 0;
  itemId = 0;
  dataCategotyTreeInstance: dxTreeList;
  dataItemGridInstance: DataGrid;
  items: Item[];
  disablebuttton: boolean = false;
  popCategory: boolean = false;
  popItem: boolean = false;
  editCate: boolean = true;
  editCateItem: boolean = true;
  catHasChild: boolean;
  viewPopupImage = false; noPersonalImage =
    // tslint:disable-next-line: max-line-length
    'data:image/jpeg;base64,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';
    downloads: any[];

  constructor(
    private itemService: ItemService,
    public baseService: BaseService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private CategoryService: CategoryService
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
        console.log(error);
      }
    );
  }

  //#region Category Data
  addCategory() {
    this.category = {} as Category;
    if (this.itemCategoryId != 0) {
      this.category.parentId = this.itemCategoryId;
    }
    this.popCategory = true;
    this.editCate = true;
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
    //this.Category.parentId=0;
    if (this.id != 0) {
      this.category.parentId = this.id;
    }
    this.baseService.blockStart();
    this.CategoryService.save(this.category).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (apiObjectData: any) => {
        this.baseService.blockStop();
        this.category = apiObjectData.returnData as Category;
        this.alertService.message(apiObjectData.message);
        if (apiObjectData.message.type === 'Success') {
          this.editcategoryForm.reset(this.category);
          this.CategoryService.gets().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
            (objectData: ApiObjectData) => {
              this.itemCategories = objectData.returnData as Category[];
            }
          )
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

  onFocusedCatRowChanged(e) {
    if (e) {
      this.itemCategoryId = e;
      this.CategoryService
        .get(this.itemCategoryId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (objectData: ApiObjectData) => {
            this.category = objectData.returnData as Category;
            // this.catHasChild = this.category.hasChild;
            if (this.category.parentId === null) {
              this.id = 0;
            }
            else {
              this.id = this.category.parentId;
            }

          },
          (error) => {
            console.log(error);
          }
        );
      this.itemService.getsByCategoryId(this.itemCategoryId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (objectData: ApiObjectData) => {
            this.items = objectData.returnData as Item[];
          },
          (error) => {
            console.log(error);
          }
        )
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
      this.CategoryService.remove(ev.data.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (apiObjectData: any) => {
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

  //#region item function

  showPopItem() {
    this.popItem = true;
    this.editCateItem = false;
  }

  addNewItem() {
    this.item = {} as Item;
    // this.item.quantity = 1;
    this.popItem = true;
    if (this.itemCategoryId !== 0) {
      this.item.categoryId = this.itemCategoryId;
      this.indexitemLook = this.itemCategoryId;
    }
  }

  hideItemPopup() {
    this.popItem = false;
  }

  add() {
    this.edititemForm.reset();
    this.item = {} as Item;
  }

  saveItem() {
    this.baseService.blockStart();
    this.itemService.save(this.item).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (apiObjectData: any) => {
        this.baseService.blockStop();
        this.item = apiObjectData.returnData as Item;
        this.alertService.message(apiObjectData.message);
        if (apiObjectData.message.type === 'Success') {
          if (this.itemCategoryId !== 0) {
            this.itemService.getsByCategoryId(this.itemCategoryId).pipe(takeUntil(this.ngUnsubscribe))

              .subscribe(
                (apidata: ApiObjectData) => {
                  this.items = apidata.returnData as Item[];
                  this.hideItemPopup();
                }
              );
          }

          this.edititemForm.reset(this.item);
        }
      },
      error => {
        this.baseService.blockStop();
        console.log(error);
      }
    );
  }


  onFileChangedPersonalImage() {
    // if (event.target.files && event.target.files.length > 0) {
    //   this.baseService.blockStart();
    //   const file = event.target.files[0];
    //   this.itemService.uplaod(file).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
    //     (result: any) => {
    //       this.baseService.blockStop();
    //       if (result.filePath !== '') {
    //         // this.alertService.success('تم رفع العقد بنجاح');
    //         // this.item.image = result.filePath;
    //         this.edititemForm.form.markAsDirty();
    //         this.disablebuttton = false;
    //       }
    //     },
    //     error => {
    //       this.baseService.blockStop();
    //       console.log(error);
    //     }
    //   );
    // }
  }

  // removeProjectContractImage() {
  //   this.project.projectContractImageUrl = '';
  //   this.editForm.form.markAsDirty();
  //   this.disableContractImage = true;
  // }

  // onFileChangedPersonalImage(event: { target: { files: any[]; }; }) {
  //   const reader = new FileReader();
  //   if (event.target.files && event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       this.item.image = (reader.result as string).split(',')[1];
  //       this.edititemForm.form.markAsDirty();
  //     };
  //   }
  // }

  viewItemIamge() {
    this.viewPopupImage = true;

  }

  removeItemImage() {
    this.disablebuttton = true;
    // this.item.image = null;
    this.edititemForm.form.markAsDirty();
  }



  onInitialized(e) {
    this.dataItemGridInstance = e.component;
  }

  onSelectionChanged(e) {
    if (e.currentSelectedRowKeys.length > 0) {
      this.itemId = e.currentSelectedRowKeys[0];
      this.item = e.selectedRowsData[0];
    } else {
      this.itemId = 0;
    }
  }

  onRowRemoving(e) {
    this.removeItem(e);
  }

  deleteRow() {
    this.dataItemGridInstance.deleteRow(
      this.dataItemGridInstance.getRowIndexByKey(this.itemId)
    );
  }

  removeItem(ev) {
    const promise = new Promise<void>((resolve, reject) => {
      this.baseService.blockStart();
      this.itemService.remove(ev.key).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (apiObjectData: any) => {
          this.baseService.blockStop();
          this.alertService.message(apiObjectData.message);
          if (apiObjectData.message.type === 'Success') {
            this.itemId = 0;
            this.popItem = false;
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
  onItemClick(e) {
    e.itemData.name ;
  }

  //#endregion
}
