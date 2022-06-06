import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsucursalesComponent } from './psucursales.component';

describe('PsucursalesComponent', () => {
  let component: PsucursalesComponent;
  let fixture: ComponentFixture<PsucursalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsucursalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsucursalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
