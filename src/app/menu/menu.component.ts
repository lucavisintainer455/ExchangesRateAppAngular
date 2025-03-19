import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import {EventEmitter, Input, Output } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectModule,DropdownModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() selectedCurrency: string = 'USD';
  @Output() selectedCurrencyChange = new EventEmitter<string>();
  currencies: { code: string }[] = [];

  ngOnInit() {
    this.currencies = [
      { code: 'USD' }, { code: 'EUR' }, { code: 'GBP' }, { code: 'INR' },
      { code: 'AUD' }, { code: 'CHF' }, { code: 'JPY' }, { code: 'CAD' },
      { code: 'CNY' }, { code: 'SEK' }, { code: 'HKD' }, { code: 'KRW' },
      { code: 'NZD' }, { code: 'SEK' }, { code: 'NOK' }, { code: 'MXN' },
      { code: 'BRL' }, { code: 'RUB' }, { code: 'ZAR' }, { code: 'TRY' },
      { code: 'TWD' }, { code: 'PLN' }, { code: 'THB' }, { code: 'IDR' },
      { code: 'DKK' }, { code: 'MYR' }, { code: 'HUF' }, { code: 'CZK' },
      { code: 'ILS' }, { code: 'PHP' }, { code: 'AED' }, { code: 'COP' },
      { code: 'SAR' }, { code: 'CLP' }, { code: 'PEN' }, { code: 'PKR' },
      { code: 'EGP' }, { code: 'VND' }, { code: 'BDT' }, { code: 'NGN' },
      { code: 'UAH' }, { code: 'KZT' }, { code: 'QAR' }, { code: 'ARS' },
      { code: 'DOP' }, { code: 'LKR' }, { code: 'OMR' }, { code: 'RON' },
      { code: 'JMD' }, { code: 'BHD' }, { code: 'KES' }, { code: 'BND' },
      { code: 'GHS' }, { code: 'TZS' }, { code: 'MMK' }, { code: 'UGX' },
      { code: 'BOB' }, { code: 'MUR' }, { code: 'HRK' }, { code: 'BAM' },
      { code: 'MOP' }, { code: 'MDL' }, { code: 'AFN' }, { code: 'AOA' },
      { code: 'MZN' }, { code: 'BWP' }, { code: 'ETB' }, { code: 'NAD' },
      { code: 'XOF' }, { code: 'XAF' }, { code: 'GEL' }, { code: 'BSD' },
      { code: 'BBD' }, { code: 'ALL' }, { code: 'AMD' }, { code: 'ANG' },
      { code: 'AWG' }, { code: 'AZN' }, { code: 'BZD' }, { code: 'CDF' },
      { code: 'CUP' }, { code: 'DJF' }, { code: 'ERN' }, { code: 'FKP' },
      { code: 'FJD' }, { code: 'GMD' }, { code: 'GNF' }, { code: 'GTQ' },
      { code: 'GYD' }, { code: 'HNL' }, { code: 'HTG' }, { code: 'IQD' },
      { code: 'IRR' }, { code: 'ISK' }, { code: 'JOD' }, { code: 'KGS' },
      { code: 'KHR' }, { code: 'KMF' }, { code: 'KWD' }, { code: 'KYD' },
      { code: 'LAK' }, { code: 'LBP' }, { code: 'LRD' }, { code: 'LSL' },
      { code: 'LYD' }, { code: 'MAD' }, { code: 'MRU' }, { code: 'MWK' },
      { code: 'NIO' }, { code: 'NPR' }, { code: 'PGK' }, { code: 'PYG' },
      { code: 'RSD' }, { code: 'RWF' }, { code: 'SBD' }, { code: 'SCR' },
      { code: 'SDG' }, { code: 'SHP' }, { code: 'SLL' }, { code: 'SOS' },
      { code: 'SRD' }, { code: 'SSP' }, { code: 'STN' }, { code: 'SYP' },
      { code: 'SZL' }, { code: 'TJS' }, { code: 'TMT' }, { code: 'TND' },
      { code: 'TOP' }, { code: 'TTD' }, { code: 'VES' }, { code: 'VUV' },
      { code: 'WST' }, { code: 'XCD' }, { code: 'XDR' }, { code: 'XPF' },
      { code: 'YER' }, { code: 'ZMW' }, { code: 'ZWL' }
    ];
  }

  onCurrencyChange(newCurrency: string) {
    this.selectedCurrency = newCurrency;
    this.selectedCurrencyChange.emit(this.selectedCurrency);
  }
}  
