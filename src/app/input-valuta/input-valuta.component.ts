import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-input-valuta',
  imports: [CommonModule, FormsModule, InputNumberModule],
  templateUrl: './input-valuta.component.html',
  styleUrl: './input-valuta.component.css'
})
export class InputValutaComponent {
  @Input() currencyCode!: string;
  @Input() placeholder: string = 'Inserisci importo';
  @Input() value: number | undefined = undefined;  
  @Output() valueChange = new EventEmitter<number>();  

  onValueChange(newValue: number | null) {
    this.valueChange.emit(newValue ?? 0);
  }
  
}


