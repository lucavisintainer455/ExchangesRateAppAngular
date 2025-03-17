import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CurrencySelectorComponent } from '../currency-selector/currency-selector.component';
import { ExchangeRateService } from '../currency-converter/exchange-rate.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencySelectorComponent,RouterLink,RouterOutlet],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.css'
})


export class CurrencyConverterComponent {
  amount: number = 1;
  fromCurrency: string = 'USD';
  toCurrency: string = 'EUR';
  convertedAmount: number = 0;

  constructor(private exchangeRateService: ExchangeRateService) {}

  convertCurrency() {
    if (!this.amount || this.amount <= 0) {
      this.convertedAmount = 0;
      return;
    }

    this.exchangeRateService.getExchangeRate(this.fromCurrency).subscribe(data => {
      const rate = data.rates[this.toCurrency];
      this.convertedAmount = this.amount * rate;
    });
  }
}
