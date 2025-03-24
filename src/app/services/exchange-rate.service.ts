import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  private apiKey = '05b8520c971ffa18755ef5ab'; 
  private apiUrl = `https://v6.exchangerate-api.com/v6/${this.apiKey}/latest/`;

  constructor(private http: HttpClient) {}

  getExchangeRates(baseCurrency: string): Observable<{ [key: string]: number }> {
    return this.http.get<any>(`${this.apiUrl}${baseCurrency}`).pipe(
      map(response => response.conversion_rates), // Prendiamo solo il campo con i tassi di cambio
      catchError(error => {
        console.error('Errore nel recupero dei tassi di cambio:', error);
        throw error;
      })
    );
  }
  getLastUpdate(baseCurrency: string): Observable<string> {
    return this.http.get<any>(`${this.apiUrl}${baseCurrency}`).pipe(
      map(response => response.time_last_update_utc), // Estrai la data di aggiornamento
      catchError(error => {
        console.error('Errore nel recupero della data di aggiornamento:', error);
        throw error;
      })
    );
  }
  
}
