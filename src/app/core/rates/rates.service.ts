import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class RatesService {
  private urlapi = 'https://api.exchangeratesapi.io/latest';
  private myRatesApi = 'https://api-base.herokuapp.com/api/pub/rates';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  public getCurrentEuroRates() {
    const currencies = 'USD,GBP,CHF,JPY';
    const url = `${this.urlapi}?symbols=${currencies}`;
    return this.http.get(url).pipe(
      tap(_ => this.log('conseguidos')),
      catchError(this.handleError<any>('getCurrentEuroRates', []))
    );
  }

  public postRates(rate: any) {
    return this.http.post(this.myRatesApi, rate).pipe(
      tap(_ => this.log('conseguidos')),
      catchError(this.handleError<any>('getCurrentEuroRates', []))
    )
  }

  public deleteMyRates() {
    return this.http.delete(this.myRatesApi);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
