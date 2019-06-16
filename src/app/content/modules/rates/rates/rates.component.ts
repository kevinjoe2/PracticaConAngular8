import { Component, OnInit, OnDestroy } from '@angular/core';

import { RatesService } from '../../../../core/rates/rates.service';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css']
})
export class RatesComponent implements OnInit, OnDestroy {
  public currentEuroRates: any = null;
  public postCurrent: any = null;
  public deleteCurrent: any = null;

  constructor(private svc: RatesService) { }

  ngOnInit() {
    this.getCurrentEuroRates();
  }
  ngOnDestroy(): void {
  }

  getCurrentEuroRates(){
    this.svc.getCurrentEuroRates()
    .subscribe(
      res => this.currentEuroRates = res
    );
  }

  postRates(){
    const rates = this.transformData();
    rates.forEach(rate =>
      this.svc.postRates(rate).subscribe(rest=> this.postCurrent = rest)
    );
    
  }

  private transformData() {
    const current = this.currentEuroRates.rates;
    return Object.keys(current).map(key => ({
      date: this.currentEuroRates.date,
      currency: key,
      euros: current[key]
    }));
  }

  deleteMyRates() {
    this.svc.deleteMyRates().subscribe(
      res => this.deleteCurrent = res
    );
  }

  throwError(){
    throw new Error('My Pretty Error');
  }

  throwHttpError(){
    this.svc.testGet("urlHere").subscribe();
  }

}
