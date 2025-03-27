import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';  // Importa PrimeNG Card
import { ButtonModule } from 'primeng/button';  // Importa PrimeNG Button
import { InputTextModule } from 'primeng/inputtext';  // Importa PrimeNG Input
import { DividerModule } from 'primeng/divider';  // Importa il Divider di PrimeNG

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
  currencyImage: string = ''; // Percorso immagine della valuta

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const favoriteData = history.state.favorite;
      console.log('Dati da history.state:', favoriteData);
      if (favoriteData) {
        this.favorite = favoriteData;
        this.editedDescription = this.favorite.description || '';

        // Imposta un'immagine della valuta di esempio
        this.currencyImage = 'assets/currency_placeholder.png'; // Da sostituire con l'immagine corretta
      }
    });
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
}