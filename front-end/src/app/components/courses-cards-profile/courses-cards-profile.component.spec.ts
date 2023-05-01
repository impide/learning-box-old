import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesCardsProfileComponent } from './courses-cards-profile.component';

describe('CoursesCardsProfileComponent', () => {
  let component: CoursesCardsProfileComponent;
  let fixture: ComponentFixture<CoursesCardsProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesCardsProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesCardsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
