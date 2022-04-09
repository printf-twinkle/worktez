import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLogoComponent } from './create-logo.component';

describe('CreateLogoComponent', () => {
  let component: CreateLogoComponent;
  let fixture: ComponentFixture<CreateLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
