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
  selectedCurrencyFrom: string = 'USD';  
  selectedCurrencyTo: string = 'EUR';   
  exchangeRate: number = 1.1;
  
  // Funzione di conversione
  convertCurrency() {
    if (this.amountFrom !== undefined && !isNaN(this.amountFrom)) {
      this.convertedAmount = this.amountFrom * this.exchangeRate;
    } else {
      this.convertedAmount = undefined;
    }
  }

  // ✅ Funzione per scambiare le valute
  swapCurrencies() {
    console.log("Scambio valute:", this.selectedCurrencyFrom, "<->", this.selectedCurrencyTo);
    
    [this.selectedCurrencyFrom, this.selectedCurrencyTo] = [this.selectedCurrencyTo, this.selectedCurrencyFrom];

    // Aggiorniamo anche il tasso di cambio (esempio: inverso)
    this.exchangeRate = 1 / this.exchangeRate;

    this.convertCurrency(); // Ricalcola l'importo dopo lo scambio

  }
}
