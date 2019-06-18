import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatesRoutingModule } from './rates-routing.module';
import { RatesComponent } from './rates/rates.component';

import { HttpClientModule  } from '@angular/common/http';

// ANGULAR MATERIAL
import { 
  MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, 
  MatSortModule, MatTableModule, MatListModule, MatSidenavModule,
  MatToolbarModule } from "@angular/material";
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    RatesComponent
  ],
  imports: [
    CommonModule,
    RatesRoutingModule,
    HttpClientModule,
    // ANGULAR MATERIAL
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule
  ]
})
export class RatesModule { }
