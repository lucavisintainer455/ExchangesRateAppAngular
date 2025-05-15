// ✅ Importazioni Angular e librerie di PrimeNG necessarie per la UI e routing
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// ✅ Librerie PrimeNG UI
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { ChartModule } from 'primeng/chart'; // ✅ Per il grafico storico

// ✅ Servizio custom per i tassi di cambio
import { ExchangeRateService } from '../services/exchange-rate.service'; 

@Component({
  selector: 'app-descrizione-preferito',
  standalone: true,
  imports: [
    CommonModule, RouterLink, FormsModule, 
    CardModule, ButtonModule, InputTextModule, DividerModule,
    ChartModule // ✅ Usato per il grafico di tasso storico
  ],
  templateUrl: './descrizione-preferito.component.html',
  styleUrls: ['./descrizione-preferito.component.css']
})
export class DescrizionePreferitoComponent implements OnInit {

  // ✅ Stato interno del componente
  favorite: any;                     // Dati della valuta preferita
  isEditing: boolean = false;       // Modalità modifica descrizione
  editedDescription: string = '';   // Descrizione modificabile
  currencyImageFrom: string = '';   // Bandiera valuta origine
  currencyImageTo: string = '';     // Bandiera valuta destinazione
  chartData: any;                   // Dati per il grafico
  chartOptions: any;                // Opzioni per il grafico

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private exchangeRateService: ExchangeRateService 
  ) {}

  /**
   * ✅ ngOnInit
   * Recupera i dati passati tramite lo stato della route e inizializza il grafico
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const favoriteData = history.state.favorite;

      if (favoriteData) {
        this.favorite = favoriteData;
        this.editedDescription = this.favorite.description || '';

        // Costruzione delle URL per le bandiere delle valute
        this.currencyImageFrom = `https://wise.com/web-art/assets/flags/${this.favorite.from.toLowerCase()}.svg`;
        this.currencyImageTo = `https://wise.com/web-art/assets/flags/${this.favorite.to.toLowerCase()}.svg`;

        // Imposta il tasso corrente se non già disponibile
        this.favorite.currentRate = this.favorite.currentRate || this.favorite.exchangeRateAtAdd;

        this.initChart();
      }
    });
  }

  /**
   * ✅ Recupera il tasso di cambio aggiornato dall'API
   * Include gestione degli errori
   */
  fetchCurrentExchangeRate() {
    fetch(`https://api.exchangerate-api.com/v4/latest/${this.favorite.from}`)
      .then(response => response.json())
      .then(data => {
        const rate = data.rates[this.favorite.to];

        if (rate) {
          this.favorite.currentRate = this.formatExchangeRate(rate);
          this.updateLocalStorageWithNewRate(rate);
          this.initChart();
        } else {
          // Se non è disponibile il tasso di cambio per la valuta
          this.favorite.currentRate = 'N/A';
        }
      })
      .catch(error => console.error("Errore nel recupero del tasso di cambio:", error)); // ✅ Log errore
  }

  /**
   * ✅ Aggiorna il localStorage con il nuovo tasso di cambio
   */
  updateLocalStorageWithNewRate(newRate: number) {
    let storedFavorites: any[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = storedFavorites.findIndex(fav => fav.from === this.favorite.from && fav.to === this.favorite.to);

    if (index !== -1) {
      storedFavorites[index].currentRate = this.formatExchangeRate(newRate);
      storedFavorites[index].exchangeRateHistory.push(newRate);
      localStorage.setItem('favorites', JSON.stringify(storedFavorites));
    }
  }

  /**
   * ✅ Formatta il tasso di cambio come stringa
   */
  formatExchangeRate(rate: number): string {
    return rate.toString(); // Nessun arrotondamento per evitare perdita di precisione
  }

  /**
   * ✅ Abilita la modalità modifica della descrizione
   */
  startEditing(): void {
    this.isEditing = true;
  }

  /**
   * ✅ Salva la descrizione modificata e aggiorna localStorage
   */
  saveFavorite(): void {
    if (!this.favorite) return;

    this.favorite.description = this.editedDescription;
    this.favorite.lastModifiedDate = new Date().toUTCString();

    const storedFavorites: any[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = storedFavorites.findIndex(fav => fav.from === this.favorite.from && fav.to === this.favorite.to);

    if (index !== -1) {
      storedFavorites[index] = this.favorite;
      localStorage.setItem('favorites', JSON.stringify(storedFavorites));
    }

    this.isEditing = false;
  }

  /**
   * ✅ Inizializza il grafico dei tassi di cambio (dall’aggiunta a oggi)
   * Include fallback se mancano i dati
   */
  initChart() {
    if (!this.favorite || !this.favorite.exchangeRateAtAdd) {
      console.warn("Dati del grafico mancanti, impossibile inizializzare."); // ✅ Log warning
      return;
    }

    const initialRate = Number(this.favorite.exchangeRateAtAdd);
    const currentRate = this.favorite.currentRate ? Number(this.favorite.currentRate) : null;

    const labels = [
      this.formatDate(this.favorite.addedDate),
      currentRate ? this.formatDate(new Date().toISOString()) : null
    ];

    this.chartData = {
      labels: labels,
      datasets: [
        {
          data: currentRate ? [initialRate, currentRate] : [initialRate],
          fill: false,
          tension: 0.4,
          borderColor: '#42A5F5',
          pointBackgroundColor: '#42A5F5',
          pointRadius: 5
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: { ticks: { color: '#495057' }, grid: { color: '#ebedef' } },
        y: { ticks: { color: '#495057' }, grid: { color: '#ebedef' } }
      }
    };
  }

  /**
   * ✅ Formatta una data ISO in formato locale (solo data, senza ora)
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

}
