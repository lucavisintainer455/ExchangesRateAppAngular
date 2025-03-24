import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuComponent } from "../menu/menu.component";
import { InputValutaComponent } from "../input-valuta/input-valuta.component";
import { InputNumberModule } from 'primeng/inputnumber'; 
import { FormsModule } from '@angular/forms';
import { ExchangeRateService } from '../services/exchange-rate.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet, MenuComponent, InputValutaComponent,InputNumberModule,FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
}) 
export class HomeComponent {
  amountFrom: number = 1;
  amountTo: number | undefined;
  selectedCurrencyFrom = { code: 'EUR' };
  selectedCurrencyTo = { code: 'USD' };
  exchangeRate: number = 1; 
  exchangeRates: { [key: string]: number } = {};

  constructor(private exchangeRateService: ExchangeRateService) {
    this.fetchExchangeRates();
  }

  fetchExchangeRates() {
    this.exchangeRateService.getExchangeRates(this.selectedCurrencyFrom.code).subscribe(
      rates => {
        this.exchangeRates = rates;
        this.updateExchangeRate();
        this.convertCurrency();
      },
      error => {
        console.error('Errore nel caricamento dei tassi di cambio:', error);
      }
    );
  }

  convertCurrencyFromLeft(value: number) {
    this.amountFrom = value;
    this.updateExchangeRate();
    this.amountTo = this.amountFrom * this.exchangeRate;
  }

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

  swapCurrencies() {
    [this.selectedCurrencyFrom, this.selectedCurrencyTo] = [this.selectedCurrencyTo, this.selectedCurrencyFrom];
    [this.amountFrom, this.amountTo] = [this.amountTo || 0, this.amountFrom || 0];
    this.fetchExchangeRates();
  }

  convertCurrency() {
    this.updateExchangeRate();
    this.amountTo = this.amountFrom * this.exchangeRate;
  }
}