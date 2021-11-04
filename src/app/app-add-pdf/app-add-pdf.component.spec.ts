import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAddPdfComponent } from './app-add-pdf.component';

describe('AppAddPdfComponent', () => {
  let component: AppAddPdfComponent;
  let fixture: ComponentFixture<AppAddPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAddPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAddPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
