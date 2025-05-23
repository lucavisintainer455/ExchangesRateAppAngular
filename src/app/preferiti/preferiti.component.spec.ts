import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrimeIcons } from 'primeng/api';


import { PreferitiComponent } from './preferiti.component';

describe('PreferitiComponent', () => {
  let component: PreferitiComponent;
  let fixture: ComponentFixture<PreferitiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreferitiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreferitiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
