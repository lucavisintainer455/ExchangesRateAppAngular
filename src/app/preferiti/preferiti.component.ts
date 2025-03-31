import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-preferiti',
  standalone: true,
  imports: [RouterOutlet, RouterLink,CommonModule,ButtonModule],
  templateUrl: './preferiti.component.html',
  styleUrl: './preferiti.component.css'
})
export class PreferitiComponent implements OnInit {
  favorites: { from: string, to: string }[] = [];

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }
  constructor(private router: Router) {}
  removeFavorite(index: number) {
    this.favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  goToDetails(fav: any): void {
    this.router.navigate(['/preferito', fav.from + '-' + fav.to], { state: { favorite: fav } }); 
  }
  
}
