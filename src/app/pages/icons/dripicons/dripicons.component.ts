import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dripicons',
  templateUrl: './dripicons.component.html',
  styleUrls: ['./dripicons.component.scss']
})
export class DripiconsComponent implements OnInit {

  breadCrumbItems!: Array<{}>;

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Icons' },
      { label: 'Dripicons', active: true }
    ];
  }

}
