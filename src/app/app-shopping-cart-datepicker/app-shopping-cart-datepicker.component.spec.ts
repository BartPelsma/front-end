import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppShoppingCartDatepickerComponent } from './app-shopping-cart-datepicker.component';

describe('AppShoppingCartDatepickerComponent', () => {
  let component: AppShoppingCartDatepickerComponent;
  let fixture: ComponentFixture<AppShoppingCartDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppShoppingCartDatepickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppShoppingCartDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
