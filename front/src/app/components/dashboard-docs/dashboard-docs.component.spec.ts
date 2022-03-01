import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDocsComponent } from './dashboard-docs.component';

describe('DashboardDocsComponent', () => {
  let component: DashboardDocsComponent;
  let fixture: ComponentFixture<DashboardDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
