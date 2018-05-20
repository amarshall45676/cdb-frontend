import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryNavigationComponent } from './query-navigation.component';

describe('QueryNavigationComponent', () => {
  let component: QueryNavigationComponent;
  let fixture: ComponentFixture<QueryNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
