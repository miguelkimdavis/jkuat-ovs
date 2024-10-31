import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OvsBodyComponent } from './ovs-body.component';

describe('OvsBodyComponent', () => {
  let component: OvsBodyComponent;
  let fixture: ComponentFixture<OvsBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OvsBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OvsBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
