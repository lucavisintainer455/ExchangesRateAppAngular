import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import {EventEmitter, Input, Output } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-menu-paesi',
  imports: [CommonModule, FormsModule, DropdownModule],
  templateUrl: './menu-paesi.component.html',
  styleUrl: './menu-paesi.component.css'
})
export class MenuPaesiComponent implements OnInit {
  @Input() selectedCurrency!: { code: string };
  @Output() selectedCurrencyChange = new EventEmitter<{ code: string }>();

  currencies: { code: string }[] = [];


ngOnInit() {
  //lista paesi
  this.currencies = [
    { code: 'USD' }, { code: 'EUR' }, { code: 'GBP' }, { code: 'INR' },
    { code: 'AUD' }, { code: 'CHF' }, { code: 'JPY' }, { code: 'CAD' },

  ];

    this.currencies = [
      { code: 'USD' }, { code: 'EUR' }, { code: 'GBP' }, { code: 'INR' },
      { code: 'AUD' }, { code: 'CHF' }, { code: 'JPY' }, { code: 'CAD' },

    ];

    // Imposta la valuta selezionata se non è già stata passata
    if (!this.selectedCurrency) {
      this.selectedCurrency = this.currencies.find(c => c.code === 'EUR') || this.currencies[0];
    }
  }

  onCurrencyChange(newCurrency: { code: string }) {
    this.selectedCurrency = newCurrency;
    this.selectedCurrencyChange.emit(newCurrency);
  }
}
