import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { AppCatalogusPageComponent } from './app-catalogus-page.component';



describe('AppCatalogusPageComponent', () => {
  let component: AppCatalogusPageComponent;
  let fixture: ComponentFixture<AppCatalogusPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppCatalogusPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCatalogusPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
