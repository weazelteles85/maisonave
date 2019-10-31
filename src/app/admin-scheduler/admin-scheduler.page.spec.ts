import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSchedulerPage } from './admin-scheduler.page';

describe('AdminSchedulerPage', () => {
  let component: AdminSchedulerPage;
  let fixture: ComponentFixture<AdminSchedulerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSchedulerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSchedulerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
