import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUsersPageComponent } from './app-users-page.component';

describe('AppUsersPageComponent', () => {
  let component: AppUsersPageComponent;
  let fixture: ComponentFixture<AppUsersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppUsersPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUsersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
