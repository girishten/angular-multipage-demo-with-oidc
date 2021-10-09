import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureModuleDemoComponent } from './feature-module-demo.component';

describe('FeatureModuleDemoComponent', () => {
  let component: FeatureModuleDemoComponent;
  let fixture: ComponentFixture<FeatureModuleDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeatureModuleDemoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureModuleDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
