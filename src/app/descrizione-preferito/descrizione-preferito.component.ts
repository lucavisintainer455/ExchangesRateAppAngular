import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { ChartModule } from 'primeng/chart'; // ✅ Importa ChartModule
import { ExchangeRateService } from '../services/exchange-rate.service'; 

@Component({
  selector: 'app-descrizione-preferito',
  standalone: true,
  imports: [
    CommonModule, RouterLink, FormsModule, 
    CardModule, ButtonModule, InputTextModule, DividerModule,
    ChartModule // ✅ Aggiunto qui
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
  chartData: any; // ✅ Dati per il grafico
  chartOptions: any;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private exchangeRateService: ExchangeRateService 
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
        const favoriteData = history.state.favorite;
        if (favoriteData) {
            this.favorite = favoriteData;
            this.editedDescription = this.favorite.description || '';

            this.currencyImageFrom = `https://wise.com/web-art/assets/flags/${this.favorite.from.toLowerCase()}.svg`;
            this.currencyImageTo = `https://wise.com/web-art/assets/flags/${this.favorite.to.toLowerCase()}.svg`;

            this.favorite.currentRate = this.favorite.currentRate || this.favorite.exchangeRateAtAdd; // ✅ Usa il valore da HomeComponent
            this.initChart();
        }
    });
}


fetchCurrentExchangeRate() {
    fetch(`https://api.exchangerate-api.com/v4/latest/${this.favorite.from}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[this.favorite.to];

            if (rate) {
                this.favorite.currentRate = this.formatExchangeRate(rate); // ✅ Ora è sempre identico al valore originale
                this.updateLocalStorageWithNewRate(rate);
                this.initChart();
            } else {
                this.favorite.currentRate = 'N/A';
            }
        })
        .catch(error => console.error("Errore nel recupero del tasso di cambio:", error));
}



updateLocalStorageWithNewRate(newRate: number) {
    let storedFavorites: any[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = storedFavorites.findIndex(fav => fav.from === this.favorite.from && fav.to === this.favorite.to);

    if (index !== -1) {
        storedFavorites[index].currentRate = this.formatExchangeRate(newRate); // ✅ Aggiorna il tasso attuale
        storedFavorites[index].exchangeRateHistory.push(newRate); // ✅ Aggiorna la cronologia
        localStorage.setItem('favorites', JSON.stringify(storedFavorites));
    }
}



formatExchangeRate(rate: number): string {
  return rate.toString(); // ✅ Nessun arrotondamento, nessuna modifica
}





  startEditing(): void {
    this.isEditing = true;
  } 

  saveFavorite(): void {
    if (!this.favorite) return;
  
    this.favorite.description = this.editedDescription;
    this.favorite.lastModifiedDate = new Date().toISOString();
  
    const storedFavorites: any[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = storedFavorites.findIndex(fav => fav.from === this.favorite.from && fav.to === this.favorite.to);
    
    if (index !== -1) {
      storedFavorites[index] = this.favorite;
      localStorage.setItem('favorites', JSON.stringify(storedFavorites));
    }
  
    this.isEditing = false;
  }

  initChart() {
    if (!this.favorite || !this.favorite.exchangeRateAtAdd) {
        console.warn("Dati del grafico mancanti, impossibile inizializzare.");
        return;
    }

    const initialRate = Number(this.favorite.exchangeRateAtAdd);
    const currentRate = this.favorite.currentRate ? Number(this.favorite.currentRate) : null;

    console.log("Tasso iniziale salvato:", initialRate);
    console.log("Tasso attuale ricevuto:", currentRate);

    this.chartData = {
        labels: ['Tasso iniziale', ...(currentRate ? ['Tasso attuale'] : [])],
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
}


  
}


