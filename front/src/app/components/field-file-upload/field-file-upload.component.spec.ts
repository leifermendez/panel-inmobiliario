import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldFileUploadComponent } from './field-file-upload.component';

describe('FieldFileUploadComponent', () => {
  let component: FieldFileUploadComponent;
  let fixture: ComponentFixture<FieldFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldFileUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
