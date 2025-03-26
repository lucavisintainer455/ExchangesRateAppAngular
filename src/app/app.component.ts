import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { ExchangeRateService } from './services/exchange-rate.service';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InputNumberModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ExchangeRateApp';
  lastUpdate: string = 'Caricamento...';

  constructor(private exchangeRateService: ExchangeRateService) {
    this.fetchLastUpdate();
  }

  fetchLastUpdate() {
    this.exchangeRateService.getLastUpdate('EUR').subscribe(
      (date) => {
        const formattedDate = new Date(date).toLocaleString('en-GB', { timeZone: 'GMT' }) + ' GMT';
        this.lastUpdate = formattedDate;
      },
      (error) => {
        console.error('Errore nel recupero della data di aggiornamento:', error);
      }
    );
  }
}
