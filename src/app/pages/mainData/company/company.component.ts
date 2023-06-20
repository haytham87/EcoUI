import { CityService } from './../../../core/services/bs/city.service';
import { Company } from './../../../core/models/ad/company';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from 'src/app/core/services/base/base.service';
import { AlertService } from 'src/app/core/services/base/alert.service';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base/base.component';
import DataGrid from 'devextreme/ui/data_grid';
import { Country } from 'src/app/core/models/ad/country';
import { City } from 'src/app/core/models/ad/city';
import { CompanyService } from 'src/app/core/services/bs/company.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ApiObjectData } from 'src/app/core/models/apiObjectData';

declare var require;
const Swal = require('sweetalert2');

@Component({
  selector: 'company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent extends BaseComponent implements OnInit {
  companyId = 0;
  height = 0;
  dataGridInstance: DataGrid;
  companies: Company[];
  countires: Country[];
  cities:City[];
  company={} as Company;
  popBrand:boolean=false;
  constructor(
    private companyService: CompanyService,
    public baseService: BaseService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private translate:TranslateService,
    private cityService:CityService
  ) { super(); }

  ngOnInit(): void {
    this.height = window.innerHeight - 312;
    this.loadData();
  }

  loadData() {
    this.route.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      data => {
        this.companies = data.companies.returnData;
        this.countires = data.countires.returnData;
        // this.cities = data.cities.returnData;
        console.log(data)
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
      this.companyId = e.currentSelectedRowKeys[0];
      this.company = e.selectedRowsData[0];
    } else {
      this.companyId = 0;
    }
  }

  coutrySelectChanged(e){
    if(e){
      this.cityService.getByCountry(e.selectedItem.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (cityData:ApiObjectData)=>{
          this.cities=cityData.returnData as City[]
        }
      )
    }
  }

  addCompany(){
    this.company={} as Company;
    this.popBrand = true;
  }
  

  saveCompany(){
    if(this.company!=={} as Company){
      this.baseService.blockStart();
      this.companyService.save(this.company).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (data:ApiObjectData|any)=>{
          this.baseService.blockStop();
          if(data.message.type==='Success'){
            this.alertService.success(this.translate.instant('SavedSuccess'));
            this.companyService.gets().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
              (compnaiesData:ApiObjectData)=>{
                this.companies = compnaiesData.returnData as Company[];
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
    if (this.companyId == 0)
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
          this.companyService.remove(this.companyId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
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
              this.companies = this.companies.filter(cat=> cat.id!=this.companyId);
              this.companyId=0;
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
