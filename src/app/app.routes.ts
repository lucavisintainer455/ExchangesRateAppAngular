import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import { PreferitiComponent } from './preferiti/preferiti.component';

export const routes: Routes = [
    {path: "home",component: HomeComponent},
    {path: "info",component: InfoComponent},
    {path: "preferiti",component: PreferitiComponent},

    // Rotta wildcard: qualsiasi URL non valido va alla home
    { path: "**", redirectTo: "home", pathMatch: "full" }
];
