import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-descrizione-preferito',
  imports: [CommonModule,RouterLink],
  templateUrl: './descrizione-preferito.component.html',
  styleUrls: ['./descrizione-preferito.component.css']
})
export class DescrizionePreferitoComponent implements OnInit {
  favorite: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['favorite']) {
      this.favorite = state['favorite'];
    }
  }

  editFavorite(): void {
    if (!this.favorite) {
      return; // Se 'favorite' è null, esci dalla funzione
    }

    // Mostra un form per modificare la descrizione, il tasso, ecc.
    const modifiedFavorite = { 
      ...this.favorite, 
      description: 'Nuova descrizione',  // Modifica la descrizione o qualsiasi altra proprietà
      lastModifiedDate: new Date().toISOString()  // Aggiungi la data dell'ultima modifica
    };

    // Aggiorna il localStorage
    const storedFavorites: any[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = storedFavorites.findIndex(fav => fav.from === this.favorite.from && fav.to === this.favorite.to);
    if (index !== -1) {
      storedFavorites[index] = modifiedFavorite;
      localStorage.setItem('favorites', JSON.stringify(storedFavorites));
    }

    // Ritorna alla lista preferiti
    this.router.navigate(['/preferiti']);
  }
}
