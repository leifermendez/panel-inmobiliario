import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSingleComponent } from './footer-single.component';

describe('FooterSingleComponent', () => {
  let component: FooterSingleComponent;
  let fixture: ComponentFixture<FooterSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
