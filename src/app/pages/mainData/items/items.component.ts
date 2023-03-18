import { takeUntil } from 'rxjs/operators';
import { Item } from './../../../core/models/st/item';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base/base.component';
import { Category } from 'src/app/core/models/st/category';
import DataGrid from 'devextreme/ui/data_grid';
import { BaseService } from 'src/app/core/services/base/base.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/core/services/base/alert.service';
import { ItemService } from 'src/app/core/services/st/item.service';
import { ApiObjectData } from 'src/app/core/models/apiObjectData';

@Component({
  selector: 'items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent extends BaseComponent implements OnInit {
  itemId = 0;
  height = 0;
  dataGridInstance: DataGrid;
  items: Item[];
  item: Item;
  category: Category[];
  constructor(
    private itemService: ItemService,
    public baseService: BaseService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { super(); }

  ngOnInit(): void {
    this.height = window.innerHeight - 312;
    this.loadData();
  }

  loadData() {
    this.route.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      data => {
        this.items = data.items.returnData;
        // this.itemTypes = data.itemTypes.returnData;
        // this.itemUnit = data.itemUnit.returnData;
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
    this.dataGridInstance.deleteRow(
      this.dataGridInstance.getRowIndexByKey(this.itemId)
    );
  }

  removeItem(ev) {
    const promise = new Promise<void>((resolve, reject) => {
      this.itemService.remove(ev.key).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (apiObjectData: any) => {
          this.alertService.message(apiObjectData.message);
          if (apiObjectData.message.type === 'Success') {
            this.itemId = 0;
            resolve();
          } else {
            reject();
          }
        },
        error => {
          console.log(error);
          reject();
        }
      );
    });
    ev.cancel = promise;
  }


}
