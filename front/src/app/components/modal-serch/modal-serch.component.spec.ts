import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSerchComponent } from './modal-serch.component';

describe('ModalSerchComponent', () => {
  let component: ModalSerchComponent;
  let fixture: ComponentFixture<ModalSerchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSerchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSerchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
