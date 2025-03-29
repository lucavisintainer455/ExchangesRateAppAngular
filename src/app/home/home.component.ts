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
import { StoricoComponent } from "../storico/storico.component";

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
  imports: [RouterLink, RouterOutlet, MenuComponent, InputValutaComponent, InputNumberModule, FormsModule, CommonModule, ButtonModule, MenuPaesiComponent, StoricoComponent],
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
  favorites: Favorite[] = []; // Array di preferiti
  useCountryMode: boolean = false; // Flag per controllare la modalità paese
  storicoInizializzato: boolean = false; // Flag per evitare inserimento iniziale

  constructor(private exchangeRateService: ExchangeRateService) {
    this.fetchExchangeRates(); // Carica i tassi di cambio iniziali
    this.loadFavorites(); // Carica i preferiti salvati nel localStorage
  }

  // Funzione per aggiungere un nuovo preferito
  addFavorite() {
    const newFavorite: Favorite = {
      from: this.selectedCurrencyFrom.code,
      to: this.selectedCurrencyTo.code,
      description: '', // inizialmente vuota
      addedDate: new Date().toISOString(), // Data di aggiunta
      lastModifiedDate: '', // inizialmente vuota
      exchangeRateAtAdd: this.exchangeRate, // ✅ Salva il tasso al momento dell'aggiunta
      exchangeRateHistory: [this.exchangeRate] // ✅ Cronologia dei tassi
    };

    // Aggiungi il nuovo preferito all'array
    this.favorites.push(newFavorite);
    this.saveFavorites(); // Salva i preferiti nel localStorage
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
    favorite.exchangeRateHistory.push(this.exchangeRate); // Aggiungi il nuovo tasso alla cronologia
    favorite.lastModifiedDate = new Date().toISOString(); // Aggiungi la data dell'ultima modifica
    this.saveFavorites(); // Salva i preferiti aggiornati nel localStorage
  }

  // Funzione per recuperare i tassi di cambio da un servizio esterno
  fetchExchangeRates() {
    this.exchangeRateService.getExchangeRates(this.selectedCurrencyFrom.code).subscribe(
      rates => {
        this.exchangeRates = rates;
        this.updateExchangeRate(); // Aggiorna il tasso di cambio
        this.convertCurrency(); // Effettua la conversione
        this.storicoInizializzato = true; // Impedisce inserimento iniziale
      },
      error => {
        console.error('Errore nel caricamento dei tassi di cambio:', error);
      }
    );
  }

  // Funzione per aggiornare il tasso di cambio
  updateExchangeRate() {
    const fromRate = this.exchangeRates[this.selectedCurrencyFrom.code] || 1;
    const toRate = this.exchangeRates[this.selectedCurrencyTo.code] || 1;
    this.exchangeRate = toRate / fromRate; // Calcola il tasso di cambio
  }

  // Funzione per scambiare le valute (modifica la coppia valutaria)
  swapCurrencies() {
    [this.selectedCurrencyFrom, this.selectedCurrencyTo] = [this.selectedCurrencyTo, this.selectedCurrencyFrom];
    [this.amountFrom, this.amountTo] = [this.amountTo || 0, this.amountFrom || 0];
    this.fetchExchangeRates();
    this.salvaStorico();
}

  // Funzione per gestire la conversione da sinistra
  convertCurrencyFromLeft(value: number) {
    this.amountFrom = value;
    this.updateExchangeRate();
    this.amountTo = this.amountFrom * this.exchangeRate;
    this.salvaStorico();
}

  // Funzione per gestire la conversione da destra
  convertCurrencyFromRight(value: number) {
    this.amountTo = value;
    this.updateExchangeRate();
    this.amountFrom = this.amountTo / this.exchangeRate;
    this.salvaStorico();
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
            description: '',  // ✅ Campo aggiunto, inizialmente vuoto
            addedDate: new Date().toUTCString(),  // ✅ Data di aggiunta in formato GMT
            lastModifiedDate: new Date().toUTCString() // ✅ Ultima modifica in formato GMT
        };

        this.favorites.push(newFavorite);
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
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

    // Salva nella cronologia
    const storicoEntry = {
      from: this.selectedCurrencyFrom.code,
      to: this.selectedCurrencyTo.code,
      amount: this.amountFrom,
      result: this.amountTo,
      date: new Date().toLocaleString()
    };

    // Aggiungi alla cronologia
    const storico = JSON.parse(localStorage.getItem('storico') || '[]');
    storico.push(storicoEntry);
    localStorage.setItem('storico', JSON.stringify(storico));
    this.salvaStorico();
  }

  // ✅ Aggiorna la cronologia senza duplicati
  salvaStorico() {
    if (!this.storicoInizializzato) return; // Evita inserimento iniziale

    const storicoEntry = {
      from: this.selectedCurrencyFrom.code,
      to: this.selectedCurrencyTo.code,
      amount: this.amountFrom,
      result: this.amountTo,
      date: new Date().toLocaleString()
    };

    const storico = JSON.parse(localStorage.getItem('storico') || '[]');

    // Evita duplicati consecutivi
    const lastEntry = storico[storico.length - 1];
    if (lastEntry &&
      lastEntry.from === storicoEntry.from &&
      lastEntry.to === storicoEntry.to &&
      lastEntry.amount === storicoEntry.amount &&
      lastEntry.result === storicoEntry.result) {
      return;
    }

    storico.push(storicoEntry);
    localStorage.setItem('storico', JSON.stringify(storico));
  }
}