import { UploadService } from './../../../core/services/bs/upload.service';
import { ItemPhotoService } from './../../../core/services/st/item-photo.service';
import { takeUntil } from 'rxjs/operators';
import { Item } from './../../../core/models/st/item';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../base/base/base.component';
import { Category } from 'src/app/core/models/st/category';
import DataGrid from 'devextreme/ui/data_grid';
import { BaseService } from 'src/app/core/services/base/base.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/base/alert.service';
import { ItemService } from 'src/app/core/services/st/item.service';
import { ApiObjectData } from 'src/app/core/models/apiObjectData';
import { Brand } from 'src/app/core/models/st/brand';
import { DxoGridComponent } from 'devextreme-angular/ui/nested';
import { ItemPhoto } from 'src/app/core/models/st/itemPhoto';
import { TranslateService } from '@ngx-translate/core';

declare var require;
const Swal = require('sweetalert2');

@Component({
  selector: 'items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent extends BaseComponent implements OnInit {
  @ViewChild('gridItems', { static: false }) gridItems: DxoGridComponent;
  itemId = 0;
  height = 0;
  dataGridInstance: DataGrid;
  items: Item[];
  item: Item;
  categories: Category[];
  brands: Brand[];
  itemsPhoto: ItemPhoto[];
  itemPhoto = {} as ItemPhoto;
  photoId: number = 0;
  forAddPic: boolean = false;
  downloads: any[];
  file: File = null;
  userScreens: any;
  constructor(
    private itemService: ItemService,
    public baseService: BaseService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private itemPhotoService: ItemPhotoService,
    private uploadService: UploadService,
    private translate: TranslateService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.height = window.innerHeight - 312;
    this.loadData();
  }

  loadData() {
    this.userScreens = localStorage.getItem('userScreens');
    this.route.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (data) => {
        this.items = data.items.returnData;
        this.categories = data.categories.returnData;
        this.brands = data.brands.returnData;
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
      this.item = e.selectedRowsData[0];
    } else {
      this.itemId = 0;
    }
  }

  addItem() {
    this.router.navigateByUrl('/page/item/add/0', { skipLocationChange: true });
  }

  editItem() {
    this.router.navigateByUrl('/page/item/edit/' + this.itemId, {
      skipLocationChange: true,
    });
  }
}
