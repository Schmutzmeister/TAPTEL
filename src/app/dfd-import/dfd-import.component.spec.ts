import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DfdImportComponent } from './dfd-import.component';

describe('DfdImportComponent', () => {
  let component: DfdImportComponent;
  let fixture: ComponentFixture<DfdImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DfdImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DfdImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
