import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { ExchangeRateService } from '../services/exchange-rate.service'; // Importa il servizio



@Component({
  selector: 'app-descrizione-preferito',
  standalone: true,
  imports: [
    CommonModule, RouterLink, FormsModule, 
    CardModule, ButtonModule, InputTextModule, DividerModule
  ],
  templateUrl: './descrizione-preferito.component.html',
  styleUrls: ['./descrizione-preferito.component.css']
})
export class DescrizionePreferitoComponent implements OnInit {
  favorite: any;
  isEditing: boolean = false;
  editedDescription: string = '';
  currencyImageFrom: string = '';
  currencyImageTo: string = '';

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private exchangeRateService: ExchangeRateService // Aggiunto il servizio
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const favoriteData = history.state.favorite;
      if (favoriteData) {
        this.favorite = favoriteData;
        this.editedDescription = this.favorite.description || '';
  
        this.currencyImageFrom = `https://wise.com/web-art/assets/flags/${this.favorite.from.toLowerCase()}.svg`;
        this.currencyImageTo = `https://wise.com/web-art/assets/flags/${this.favorite.to.toLowerCase()}.svg`;
  
        // Recupera il tasso di cambio attuale
        this.fetchCurrentExchangeRate();
      }
    });
  }
// Funzione per ottenere il tasso di cambio attuale
fetchCurrentExchangeRate() {
  fetch(`https://api.exchangerate-api.com/v4/latest/${this.favorite.from}`)
    .then(response => response.json())
    .then(data => {
      const rate = data.rates[this.favorite.to];
      if (rate) {
        // ✅ Mantiene fino a 4 decimali, senza zeri inutili
        this.favorite.rate = Number(rate.toFixed(4)).toString();
      } else {
        this.favorite.rate = 'N/A';
      }
    })
    .catch(error => console.error("Errore nel recupero del tasso di cambio:", error));
}


  fetchExchangeRate(): void {
    if (!this.favorite) return;

    this.exchangeRateService.getExchangeRates(this.favorite.from).subscribe(
      rates => {
        if (rates && rates[this.favorite.to]) {
          this.favorite.rate = rates[this.favorite.to]; // Imposta il tasso di cambio attuale
        } else {
          this.favorite.rate = 'N/A'; // Se il tasso non è disponibile
        }
      },
      error => {
        console.error('Errore nel caricamento del tasso di cambio:', error);
        this.favorite.rate = 'N/A';
      }
    );
  }

  startEditing(): void {
    this.isEditing = true;
  }

  saveFavorite(): void {
    if (!this.favorite) return;
  
    this.favorite.description = this.editedDescription;
    this.favorite.lastModifiedDate = new Date().toISOString();
  
    // ✅ Salva anche il tasso attuale nel preferito
    this.favorite.savedRate = this.favorite.rate ? parseFloat(this.favorite.rate).toString() : 'N/A';
  
    const storedFavorites: any[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = storedFavorites.findIndex(fav => fav.from === this.favorite.from && fav.to === this.favorite.to);
    if (index !== -1) {
      storedFavorites[index] = this.favorite;
    } else {
      storedFavorites.push(this.favorite);
    }
  
    localStorage.setItem('favorites', JSON.stringify(storedFavorites));
    this.isEditing = false;
  }
  
}
