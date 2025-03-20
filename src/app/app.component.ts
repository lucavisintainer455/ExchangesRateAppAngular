import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,InputNumberModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ExchangeRateApp';
}
