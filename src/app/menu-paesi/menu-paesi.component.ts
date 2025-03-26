import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-menu-paesi',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule],
  templateUrl: './menu-paesi.component.html',
  styleUrls: ['./menu-paesi.component.css']
})
export class MenuPaesiComponent implements OnInit {
  @Input() selectedCurrency!: { code: string };
  @Output() selectedCurrencyChange = new EventEmitter<{ code: string }>();

  paesiValute: { paese: string, code: string , flag: string}[] = [];

  ngOnInit() {
    this.paesiValute = [
      { paese: 'Afghanistan', code: 'AFN', flag: 'af' },
      { paese: 'Albania', code: 'ALL', flag: 'al' },
      { paese: 'Algeria', code: 'DZD', flag: 'dz' },
      { paese: 'Andorra', code: 'EUR', flag: 'ad' },
      { paese: 'Angola', code: 'AOA', flag: 'ao' },
      { paese: 'Argentina', code: 'ARS', flag: 'ar' },
      { paese: 'Armenia', code: 'AMD', flag: 'am' },
      { paese: 'Australia', code: 'AUD', flag: 'au' },
      { paese: 'Austria', code: 'EUR', flag: 'at' },
      { paese: 'Azerbaigian', code: 'AZN', flag: 'az' },
      { paese: 'Bahamas', code: 'BSD', flag: 'bs' },
      { paese: 'Bahrain', code: 'BHD', flag: 'bh' },
      { paese: 'Bangladesh', code: 'BDT', flag: 'bd' },
      { paese: 'Barbados', code: 'BBD', flag: 'bb' },
      { paese: 'Belgio', code: 'EUR', flag: 'be' },
      { paese: 'Belize', code: 'BZD', flag: 'bz' },
      { paese: 'Benin', code: 'XOF', flag: 'bj' },
      { paese: 'Bhutan', code: 'BTN', flag: 'bt' },
      { paese: 'Bolivia', code: 'BOB', flag: 'bo' },
      { paese: 'Bosnia ed Erzegovina', code: 'BAM', flag: 'ba' },
      { paese: 'Botswana', code: 'BWP', flag: 'bw' },
      { paese: 'Brasile', code: 'BRL', flag: 'br' },
      { paese: 'Brunei', code: 'BND', flag: 'bn' },
      { paese: 'Bulgaria', code: 'BGN', flag: 'bg' },
      { paese: 'Burkina Faso', code: 'XOF', flag: 'bf' },
      { paese: 'Burundi', code: 'BIF', flag: 'bi' },
      { paese: 'Canada', code: 'CAD', flag: 'ca' },
      { paese: 'Cile', code: 'CLP', flag: 'cl' },
      { paese: 'Cina', code: 'CNY', flag: 'cn' },
      { paese: 'Colombia', code: 'COP', flag: 'co' },
      { paese: 'Congo', code: 'XAF', flag: 'cg' },
      { paese: 'Corea del Sud', code: 'KRW', flag: 'kr' },
      { paese: 'Cuba', code: 'CUP', flag: 'cu' },
      { paese: 'Danimarca', code: 'DKK', flag: 'dk' },
      { paese: 'Egitto', code: 'EGP', flag: 'eg' },
      { paese: 'Emirati Arabi Uniti', code: 'AED', flag: 'ae' },
      { paese: 'Estonia', code: 'EUR', flag: 'ee' },
      { paese: 'Etiopia', code: 'ETB', flag: 'et' },
      { paese: 'Fiji', code: 'FJD', flag: 'fj' },
      { paese: 'Filippine', code: 'PHP', flag: 'ph' },
      { paese: 'Finlandia', code: 'EUR', flag: 'fi' },
      { paese: 'Francia', code: 'EUR', flag: 'fr' },
      { paese: 'Germania', code: 'EUR', flag: 'de' },
      { paese: 'Giappone', code: 'JPY', flag: 'jp' },
      { paese: 'Grecia', code: 'EUR', flag: 'gr' },
      { paese: 'India', code: 'INR', flag: 'in' },
      { paese: 'Indonesia', code: 'IDR', flag: 'id' },
      { paese: 'Irlanda', code: 'EUR', flag: 'ie' },
      { paese: 'Islanda', code: 'ISK', flag: 'is' },
      { paese: 'Israele', code: 'ILS', flag: 'il' },
      { paese: 'Italia', code: 'EUR', flag: 'it' },
      { paese: 'Jamaica', code: 'JMD', flag: 'jm' },
      { paese: 'Kazakistan', code: 'KZT', flag: 'kz' },
      { paese: 'Kenya', code: 'KES', flag: 'ke' },
      { paese: 'Libano', code: 'LBP', flag: 'lb' },
      { paese: 'Lussemburgo', code: 'EUR', flag: 'lu' },
      { paese: 'Madagascar', code: 'MGA', flag: 'mg' },
      { paese: 'Malawi', code: 'MWK', flag: 'mw' },
      { paese: 'Malesia', code: 'MYR', flag: 'my' },
      { paese: 'Messico', code: 'MXN', flag: 'mx' },
      { paese: 'Marocco', code: 'MAD', flag: 'ma' },
      { paese: 'Norvegia', code: 'NOK', flag: 'no' },
      { paese: 'Nuova Zelanda', code: 'NZD', flag: 'nz' },
      { paese: 'Paesi Bassi', code: 'EUR', flag: 'nl' },
      { paese: 'Pakistan', code: 'PKR', flag: 'pk' },
      { paese: 'Panama', code: 'PAB', flag: 'pa' },
      { paese: 'Perù', code: 'PEN', flag: 'pe' },
      { paese: 'Portogallo', code: 'EUR', flag: 'pt' },
      { paese: 'Regno Unito', code: 'GBP', flag: 'gb' },
      { paese: 'Russia', code: 'RUB', flag: 'ru' },
      { paese: 'Svezia', code: 'SEK', flag: 'se' },
      { paese: 'Svizzera', code: 'CHF', flag: 'ch' },
      { paese: 'Thailandia', code: 'THB', flag: 'th' },
      { paese: 'Turchia', code: 'TRY', flag: 'tr' },
      { paese: 'Ucraina', code: 'UAH', flag: 'ua' },
      { paese: 'Ungheria', code: 'HUF', flag: 'hu' },
      { paese: 'USA', code: 'USD', flag: 'us' },
      { paese: 'Venezuela', code: 'VES', flag: 've' },
      { paese: 'Vietnam', code: 'VND', flag: 'vn' }
    ];
  }
  

  onPaeseChange(newSelection: { paese: string, code: string }) {
    this.selectedCurrency = { code: newSelection.code };
    this.selectedCurrencyChange.emit(this.selectedCurrency);
  }
}
