import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ApiObjectData } from 'src/app/core/models/apiObjectData';
import { Role } from 'src/app/core/models/sc/role';
import { BaseComponent } from '../../base/base/base.component';
import { DxDataGridModule, DxListComponent, DxTreeListComponent, DxTreeViewComponent } from 'devextreme-angular';
import DataGrid from 'devextreme/ui/data_grid';
import DataSource from 'devextreme/data/data_source';
import { Menu } from 'src/app/core/models/sc/menu';
import { Form } from 'src/app/core/models/sc/form';
import { BaseService } from 'src/app/core/services/base/base.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/base/alert.service';
import { RoleService } from 'src/app/core/services/sc/role.service';
import { RoleMenuService } from 'src/app/core/services/sc/role-menu.service';
import { TranslateService } from '@ngx-translate/core';
import { FormService } from 'src/app/core/services/sc/form.service';
import { RoleScreenService } from 'src/app/core/services/sc/role-form.service';

@Component({
  selector: 'roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent extends BaseComponent implements OnInit {
  @ViewChild('gridData', { static: true }) gridData: DxDataGridModule;
  @ViewChild(DxTreeListComponent, { static: false }) treeList: DxTreeListComponent;
  @ViewChild('treeListCategory', { static: false }) treeListCategory: DxTreeListComponent;
  @ViewChild('treeUnits', { static: false }) treeUnits: DxTreeListComponent;
  @ViewChild('list', { static: false }) list: DxListComponent;
  @ViewChild(DxTreeViewComponent, { static: false }) personTreeView;
  @ViewChild(DxTreeViewComponent, { static: false }) rankTreeView;
  // @ViewChild(DxTreeViewComponent, { static: false }) unitTreeView;
  @ViewChild("headerActions") headerActions: ElementRef;
  @ViewChild('unitTreeView', { static: false }) unitTreeView: DxTreeViewComponent;

  itemsDataSource: Role[];
  role: Role;
  newRole={} as Role;
  selectedItem: any;
  selectedRowKeys: any[] = [];
  selectedItems: any[] = [];
  selectedNodes: any[] = [];
  dataModel: any = { roleId: '', roleMenus: [] };
  itemId = 0;
  selectedRowIndex = -1;
  itemIdScreen = 0;
  flag: boolean;
  popupVisible = false;
  popRoleVisible = false;
  popupGatesVisible = false;
  height = 0;
  rowIndex: -1;
  englishChar =
    '^[a-zA-Z0-9 ^<>{}"/|;:.,~!?@#$%^=&*\\]\\\\()\\[¿§«»ω⊙¤°℃℉€¥£¢¡®©_+-]+$';
  arabicChar = '^[\u0621-\u064A\u0660-\u0669\0-9]+$';
  dataGridInstance: DataGrid;
  menuDataSourceItems: DataSource;
  menus: Menu[];
  returnedScreens: Form[];
  gridInstance: DataGrid;

  screens: Screen[];
  // organizations: Organization[];
  personTypeIds: string[];

  unitIds: string;
  rankIds: string;

  CategoryId: number = 1;

  parentIdCategory: number;
  selectedRowKeysCategories: number[] = [];
  selectedRowKeysRoles: number[] = [];
  selectedRowIndexCategory = -1;
  dataModelCategory: any = { roleId: '', roleForms: [] };
  selectedMeuns: number[]
  popupVisibleScreen = false;
  categories: any[];
  selectedNodesCategories: any[] = [];
  dataGridInstanceCategories: DataGrid;
  userScreens: any;

  popSearch: boolean = false;
  searchVm = {} as Role;
  treeboxUnit: string[];
  checkBoxUnitsValue: boolean | null = false;

  removeSearch: boolean = false;
  backRoles: Role[];

  constructor(
    public baseService: BaseService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private roleService: RoleService,
    private roleMenuService: RoleMenuService,
    private router: Router,
    private ref: ChangeDetectorRef,
    private translate: TranslateService,
    private formService: FormService,
    public roleScreenService: RoleScreenService
  ) {
    super();
  }

  ngOnInit() {
    this.height = window.innerHeight - 220;
    this.loadData();
  }

  ngAfterViewInit() {
    var userScreen = this.userScreens.filter((o) => o.nameEn === "roles")[0];
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


  onCellPrepared(e) {
    if (e.rowType === "data" && e.column.cellTemplate === "actions") {
      var userScreen = this.userScreens.filter((o) => o.nameEn === "roles")[0];
      if (userScreen) {
        for (let i = 0; i < e.cellElement.children[0].children.length; i++) {
          let flag = false;
          userScreen.action.forEach(userAction => {
            if (e.cellElement.children[0].children[i].accessKey === userAction.nameEn) {
              flag = true;
              return;
            }
          });
          if (!flag) {
            e.cellElement.children[0].removeChild(e.cellElement.children[0].children[i]);
            i--;
          }
        }
      }
      else {
        for (let i = 0; i < e.cellElement.children[0].children.length; i++) {
          e.cellElement.children[0].removeChild(e.cellElement.children[0].children[i]);
          i--;
        }
      }
    }
  }

  loadData(): void {
    this.userScreens = JSON.parse(localStorage.getItem("userScreens"))
    this.route.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      data => {
        this.baseService.blockStop();
        // this.organizations = data.organizations.returnData;
        this.itemsDataSource = data.itemsDataSource.returnData;
        this.backRoles = this.itemsDataSource;
        this.menus = data.menus.returnData;
        this.screens = data.screens.returnData;
        // this.units =data.units.returnData;
        this.itemsDataSource.forEach(item => {
          const roleMenusArray: number[] = [];
          item.roleMenus.forEach(element => {
            roleMenusArray.push(element.menuId);
          });
          item.roleMenus = roleMenusArray;

          const roleCategoriesArray: number[] = [];
          item.roleForms.forEach(element => {
            roleCategoriesArray.push(element.formId);
          });
          item.roleForms = roleCategoriesArray;
        });
      },
      error => {
        this.alertService.error(error);
      }
    );
  }

  saveItem(ev: any, item: any) {
    this.baseService.blockStart();
    // Handle asynchronous work by using promise
    const promise = new Promise<void>((resolve, reject) => {
      // Update orginal record with new updated values
      for (const key in ev.newData) {
        if (item.hasOwnProperty(key)) {
          const value = ev.newData[key];
          ev.oldData[key] = value;
        }
      }

      // Call API mthod to save updated record on the server
      this.roleService.save(ev.oldData).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (apiObjectData: ApiObjectData|any) => {
          this.baseService.blockStop();
          if (apiObjectData.message.type === 'Success') {
            this.alertService.success(this.translate.instant("toastrMsg.savedSuccessfully"));
            resolve();
          } else {
            reject();
            // Update grid datasource with the orginal record
            const obj = this.itemsDataSource.find(x => x.id === ev.key);
            for (const key in item) {
              if (item.hasOwnProperty(key)) {
                const value = item[key];
                obj[key] = value;
              }
            }
          }
        },
        error => {
          this.baseService.blockStop();
          this.alertService.error(error);
          reject();
        }
      );
    });

    ev.cancel = promise;
  }

  saveRole(){
    this.roleService.save(this.newRole).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (roleData:ApiObjectData|any)=>{
        if(roleData.message.type==='Success'){
          this.itemsDataSource.push(roleData.returnData);
          this.alertService.success('تم الحفظ بنجاح');
          this.popRoleVisible = false;
        }
        else{
          this.alertService.error(roleData.message.log);
        }
      }
    )
  }
  removeItem(e) {
    this.baseService.blockStart();
    const promise = new Promise<void>((resolve, reject) => {
      // Call API mthod to save updated record on the server
      this.roleService.remove(e.data.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (apiObjectData: ApiObjectData|any) => {
          this.baseService.blockStop();
          if (apiObjectData.message.type === 'Success') {
            this.alertService.success(this.translate.instant("toastrMsg.delete"));
            resolve();
          } else {
            reject();
          }
        },
        error => {
          this.baseService.blockStop();
          this.alertService.error(error);
          reject();
        }
      );
    });

    e.cancel = promise;
  }

  addItem(ev: any) {
    this.baseService.blockStart();
    // Handle asynchronous work by using promise
    const promise = new Promise<void>((resolve, reject) => {
      // Call API mthod to save updated record on the server
      this.roleService.save(ev.data).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (apiObjectData: ApiObjectData|any) => {
          this.baseService.blockStop();
          if (apiObjectData.message.type === 'Success') {
            resolve();
            this.alertService.success(this.translate.instant("toastrMsg.add"));
            // set id value for inserted row
            ev.data['id'] = apiObjectData.returnData['id'];
          } else {
            reject();
          }
        },
        error => {
          this.baseService.blockStop();
          this.alertService.error(error);
          reject();
        }
      );
    });

    ev.cancel = promise;
  }

  onRowUpdating(e) {
    // Create temp object of the orginal record before any updates
    const item = {};
    for (const key in e.oldData) {
      if (e.oldData.hasOwnProperty(key)) {
        const value = e.oldData[key];
        item[key] = value;
      }
    }
    // Calling saving method
    this.saveItem(e, item);
  }

  onRowRemoving(e) {
    this.removeItem(e);
  }

  onRowInserting(e) {
    // Calling add method
    this.addItem(e);
  }

  onEditorPreparing(e) {
    if (e.dataField === 'description1') {
      e.editorName = 'dxTextArea';
      e.editorOptions.onValueChanged = event => {
        const value = event.value;
        e.setValue(value.toLowerCase());
      };
    }
  }

  onClickClose(): void {
    window.close();
  }

  saveGridInstance(e) {
    this.dataGridInstance = e.component;
    this.dataGridInstanceCategories = e.component;
  }

  addRow() {
    this.dataGridInstance.addRow();
  }

  editRole(id) {
    this.dataGridInstance.editRow(
      this.dataGridInstance.getRowIndexByKey(id)
    );
  }

  deleteRole(id) {
    this.dataGridInstance.deleteRow(
      this.dataGridInstance.getRowIndexByKey(id)
    );
  }

  openPopup(id) {
    this.selectedRowIndex = this.dataGridInstance.getRowIndexByKey(id);
    this.selectedRowKeys = this.itemsDataSource[this.selectedRowIndex].roleMenus;
    this.treeList.instance.selectRows(this.selectedRowKeys, false);
    this.popupVisible = true;
    this.itemId = id;

    // this.openPopupScreen(id);
  }

  openPopupScreen(id) {
    debugger
    this.selectedRowIndexCategory = this.dataGridInstance.getRowIndexByKey(id);
    this.selectedRowKeysCategories = this.itemsDataSource[this.selectedRowIndexCategory].roleForms;
    // this.selectedRowKeysRoles = this.itemsDataSource[this.selectedRowIndexCategory].roleMenus;
    this.treeListCategory.instance.selectRows(this.selectedRowKeysCategories, false)
    // this.treeList.instance.selectRows(this.selectedRowKeysRoles, false)
    // this.popupVisibleScreen = true;
    this.itemId = id;
    // this.openPopup(id);
  }

  hidePopup() {
    this.treeList.instance.clearSelection();
    this.popupVisible = false;
  }


  hidePopupScreen() {
    this.treeListCategory.instance.clearSelection();
    this.popupVisibleScreen = false;
  }


  openRolePopup() {
  
    this.popRoleVisible = true;
  }

  hideRolePopup() {
    this.popRoleVisible = false;
  }

  openGatesPopup() {
    this.popupGatesVisible = true;
  }

  hideGatesPopup() {
    this.list.selectedItemKeys = [];
    this.popupGatesVisible = false;
  }

  // saveSelectedUnits() {
  //   this.baseService.blockStart();
  //   this.role = {} as Role;
  //   this.role.id = this.itemId;
  //   this.role.unitIdList = this.treeUnits.instance.getSelectedRowKeys('all');
  // }

  saveSelectedGates() {
    this.baseService.blockStart();
    this.role = {} as Role;
    this.role.id = this.itemId;
  }

  saveSelectedItems() {
    debugger
    this.dataModel.roleId = this.itemId;
    this.dataModel.roleMenus = this.treeList.instance.getSelectedRowKeys('leavesOnly');

    // Handle asynchronous work by using promise
    const promise = new Promise<void>((resolve, reject) => {
      this.baseService.blockStart();
      // Call API mthod to save updated record on the server
      this.roleMenuService.saveBatch(this.dataModel).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (apiObjectData: ApiObjectData|any) => {
          this.baseService.blockStop();
          // this.alertService.message(apiObjectData.message);

          if (apiObjectData.message.type === 'Success') {
            this.alertService.success(this.translate.instant("toastrMsg.savedSuccessfully"));
            this.saveSelectedScreens();
            resolve();
            // this.popupVisible = false;
            this.popupVisible = false;
            this.itemsDataSource[
              this.selectedRowIndex
            ].roleMenus = this.dataModel.roleMenus;
          } else {
            reject();
          }
        },
        error => {
          this.baseService.blockStop();
          this.alertService.error(error);
          reject();
        }
      );
    });
  }

  handlesxreenSelect(e) {
    debugger
    this.selectedMeuns  =this.treeList.instance.getSelectedRowKeys('leavesOnly');
    this.formService.getByMenu(this.selectedMeuns).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (data: ApiObjectData|any)=> {
        console.log(data.message)
        console.log(data.returnData)
        this.returnedScreens = data.returnData as Form[];

        this.selectedRowIndexCategory = this.dataGridInstance.getRowIndexByKey(this.itemId);
        this.selectedRowKeysCategories = this.itemsDataSource[this.selectedRowIndexCategory].roleForms;
        // this.selectedRowKeysRoles = this.itemsDataSource[this.selectedRowIndexCategory].roleMenus;
        this.treeListCategory.instance.selectRows(this.selectedRowKeysCategories, false)
      }
    )
  }

  // getMenusFromScreen() {
  //   this.selectedScreens = this.treeListCategory.instance.getSelectedRowKeys('all');

  // }

  saveSelectedScreens() {
    debugger
    this.dataModelCategory.roleId = this.itemId;
    this.dataModelCategory.roleForms = this.treeListCategory.instance.getSelectedRowKeys('leavesOnly');
    const promise = new Promise<void>((resolve, reject) => {
      this.baseService.blockStart();
      // Call API mthod to save updated record on the server
      this.roleScreenService.saveBatch(this.dataModelCategory).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (apiObjectData: ApiObjectData|any) => {
          this.baseService.blockStop();
          // this.alertService.message(apiObjectData.message);

          if (apiObjectData.message.type === 'Success') {
            // this.alertService.success(this.translate.instant("toastrMsg.savedSuccessfully"));
            resolve();
            this.popupVisible = false;
            this.itemsDataSource[
              this.selectedRowIndexCategory
            ].roleForms = this.dataModelCategory.roleForms;
          } else {
            reject();
          }
        },
        error => {
          this.baseService.blockStop();
          this.alertService.error(error);
          reject();
        }
      );
    });
  }

  /* Person Multi Selection */
  onPersonDropDownBoxValueChanged(e) {
    if (!this.personTreeView) return;

    if (!this.personTypeIds) {
      this.personTreeView.instance.unselectAll();
    } else {
      this.personTreeView.instance.selectItem(this.personTreeView);
    }
  }

  onTreeBoxOptionChangedForPerson(e) {
    if (e.name === 'value') {
      this.ref.detectChanges();
    }
  }

  onTreeViewSelectionChanged(e) {
    this.personTypeIds = e.component.getSelectedNodeKeys();
  }


  /* Rank Multi Selection */
  onRankDropDownBoxValueChanged(e) {
    if (!this.rankTreeView) return;

    if (!this.rankIds) {
      this.rankTreeView.instance.unselectAll();
    } else {
      this.rankTreeView.instance.selectItem(this.rankTreeView);
    }
  }

  onTreeBoxOptionChangedForRank(e) {
    if (e.name === 'value') {
      this.ref.detectChanges();
    }
  }

  onRankTreeViewSelectionChanged(e) {
    this.rankIds = e.component.getSelectedNodeKeys();
  }


  /*Unit Multi Selection */
  onDropDownBoxValueChanged(e) {
    this.updateSelection(this.unitTreeView && this.unitTreeView.instance);
  }

  onTreeViewReady(e) {
    this.updateSelection(e.component);
  }

  updateSelection(treeView) {
    if (!treeView) return;

    if (!this.treeboxUnit) {
      treeView.unselectAll();
    }

    if (this.treeboxUnit) {
      this.treeboxUnit.forEach(((value) => {
        treeView.selectItem(value);
      }));
    }
  }

  onTreeUnitViewSelectionChanged(e) {
    this.treeboxUnit = e.component.getSelectedNodeKeys();
    this.searchVm.unitIds = this.treeboxUnit.toString();
  }

  openSearchPop(){
    this.popSearch=true;
    this.searchVm ={} as Role;
  }

  searchInRole() {
    this.baseService.blockStart();
    this.roleService.searchInRole(this.searchVm).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (data:ApiObjectData|any)=>{
        this.baseService.blockStop();
        this.itemsDataSource = data.returnData as Role[];
        this.itemsDataSource.forEach(item => {
          const roleMenusArray: number[] = [];
          item.roleMenus.forEach(element => {
            roleMenusArray.push(element.menuId);
          });
          item.roleMenus = roleMenusArray;

          const roleCategoriesArray: number[] = [];
          item.roleForms.forEach(element => {
            roleCategoriesArray.push(element.formId);
          });
          item.roleForms = roleCategoriesArray;
        });
        this.popSearch=false;
        this.removeSearch = true;
      },error=>{
        this.baseService.blockStop();
        this.alertService.error(error);
        this.alertService.error(error);
      }
    )
  }

  removeSearchs() {
    this.baseService.blockStart();
    this.itemsDataSource =  this.backRoles;
    this.baseService.blockStop();
    this.removeSearch = false
  }

  hidePopSearch(){
    this.popSearch=false;
  }

  newEditRole(id) {
    this.router.navigate(['/page/addRole/edit', id]);
  }
}