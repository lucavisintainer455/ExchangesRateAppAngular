import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.scss'],
  imports: [CommonModule]
})
export class CurrencySelectorComponent {
  @Input() selectedCurrency: string = 'EUR';
  @Output() selectedCurrencyChange = new EventEmitter<string>();

  currencies = ['USD', 'EUR', 'GBP', 'CHF', 'JPY'];

  onCurrencyChange(event: any) {
    this.selectedCurrencyChange.emit(event.target.value);
  }
}
