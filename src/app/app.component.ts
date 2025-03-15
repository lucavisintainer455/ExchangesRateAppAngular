import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitoloComponent } from "./titolo/titolo.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TitoloComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ExchangeRateApp';
}
