import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit } from '@angular/core';


@Component({
  selector: 'app-storico',
  imports: [CommonModule],
  templateUrl: './storico.component.html',
  styleUrls: ['./storico.component.css']
})
export class StoricoComponent implements OnInit, OnChanges {
  storico: { from: string, to: string, amount: number, result: number, date: string }[] = [];

  ngOnInit() {
    this.loadStorico();
  }

  ngOnChanges() {
    this.loadStorico();
  }

  loadStorico() {
    const storedStorico = localStorage.getItem('storico');
    this.storico = storedStorico ? JSON.parse(storedStorico) : [];
  }

  removeItem(index: number) {
    this.storico.splice(index, 1);
    this.saveStorico();
  }

  saveStorico() {
    localStorage.setItem('storico', JSON.stringify(this.storico));
  }
}
