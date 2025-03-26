import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescrizionePreferitoComponent } from './descrizione-preferito.component';

describe('DescrizionePreferitoComponent', () => {
  let component: DescrizionePreferitoComponent;
  let fixture: ComponentFixture<DescrizionePreferitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescrizionePreferitoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescrizionePreferitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
