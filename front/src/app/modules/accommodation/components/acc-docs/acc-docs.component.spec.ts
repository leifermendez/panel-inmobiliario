import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccDocsComponent } from './acc-docs.component';

describe('AccDocsComponent', () => {
  let component: AccDocsComponent;
  let fixture: ComponentFixture<AccDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
