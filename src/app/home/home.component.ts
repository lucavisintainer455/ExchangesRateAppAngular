import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuComponent } from "../menu/menu.component";
import { InputValutaComponent } from "../input-valuta/input-valuta.component";



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet, MenuComponent, InputValutaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  amountFrom: number | undefined;
  convertedAmount: number | undefined;
  selectedCurrencyFrom: string = 'USD';  
  selectedCurrencyTo: string = 'EUR';   
  exchangeRate: number = 1.1;
  
  convertCurrency() {
      if (this.amountFrom !== undefined && !isNaN(this.amountFrom)) {
          this.convertedAmount = this.amountFrom * this.exchangeRate;
      } else {
          this.convertedAmount = undefined; // Evita null
      }
  }
}


