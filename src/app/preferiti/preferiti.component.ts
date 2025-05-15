/**
 * Componente che mostra la lista dei cambi valuta salvati come preferiti.
 * Permette di rimuovere un preferito o visualizzarne i dettagli.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-preferiti',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, ButtonModule],
  templateUrl: './preferiti.component.html',
  styleUrl: './preferiti.component.css'
})
export class PreferitiComponent implements OnInit {
  favorites: { from: string; to: string }[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  /**
   * Carica i preferiti dal localStorage.
   * Se non presenti o errore nel parsing, inizializza lista vuota.
   */
  loadFavorites(): void {
    try {
      const storedFavorites = localStorage.getItem('favorites');
      this.favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error('Errore nel caricamento dei preferiti:', error);
      this.favorites = [];
    }
  }

  /**
   * Rimuove un preferito dall'elenco e aggiorna il localStorage.
   * @param index Indice del preferito da rimuovere
   */
  removeFavorite(index: number): void {
    this.favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  /**
   * Naviga alla pagina di dettaglio del preferito selezionato.
   * @param fav Oggetto contenente le valute "from" e "to"
   */
  goToDetails(fav: { from: string; to: string }): void {
    this.router.navigate(['/preferito', `${fav.from}-${fav.to}`], { state: { favorite: fav } });
  }
}
