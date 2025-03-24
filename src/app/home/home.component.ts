import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuComponent } from "../menu/menu.component";
import { InputValutaComponent } from "../input-valuta/input-valuta.component";
import { InputNumberModule } from 'primeng/inputnumber'; 
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet, MenuComponent, InputValutaComponent,InputNumberModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
}) 
export class HomeComponent {
  amountFrom: number | undefined;
  convertedAmount: number | undefined;
  selectedCurrencyFrom = { code: 'EUR' };  
  selectedCurrencyTo = { code: 'USD' };   

  exchangeRate: number = 1.1;

  constructor() {
    this.amountFrom = 1; // Imposta un valore di default
    this.convertCurrency(); // Esegui la conversione iniziale
  }

  ngOnInit() {
    this.convertCurrency(); // Calcola subito la conversione iniziale
  }

  convertCurrency() {
    if (!this.selectedCurrencyFrom || !this.selectedCurrencyTo || this.amountFrom === undefined || isNaN(this.amountFrom)) {
      this.convertedAmount = 0;
      return;
    }

    const exchangeRates: { [key: string]: number } = {
      'USD': 1, 
      'EUR': 0.92, 
      'GBP': 0.78, 
      'JPY': 150.34
    };

    const fromRate = exchangeRates[this.selectedCurrencyFrom.code] || 1;
    const toRate = exchangeRates[this.selectedCurrencyTo.code] || 1;

    this.exchangeRate = toRate / fromRate;
    this.convertedAmount = this.amountFrom * this.exchangeRate;
  }

  swapCurrencies() {
    [this.selectedCurrencyFrom, this.selectedCurrencyTo] = [this.selectedCurrencyTo, this.selectedCurrencyFrom];
    this.convertCurrency();
  }
}
