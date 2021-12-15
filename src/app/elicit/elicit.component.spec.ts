import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElicitComponent } from './elicit.component';

describe('ElicitComponent', () => {
  let component: ElicitComponent;
  let fixture: ComponentFixture<ElicitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElicitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElicitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
