import { ItemPriceService } from './../../../core/services/st/item-price.service';
import  DataGrid  from 'devextreme/ui/data_grid';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ApiObjectData } from 'src/app/core/models/apiObjectData';
import { BaseComponent } from '../../base/base/base.component';
import { DxoGridComponent } from 'devextreme-angular/ui/nested';
import { Item } from 'src/app/core/models/st/item';
import { Brand } from 'src/app/core/models/st/brand';
import { ItemPhoto } from 'src/app/core/models/st/itemPhoto';
import { ItemService } from 'src/app/core/services/st/item.service';
import { BaseService } from 'src/app/core/services/base/base.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/base/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { ItemPrice } from 'src/app/core/models/st/itemPrice';
import { Company } from 'src/app/core/models/ad/company';

declare var require;
const Swal = require('sweetalert2');

@Component({
  selector: 'item-price',
  templateUrl: './item-price.component.html',
  styleUrls: ['./item-price.component.scss']
})
export class ItemPriceComponent extends BaseComponent implements OnInit {
  @ViewChild('gridItems', { static: false }) gridItems: DxoGridComponent;
  @ViewChild("headerActions") headerActions: ElementRef;
  itemId:number =0;
  height = 0;
  dataGridInstance: DataGrid;
  itemPrices: ItemPrice[];
  itemPrice={}as ItemPrice;
  items: Item[];
  companies: Company[];
  downloads: any[];
  file: File = null;
  userScreens: any;
  popItemPrice:boolean=false;
  constructor(
    private itemPriceService:ItemPriceService,
    public baseService: BaseService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private translate: TranslateService,
    private router: Router
  ) {
    super();
  }
  
  ngAfterViewInit() {
    var userScreen = this.userScreens.filter((o) => o.nameEn === "itemPrice")[0];
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


  ngOnInit(): void {
    this.height = window.innerHeight - 312;
    this.loadData();
  }

  loadData() {
    this.userScreens = localStorage.getItem('userScreens');
    this.route.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (data) => {
        this.itemPrices = data.itemPrices.returnData;
        this.companies = data.companies.returnData;
        this.items = data.items.returnData;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onInitialized(e) {
    this.dataGridInstance = e.component;
  }

  onSelectionChanged(e) {
    if (e.currentSelectedRowKeys.length > 0) {
      this.itemId = e.currentSelectedRowKeys[0];
      this.itemPrice = e.selectedRowsData[0];
    } else {
      this.itemId = 0;
    }
  }

  addItem() {
    this.itemPrice={}as ItemPrice;
    this.popItemPrice=true;
  }

  editItem() {
    if(this.itemId===0){
      this.alertService.warning(this.translate.instant('selectElementFirst'));
    }
    else{
      this.popItemPrice=true;
    }
  }

  deleteItem(){
    if (this.itemId == 0)
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
          this.itemPriceService.remove(this.itemId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
          (apidata:ApiObjectData|any)=>{
            if(apidata.message.type==='Error'){
              this.baseService.blockStop();
              if(apidata.message.log='This companyId related'){
                Swal.fire({
                  title: this.translate.instant('related'),
                  icon: 'error',
                  cancelButtonText: this.translate.instant('back'),
                  confirmButtonText: this.translate.instant('cancel')
                });
              }
            }
            else{
              this.baseService.blockStop();
              this.itemPrices = this.itemPrices.filter(cat=> cat.id!=this.itemId);
              this.itemId=0;
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

  saveItemPrice(){
    if(this.itemPrice.itemId!==undefined){
      this.baseService.blockStart();
      this.itemPriceService.save(this.itemPrice).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (priceData:ApiObjectData|any)=>{
        this.baseService.blockStop();
        if(priceData.message.type==='Success'){
          this.alertService.success(this.translate.instant('SavedSuccess'));
        this.itemPrices.push(priceData.returnData as ItemPrice);
        }
        else{
          this.alertService.error(priceData.message.log)
        }
      },error=>{
        this.baseService.blockStop();
        this.alertService.error(error.error)
      }
      )
    }
  }
}