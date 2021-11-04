import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDeletePdfComponent } from './app-delete-pdf.component';

describe('AppDeletePdfComponent', () => {
  let component: AppDeletePdfComponent;
  let fixture: ComponentFixture<AppDeletePdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppDeletePdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDeletePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
