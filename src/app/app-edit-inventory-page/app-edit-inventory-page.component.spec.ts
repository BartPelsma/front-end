import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppEditInventoryPageComponent } from './app-edit-inventory-page.component';

describe('AppEditInventoryPageComponent', () => {
  let component: AppEditInventoryPageComponent;
  let fixture: ComponentFixture<AppEditInventoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppEditInventoryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppEditInventoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
