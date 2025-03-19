import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputValutaComponent } from './input-valuta.component';

describe('InputValutaComponent', () => {
  let component: InputValutaComponent;
  let fixture: ComponentFixture<InputValutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputValutaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputValutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
