import { Brand } from 'src/app/core/models/st/brand';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base/base.component';
import DataGrid from 'devextreme/ui/data_grid';
import { BaseService } from 'src/app/core/services/base/base.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/core/services/base/alert.service';
import { BrandService } from 'src/app/core/services/st/brand.service';
import { takeUntil } from 'rxjs/operators';
import { Category } from 'src/app/core/models/st/category';
import { ApiObjectData } from 'src/app/core/models/apiObjectData';
import { TranslateService } from '@ngx-translate/core';

declare var require;
const Swal = require('sweetalert2');

@Component({
  selector: 'brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent extends BaseComponent implements OnInit {
  brandId = 0;
  height = 0;
  dataGridInstance: DataGrid;
  brands: Brand[];
  categories: Category[];
  brand={} as Brand;
  popBrand:boolean=false;
  constructor(
    private brandService: BrandService,
    public baseService: BaseService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private translate:TranslateService
  ) { super(); }

  ngOnInit(): void {
    this.height = window.innerHeight - 312;
    this.loadData();
  }

  loadData() {
    this.route.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      data => {
        this.brands = data.brands.returnData;
        this.categories = data.categories.returnData;
      },
      error => {
        console.log(error);
      }
    );
  }

  onInitialized(e) {
    this.dataGridInstance = e.component;
  }

  onSelectionChanged(e) {
    if (e.currentSelectedRowKeys.length > 0) {
      this.brandId = e.currentSelectedRowKeys[0];
      this.brand = e.selectedRowsData[0];
    } else {
      this.brandId = 0;
    }
  }

  addBrand(){
    this.brand={} as Brand;
    this.popBrand = true;
  }
  

  saveBrand(){
    if(this.brand!=={} as Brand){
      this.baseService.blockStart();
      this.brandService.save(this.brand).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (data:ApiObjectData|any)=>{
          this.baseService.blockStop();
          if(data.message.type==='Success'){
            this.alertService.success(this.translate.instant('SavedSuccess'));
            this.brandService.gets().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
              (brandsData:ApiObjectData)=>{
                this.brands = brandsData.returnData as Brand[];
                this.popBrand=false;
              }
            )
          }
          else{
            this.alertService.error(data.message.log);
          }
        },error=>{
          this.baseService.blockStop();
          this.alertService.error(error.error)
        }
      )
    }
  }

  deleteBrand(){
    if (this.brandId == 0)
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
          this.brandService.remove(this.brandId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
          (apidata:ApiObjectData|any)=>{
            if(apidata.message.type==='Error'){
              this.baseService.blockStop();
              if(apidata.message.log='This Brand related'){
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
              this.brands = this.brands.filter(cat=> cat.id!=this.brandId);
              this.brandId=0;
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


}
