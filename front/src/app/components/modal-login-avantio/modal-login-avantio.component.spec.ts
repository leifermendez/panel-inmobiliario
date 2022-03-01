import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLoginAvantioComponent } from './modal-login-avantio.component';

describe('ModalLoginAvantioComponent', () => {
  let component: ModalLoginAvantioComponent;
  let fixture: ComponentFixture<ModalLoginAvantioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLoginAvantioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLoginAvantioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
