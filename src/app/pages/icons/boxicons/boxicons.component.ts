import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'boxicons',
  templateUrl: './boxicons.component.html',
  styleUrls: ['./boxicons.component.scss']
})
export class BoxiconsComponent implements OnInit {

  breadCrumbItems!: Array<{}>;

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Icons' },
      { label: 'Boxicons', active: true }
    ];
  }

}
