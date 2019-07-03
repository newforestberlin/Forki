import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SonarComponent } from './sonar.component';

describe('SonarComponent', () => {
  let component: SonarComponent;
  let fixture: ComponentFixture<SonarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SonarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SonarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
