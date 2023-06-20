import { ReservationTypeService } from './../../../core/services/bs/reservation-type.service';
import { AlertService } from './../../../core/services/base/alert.service';
import { BaseService } from './../../../core/services/base/base.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../base/base/base.component';
import { ReservationType } from 'src/app/core/models/ad/reservationType';
import { DxDataGridModule, DxListComponent } from 'devextreme-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservUserService } from 'src/app/core/services/sc/reserv-user.service';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/core/models/sc/user';
import DataGrid from 'devextreme/ui/data_grid';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { ApiObjectData } from 'src/app/core/models/apiObjectData';
@Component({
  selector: 'reservation-setting',
  templateUrl: './reservation-setting.component.html',
  styleUrls: ['./reservation-setting.component.scss']
})
export class ReservationSettingComponent extends BaseComponent implements OnInit {
  @ViewChild('gridData', { static: true }) gridData: DxDataGridModule;
  @ViewChild('listUser', { static: false }) list: DxListComponent;
  @ViewChild("headerActions") headerActions: ElementRef;
  reservTypes:ReservationType[];
  users:User[];
  itemsDataSource:ReservationType[];
  reservType={} as ReservationType;
  height = 0;
  rowIndex: -1;
  selectedItemKeys: any[];
  selectedItems: any[] = [];
  dataModel: any = { reservTypeId: 0, userIds: [] };
  selectedItem: any;
  itemId = 0;
  selectedRowIndex = -1;
  userScreens: any;
  gridInstance: DataGrid;
  typeDataSourceItems: DataSource;
  popupVisible = false;
  popupReserv= false;
  constructor(
    public baseService: BaseService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private reservationTypeService: ReservationTypeService,
    private router: Router,
    private reservUserService: ReservUserService,
    public translate: TranslateService
  ) { super()}

  ngOnInit() {
    this.height = window.innerHeight - 220;
    this.getitemsDataSource();
    this.loadData();

  }

  loadData() {
    this.userScreens = JSON.parse(localStorage.getItem("userScreens"));
    this.route.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      data => {
        // this.units = data.units.returnData;
        this.users = data.users.returnData;
      },
      error => {
        this.alertService.error(error);
      }
    );
  }

  ngAfterViewInit() {
    var userScreen = this.userScreens.filter((o) => o.nameEn === "reservSettings")[0];
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
        this.baseService.blockStop();
        this.itemsDataSource = data.itemsDataSource.returnData;

        for (let i = 0; i < this.itemsDataSource.length; i++) {
          this.selectedItemKeys = this.itemsDataSource[i].reservUsers;
          const userRolesArray: number[] = [];

          for (let j = 0; j < this.selectedItemKeys.length; j++) {
            userRolesArray.push(this.selectedItemKeys[j].userId);
          }
          this.itemsDataSource[i].userIds = userRolesArray;
        // }
        }
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

  editReservType(id) {
    this.reservType.id=id;
    this.popupReserv=true;
  }

  delete_user(value) {
    this.gridInstance.deleteRow(
      this.gridInstance.getRowIndexByKey(value)
    );
  }
  onRowRemoving(e) {
    
  }
  onSelectionChanged(e) {
    if (e.currentSelectedRowKeys.length > 0) {
      debugger
      this.itemId = e.currentSelectedRowKeys[0];
      this.reservType = e.selectedRowsData[0];
      this.selectedItems = e.selectedRowsData[0].userIds;
      this.selectedRowIndex = this.gridInstance.getRowIndexByKey(
        this.itemId
      );
    } else {
      this.itemId = 0;
    }
  }

  onRowUpdating(e) {
    // Create temp object of the orginal record before any updates
    // const item = {};
    // for (const key in e.oldData) {
    //   if (e.oldData.hasOwnProperty(key)) {
    //     const value = e.oldData[key];
    //     item[key] = value;
    //   }
    // }
    // // Calling saving method
    // this.saveItem(e, item);
  }

  openPopup() {
    this.typeDataSourceItems = new DataSource({
      store: new ArrayStore({
        key: 'id',
        data: this.users
      })
    });
    this.popupVisible = true;
  }

  hidePopup() {
    this.selectedItems = this.itemsDataSource[this.selectedRowIndex].userIds;
    this.list.selectedItemKeys = this.selectedItems;
    this.popupVisible = false;
  }

  saveSelectedItems() {
    debugger
    this.baseService.blockStart();
    // Handle asynchronous work by using promise
    this.dataModel.reservTypeId = this.itemId;
    this.dataModel.userIds = this.list.selectedItemKeys;
    const promise = new Promise<void>((resolve, reject) => {
      // Call API mthod to save updated record on the server
      this.reservUserService.saveBatch(this.dataModel).subscribe(
        (apiObjectData: ApiObjectData|any) => {
          this.baseService.blockStop();
          // this.alertService.message(apiObjectData.message);
          if (apiObjectData.message.type === 'Success') {
            this.alertService.success(this.translate.instant("toastrMsg.savedSuccessfully"));
            resolve();
            this.popupVisible = false;
            this.itemsDataSource[
              this.selectedRowIndex
            ].userIds = this.list.selectedItemKeys;
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

  saveReserv(){
    if(this.reservType!=undefined){
      this.baseService.blockStart();
      this.reservationTypeService.save(this.reservType).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (type:ApiObjectData|any)=>{
          this.baseService.blockStop();
          if(type.message.type==='Success'){
            this.alertService.success(this.translate.instant('toastrMsg.savedSuccessfully'));
            this.reservationTypeService.gets().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
              (types:ApiObjectData)=>{
                this.itemsDataSource = types.returnData as ReservationType[];
                this.popupReserv=false;
              }
            )
          }else{
            this.alertService.error(type.message.log)
          }
        },error=>{
          this.baseService.blockStop();
          this.alertService.error(error);
        }
      )
    }
  }
}
