import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RatesService {
  private urlapi = 'https://api.exchangeratesapi.io/latest';
  private myRatesApi = 'https://api-base.herokuapp.com/api/pub/rates';

  constructor(
    private http: HttpClient) { }

  public getCurrentEuroRates() {
    const currencies = 'USD,GBP,CHF,JPY';
    const url = `${this.urlapi}?symbols=${currencies}`;
    return this.http.get(url);
  }

  public postRates(rate: any) {
    return this.http.post(this.myRatesApi, rate);
  }

  public deleteMyRates() {
    return this.http.delete(this.myRatesApi);
  }

  public testGet(url: string){
    return this.http.get(url);
  }

}
