import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuComponent } from "../menu/menu.component";
import { InputValutaComponent } from "../input-valuta/input-valuta.component";
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { ExchangeRateService } from '../services/exchange-rate.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuPaesiComponent } from "../menu-paesi/menu-paesi.component";

// Modello per i preferiti
interface Favorite {
  from: string;
  to: string;
  description: string;
  addedDate: string;
  lastModifiedDate: string;
  exchangeRateAtAdd: number;
  exchangeRateHistory: number[];
  currentRate?: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet, MenuComponent, InputValutaComponent, InputNumberModule, FormsModule, CommonModule, ButtonModule, MenuPaesiComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  amountFrom: number = 1;
  amountTo: number | undefined;
  selectedCurrencyFrom = { code: 'EUR' };
  selectedCurrencyTo = { code: 'USD' };
  exchangeRate: number = 1;
  exchangeRates: { [key: string]: number } = {};
  favorites: Favorite[] = [];
  useCountryMode: boolean = false;
  tickerRates: { currency: string, value: number }[] = [];

  constructor(private exchangeRateService: ExchangeRateService) {
    this.loadExchangeRates(); // Carica i tassi di cambio iniziali
    this.loadFavorites(); // Carica i preferiti salvati nel localStorage
  }

  loadExchangeRates() {
    const savedRates = localStorage.getItem('exchangeRates');
    const savedDate = localStorage.getItem('exchangeRatesDate');
    const today = new Date().toISOString().split('T')[0];
    
    // Mostra la barra ticker subito, anche se i tassi non sono stati ancora caricati
    this.tickerRates = [{ currency: 'Loading...', value: 0 }];
    
    // Se i tassi sono già nel localStorage e sono aggiornati, carica subito
    if (savedRates && savedDate === today) {
      this.exchangeRates = JSON.parse(savedRates);
      this.tickerRates = Object.keys(this.exchangeRates).map(currency => ({
        currency: currency,
        value: this.exchangeRates[currency]
      }));
    } else {
      // Se non ci sono tassi nel localStorage, fai la chiamata API in background
      this.fetchExchangeRates();
    }
  }
  
  

  // Funzione per recuperare i tassi di cambio da un servizio esterno
  fetchExchangeRates() {
    this.exchangeRateService.getExchangeRates(this.selectedCurrencyFrom.code).subscribe(
      rates => {
        this.exchangeRates = rates;
        this.tickerRates = Object.keys(rates).map(currency => ({
          currency: currency,
          value: rates[currency]
        }));
        this.saveExchangeRates(rates);  // Salva i tassi nel localStorage per il futuro
        this.updateExchangeRate();      // Aggiorna il tasso di cambio
        this.convertCurrency();         // Esegui la conversione delle valute
      },
      error => {
        console.error('Errore nel caricamento dei tassi di cambio:', error);
      }
    );
  }
  
  

  // Salva i tassi di cambio nel localStorage con la data di oggi
  saveExchangeRates(rates: { [key: string]: number }) {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('exchangeRates', JSON.stringify(rates));
    localStorage.setItem('exchangeRatesDate', today);
  }
  

  // Funzione per aggiungere un nuovo preferito
  addFavorite() {
    const newFavorite: Favorite = {
      from: this.selectedCurrencyFrom.code,
      to: this.selectedCurrencyTo.code,
      description: '',
      addedDate: new Date().toISOString(),
      lastModifiedDate: '',
      exchangeRateAtAdd: this.exchangeRate,
      exchangeRateHistory: [this.exchangeRate]
    };

    this.favorites.push(newFavorite);
    this.saveFavorites();
  }

  // Funzione per salvare i preferiti su localStorage
  saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
  

  // Funzione per caricare i preferiti da localStorage
  loadFavorites() {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }
  

  // Funzione per aggiornare un preferito (quando cambiano i tassi)
  updateFavoriteExchangeRate(favorite: Favorite) {
    favorite.exchangeRateHistory.push(this.exchangeRate);
    favorite.lastModifiedDate = new Date().toISOString();
    this.saveFavorites();
  }

  // Funzione per aggiornare il tasso di cambio
  updateExchangeRate() {
    const fromRate = this.exchangeRates[this.selectedCurrencyFrom.code] || 1;
    const toRate = this.exchangeRates[this.selectedCurrencyTo.code] || 1;
    this.exchangeRate = toRate / fromRate;
  }

  // Funzione per scambiare le valute (modifica la coppia valutaria)
  swapCurrencies() {
    [this.selectedCurrencyFrom, this.selectedCurrencyTo] = [this.selectedCurrencyTo, this.selectedCurrencyFrom];
    [this.amountFrom, this.amountTo] = [this.amountTo || 0, this.amountFrom || 0];
    this.fetchExchangeRates();
  }

  // Funzione per gestire la conversione da sinistra
  convertCurrencyFromLeft(value: number) {
    this.amountFrom = value;
    this.updateExchangeRate();
    this.amountTo = this.amountFrom * this.exchangeRate;
  }

  // Funzione per gestire la conversione da destra
  convertCurrencyFromRight(value: number) {
    this.amountTo = value;
    this.updateExchangeRate();
    this.amountFrom = this.amountTo / this.exchangeRate;
  }

  toggleFavorite() {
    const pair = { from: this.selectedCurrencyFrom.code, to: this.selectedCurrencyTo.code };
    const index = this.favorites.findIndex(fav => fav.from === pair.from && fav.to === pair.to);
  
    if (index > -1) {
      this.updateFavoriteExchangeRate(this.favorites[index]);
      this.favorites.splice(index, 1);
    } else {
      const newFavorite: Favorite = {
        from: pair.from,
        to: pair.to,
        exchangeRateAtAdd: this.exchangeRate,
        currentRate: this.exchangeRate,
        exchangeRateHistory: [this.exchangeRate],
        description: '',
        addedDate: new Date().toUTCString(),
        lastModifiedDate: new Date().toUTCString()
      };
  
      this.favorites.push(newFavorite);
      this.saveFavorites();
    }
  }
  

  // Funzione per controllare se una coppia di valute è nei preferiti
  isFavorite(): boolean {
    return this.favorites.some(fav => fav.from === this.selectedCurrencyFrom.code && fav.to === this.selectedCurrencyTo.code);
  }

  // Funzione per cambiare modalità (tra valuta e paese)
  toggleMode() {
    this.useCountryMode = !this.useCountryMode;
  }

  // Funzione per la conversione delle valute
  convertCurrency() {
    this.updateExchangeRate();
    this.amountTo = this.amountFrom * this.exchangeRate;
  }
}
