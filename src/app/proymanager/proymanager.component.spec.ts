import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProymanagerComponent } from './proymanager.component';

describe('ProymanagerComponent', () => {
  let component: ProymanagerComponent;
  let fixture: ComponentFixture<ProymanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProymanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProymanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
