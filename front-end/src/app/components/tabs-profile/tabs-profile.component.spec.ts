import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsProfileComponent } from './tabs-profile.component';

describe('SectionsProfileComponent', () => {
  let component: SectionsProfileComponent;
  let fixture: ComponentFixture<SectionsProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionsProfileComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SectionsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
