import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPaesiComponent } from './menu-paesi.component';

describe('MenuPaesiComponent', () => {
  let component: MenuPaesiComponent;
  let fixture: ComponentFixture<MenuPaesiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuPaesiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuPaesiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
