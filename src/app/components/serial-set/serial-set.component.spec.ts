import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerialSetComponent } from './serial-set.component';

describe('SerialSetComponent', () => {
  let component: SerialSetComponent;
  let fixture: ComponentFixture<SerialSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SerialSetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SerialSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
