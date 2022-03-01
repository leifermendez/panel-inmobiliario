import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDocsComponent } from './card-docs.component';

describe('CardDocsComponent', () => {
  let component: CardDocsComponent;
  let fixture: ComponentFixture<CardDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
