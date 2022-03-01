import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSettlementComponent } from './card-settlement.component';

describe('CardSettlementComponent', () => {
  let component: CardSettlementComponent;
  let fixture: ComponentFixture<CardSettlementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardSettlementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
