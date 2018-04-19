import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliateResultsComponent } from './affiliate-results.component';

describe('AffiliateResultsComponent', () => {
  let component: AffiliateResultsComponent;
  let fixture: ComponentFixture<AffiliateResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffiliateResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliateResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
