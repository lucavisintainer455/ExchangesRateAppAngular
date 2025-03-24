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
  amountFrom: number = 1;  // Imposta di default 1 EUR
  amountTo: number | undefined;
  selectedCurrencyFrom = { code: 'EUR' };  // Impostiamo come oggetto
  selectedCurrencyTo = { code: 'USD' };    // Impostiamo come oggetto
  exchangeRate: number = 1.087; // EUR -> USD

  exchangeRates: { [key: string]: number } = {
    'USD': 1, 'EUR': 0.92, 'GBP': 0.78, 'JPY': 150.34
  };

  constructor() {
    this.convertCurrency();
  }

  // Conversione da sinistra (utente modifica "amountFrom")
  convertCurrencyFromLeft(value: number) {
    this.amountFrom = value;
    this.updateExchangeRate();
    this.amountTo = this.amountFrom * this.exchangeRate;
  }

  // Conversione da destra (utente modifica "amountTo")
  convertCurrencyFromRight(value: number) {
    this.amountTo = value;
    this.updateExchangeRate();
    this.amountFrom = this.amountTo / this.exchangeRate;
  }

  updateExchangeRate() {
    const fromRate = this.exchangeRates[this.selectedCurrencyFrom.code] || 1;
    const toRate = this.exchangeRates[this.selectedCurrencyTo.code] || 1;
    this.exchangeRate = toRate / fromRate;
  }

  // Swap delle valute e aggiornamento
  swapCurrencies() {
    [this.selectedCurrencyFrom, this.selectedCurrencyTo] = [this.selectedCurrencyTo, this.selectedCurrencyFrom];
    [this.amountFrom, this.amountTo] = [this.amountTo || 0, this.amountFrom || 0]; // Swap dei valori
    this.convertCurrency(); // Aggiorna i valori
  }

  convertCurrency() {
    this.updateExchangeRate();
    this.amountTo = this.amountFrom * this.exchangeRate;
  }
}
