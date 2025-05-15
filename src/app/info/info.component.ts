import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-info',
  imports: [RouterOutlet,RouterLink,ButtonModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
}
