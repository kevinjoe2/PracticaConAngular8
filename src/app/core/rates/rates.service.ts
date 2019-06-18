import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RatesService {
  private urlapi = 'https://api.exchangeratesapi.io/latest';
  private myRatesApi = 'https://api-base.herokuapp.com/api/pub/rates';
  private baseUrl = 'http://localhost:8080/midas-oro-rest/resources/';

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

  public findAllAbonos(){
    return this.http.get(this.baseUrl + 'abonoRestController/listAllEntities?page=1&pageSize=10&sortFields=id&sortDirections=asc&isPaginated=N');
  }

  public findAllAbonosPage(
    page:string,pageSize:string,
    sortFields:string,sortDirections:string,
    isPaginated:string){

      let params = new HttpParams()
      .set('page', page ? page : '')
      .set('pageSize', pageSize ? pageSize : '')
      .set('sortFields', sortFields ? sortFields : '')
      .set('sortDirections', sortDirections ? sortDirections : '')
      .set('isPaginated', isPaginated ? isPaginated : '')

      return this.http.get(this.baseUrl + 'abonoRestController/listAllEntities', {params});
  }

}
