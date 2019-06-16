import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatesRoutingModule } from './rates-routing.module';
import { RatesComponent } from './rates/rates.component';

import { HttpClientModule  } from '@angular/common/http';

import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    RatesComponent
  ],
  imports: [
    CommonModule,
    RatesRoutingModule,
    HttpClientModule,
    MatButtonModule
  ]
})
export class RatesModule { }
