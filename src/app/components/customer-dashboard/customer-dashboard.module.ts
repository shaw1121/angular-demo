import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CutomerDashboardComponent } from './cutomer-dashboard/cutomer-dashboard.component';

@NgModule({
  declarations: [CutomerDashboardComponent],
  exports: [
    CutomerDashboardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CustomerDashboardModule { }
