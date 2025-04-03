import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  private apiUrl = `${environment.apiUrl}/${environment.apiKey}/latest`;

  constructor(private http: HttpClient) {}

  getExchangeRates(baseCurrency: string): Observable<{ [key: string]: number }> {
    return this.http.get<any>(`${this.apiUrl}/${baseCurrency}`).pipe(
      map(response => response.conversion_rates),
      catchError(error => {
        console.error('Errore nel recupero dei tassi di cambio:', error);
        throw error;
      })
    );
  }

  getLastUpdate(baseCurrency: string): Observable<string> {
    return this.http.get<any>(`${this.apiUrl}/${baseCurrency}`).pipe(
      map(response => response.time_last_update_utc),
      catchError(error => {
        console.error('Errore nel recupero della data di aggiornamento:', error);
        throw error;
      })
    );
  }
}
