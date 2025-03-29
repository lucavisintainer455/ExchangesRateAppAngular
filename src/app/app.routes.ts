import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import { PreferitiComponent } from './preferiti/preferiti.component';
import { DescrizionePreferitoComponent } from './descrizione-preferito/descrizione-preferito.component';
import { StoricoComponent } from './storico/storico.component';

export const routes: Routes = [
    {path: "home",component: HomeComponent},
    {path: "info",component: InfoComponent},
    {path: "preferiti",component: PreferitiComponent},
    { path: 'preferito/:id', component: DescrizionePreferitoComponent},
    { path: 'storico', component: StoricoComponent},

    // Rotta wildcard: qualsiasi URL non valido va alla home
    { path: "**", redirectTo: "home", pathMatch: "full" }
];


