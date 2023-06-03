import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ApiObjectData } from 'src/app/core/models/apiObjectData';
import { BaseComponent } from '../../base/base/base.component';
import { DxDataGridModule, DxListComponent, DxTreeViewComponent } from 'devextreme-angular';

import { Role } from 'src/app/core/models/sc/role';
import DataGrid from 'devextreme/ui/data_grid';
import DataSource from 'devextreme/data/data_source';
import { BaseService } from 'src/app/core/services/base/base.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/base/alert.service';
import { UserService } from 'src/app/core/services/sc/user.service';
import { UserRoleService } from 'src/app/core/services/sc/userrole.service';
import { ConfigService } from 'src/app/core/services/base/config.service';
import { User } from 'src/app/core/models/sc/user';
import ArrayStore from 'devextreme/data/array_store';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends BaseComponent implements OnInit {

  @ViewChild('gridData', { static: true }) gridData: DxDataGridModule;
  @ViewChild('listUser', { static: false }) list: DxListComponent;
  @ViewChild("headerActions") headerActions: ElementRef;
  @ViewChild('unitTreeView', { static: false }) unitTreeView: DxTreeViewComponent;

  gridInstance: DataGrid;
  itemsDataSource: User[];
  user: User;
  dataModel: any = { userId: '', userRoles: [] };
  selectedItem: any;
  itemId = 0;
  selectedRowIndex = -1;
  flag: boolean;
  showPasswordField = false;
  popupVisible = false;
  height = 0;
  rowIndex: -1;
  selectedItemKeys: any[];
  selectedItems: any[] = [];
  roles: Role[];
  roleDataSourceItems: DataSource;
  userHight: number = 0;
  userScreens: any;
  actions: any;
  view: boolean = false;
  add: boolean = false;
  edit: boolean = false;
  delete: boolean = false;
  activeArr: any[] = [];
  // dataGridInstance: DataGrid;
  yesnoList: any = [
    {
      id: false,
      text: 'نشط'
    },
    {
      id: true,
      text: 'غير نشط'
    }
  ];

  usertypesList: any = [
    {
      id: 1,
      name: 'عميل'
    },
    {
      id: 2,
      name: 'بقالة'
    },
    {
      id: 3,
      name: 'مالك'
    },
    /* {
       id: 4,
       name: 'عامل توصيل'
     },*/
    {
      id: 5,
      name: 'ادمن'
    }
  ];

  disabledSelection=[]=[
    {id:'true',nameAr:'غير نشط',nameEn:'Is Disabled'},
    {id:'false',nameAr:'نشط',nameEn:'Not Disabled'},
  ]
  popSearch:boolean=false;
  searchVm={} as User;
  // units: Unit[];
  treeboxUnit: string[];
  checkBoxUnitsValue: boolean | null = false;
  // protected apiServer = ConfigService.lo .settings.apiServer;

  removeSearch: boolean = false;
  backUsers: User[];

  constructor(
    public baseService: BaseService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private userService: UserService,
    private router: Router,
    private userRoleService: UserRoleService,
    public translate: TranslateService,
    private ElByClassName: ElementRef
  ) {
    super()
  }

  ngOnInit() {
    this.height = window.innerHeight - 220;
    // this.userHight=this.height-450
    this.userHight = this.height - 200
    this.getitemsDataSource();
    this.getRoles();
    this.loadData();

  }

  loadData(): void {
    this.userScreens = JSON.parse(localStorage.getItem("userScreens"));
    this.route.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      data => {
        // this.units = data.units.returnData;
      },
      error => {
        this.alertService.error(error);
      }
    );
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

  getitemsDataSource(): void {
    this.userScreens = JSON.parse(localStorage.getItem("userScreens"))
    // this.route.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
    this.route.data.subscribe(
      data => {
        console.log(data);

        this.baseService.blockStop();
        this.itemsDataSource = data.itemsDataSource.returnData;
        this.backUsers = this.itemsDataSource;

        for (let i = 0; i < this.itemsDataSource.length; i++) {
          this.selectedItemKeys = this.itemsDataSource[i].userRoles;
          const userRolesArray: number[] = [];

          for (let j = 0; j < this.selectedItemKeys.length; j++) {
            userRolesArray.push(this.selectedItemKeys[j].roleId);
          }
          this.itemsDataSource[i].roleIds = userRolesArray;
        // }
        }
      },
      error => {
        this.alertService.error(error);
      }
    );
  }

  getRoles(): void {
    this.route.data.subscribe(
      data => {
        this.roles = data.roles.returnData;
      },
      error => {
        this.alertService.error(error);
      }
    );
  }



  onCellPrepared(e) {
   
    if (e.rowType === "data" && e.column.cellTemplate === "actions") {
      var userScreen = this.userScreens.filter((o) => o.nameEn === "users")[0];

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

  grid_onInitialized(e) {
    this.gridInstance = e.component;
  }

  edit_user(id) {
    this.router.navigate(['/page/user/edit', id]);
  }

  delete_user(value) {
    this.gridInstance.deleteRow(
      this.gridInstance.getRowIndexByKey(value)
    );
  }
  onRowRemoving(e) {
    this.userService.remove(e.data.id).subscribe(
      (data: any) => {
        if (data.message.type === "Success") {
          this.alertService.success(this.translate.instant("toastrMsg.delete"));
        }
      },
      error => {
        this.alertService.error(this.translate.instant("toastrMsg.unexpectedError"));
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
      this.userService.save(ev.oldData).subscribe(
        (apiObjectData: ApiObjectData|any) => {
          this.baseService.blockStop();
          // this.alertService.message(apiObjectData.message);
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

  // removeItem(ev) {
  //   this.baseService.blockStart();
  //   const promise = new Promise<void>((resolve, reject) => {
  //     // Call API mthod to save updated record on the server
  //     this.userService.remove(ev.key).subscribe(
  //       (apiObjectData: ApiObjectData) => {
  //         this.baseService.blockStop();
  //         // this.alertService.message(apiObjectData.message);
  //         if (apiObjectData.message.type === 'Success') {
  //           this.alertService.success(this.translate.instant("toastrMsg.delete"));
  //           resolve();
  //         } else {
  //           reject();
  //         }
  //       },
  //       error => {
  //         this.baseService.blockStop();
  //         reject();
  //       }
  //     );
  //   });

  //   ev.cancel = promise;
  // }

  addItem(ev: any) {
    this.baseService.blockStart();
    // Handle asynchronous work by using promise
    const promise = new Promise<void>((resolve, reject) => {
      // Call API mthod to save updated record on the server
      // this.userService.save(ev.data).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      this.userService.save(ev.data).subscribe(
        (apiObjectData: ApiObjectData|any) => {
          this.baseService.blockStop();
          if (apiObjectData.message.type === 'Success') {
            this.alertService.success(this.translate.instant("toastrMsg.add"));
            resolve();
            // set id value for inserted row
            ev.data['id'] = apiObjectData.returnData['id'];
          } else {
            reject();
          }
        },
        error => {
          this.baseService.blockStop();
          reject();
        }
      );
    });

    ev.cancel = promise;
  }

  onSelectionChanged(e) {
    if (e.currentSelectedRowKeys.length > 0) {
      this.itemId = e.currentSelectedRowKeys[0];
      this.selectedItems = e.selectedRowsData[0].roleIds;
      this.selectedRowIndex = this.gridInstance.getRowIndexByKey(
        this.itemId
      );
    } else {
      this.itemId = 0;
    }
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

  // // onRowRemoving(e) {
  // //   this.removeItem(e);
  // // }

  onRowInserting(e) {
    // Calling add method
    this.addItem(e);
  }

  onEditorPreparing(e) {
    if (e.dataField === 'address') {
      e.editorName = 'dxTextArea';
      // e.editorOptions.showClearButton = true;
      e.editorOptions.onValueChanged = event => {
        const value = event.value;
        e.setValue(value.toLowerCase());
      };
    }
  }

  // onClickClose(): void {
  //   window.close();
  // }

  // saveGridInstance(e) {
  //   this.dataGridInstance = e.component;
  // }

  // addRow() {
  //   this.showPasswordField = true;
  //   this.dataGridInstance.addRow();
  // }

  // editRow() {
  //   this.showPasswordField = false;
  //   this.dataGridInstance.editRow(
  //     this.dataGridInstance.getRowIndexByKey(this.itemId)
  //   );
  // }

  // deleteRow() {
  //   this.dataGridInstance.deleteRow(
  //     this.dataGridInstance.getRowIndexByKey(this.itemId)
  //   );
  // }

  openPopup() {
    this.roleDataSourceItems = new DataSource({
      store: new ArrayStore({
        key: 'id',
        data: this.roles
      })
    });
    this.popupVisible = true;
  }

  hidePopup() {
    this.selectedItems = this.itemsDataSource[this.selectedRowIndex].roleIds;
    this.list.selectedItemKeys = this.selectedItems;
    this.popupVisible = false;
  }

  saveSelectedItems() {
    this.baseService.blockStart();
    // Handle asynchronous work by using promise
    this.dataModel.userId = this.itemId;
    this.dataModel.userRoles = this.list.selectedItemKeys;
    const promise = new Promise<void>((resolve, reject) => {
      // Call API mthod to save updated record on the server
      this.userRoleService.saveBatch(this.dataModel).subscribe(
        (apiObjectData: ApiObjectData|any) => {
          this.baseService.blockStop();
          // this.alertService.message(apiObjectData.message);
          if (apiObjectData.message.type === 'Success') {
            this.alertService.success(this.translate.instant("toastrMsg.savedSuccessfully"));
            resolve();
            this.popupVisible = false;
            this.itemsDataSource[
              this.selectedRowIndex
            ].roleIds = this.list.selectedItemKeys;
          } else {
            reject();
          }
        },
        error => {
          this.baseService.blockStop();
          reject();
        }
      );
    });
  }

  /*Unit Multi Selection */
  onUnitDropDownBoxValueChanged() {
    this.updateUnitSelection(this.unitTreeView && this.unitTreeView.instance);
  }

  handleValueUnitsChange(e) {
    if(e.value === true) {
      this.unitTreeView.instance.selectAll();
      this.searchVm.unitIdList=this.unitTreeView.instance.getSelectedNodeKeys()
    }
    else {
      this.unitTreeView.instance.unselectAll();
      this.searchVm.unitIdList= []
    }
  }

  onUnitTreeViewReady(e) {
    this.updateUnitSelection(e.component);
  }

  updateUnitSelection(unitTreeView) {
    if (!unitTreeView) return;

    if (!this.searchVm.unitIdList) {
      unitTreeView.unselectAll();
      this.checkBoxUnitsValue = false;
    }

    if (this.searchVm.unitIdList) {
      this.searchVm.unitIdList.forEach(((value) => {
        unitTreeView.selectItem(value);
      }));
    }
  }

  onUnitTreeViewSelectionChanged(e) {
    this.searchVm.unitIdList = e.component.getSelectedNodeKeys();
  }

  openSearchPop(){
    this.popSearch=true;
    this.searchVm ={} as User;
  }

  searchInUser() {
    this.baseService.blockStart();
    if (this.searchVm.unitIdList!==undefined) this.searchVm.unitIds = this.searchVm.unitIdList.toString();
    this.userService.searchInUser(this.searchVm).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (data:ApiObjectData|any)=>{
        this.baseService.blockStop();
        this.itemsDataSource = data.returnData as User[];
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
    this.itemsDataSource =  this.backUsers;
    this.baseService.blockStop();
    this.removeSearch = false
  }

  hidePopSearch(){
    this.popSearch=false;
  }

}

