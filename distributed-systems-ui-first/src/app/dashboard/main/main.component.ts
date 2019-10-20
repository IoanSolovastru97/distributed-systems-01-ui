import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './main.component.html',
  styles: [
    `
      .main--container {
        padding-top: 5rem;
      }
    `
  ]
})
export class DashboardMainComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
