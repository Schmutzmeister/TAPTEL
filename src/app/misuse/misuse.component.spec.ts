import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisuseComponent } from './misuse.component';

describe('MisuseComponent', () => {
  let component: MisuseComponent;
  let fixture: ComponentFixture<MisuseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisuseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
