import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroAddButton } from './hero-add-button';

describe('HeroAddButton', () => {
  let component: HeroAddButton;
  let fixture: ComponentFixture<HeroAddButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroAddButton],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroAddButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component hero-add-button', () => {
    expect(component).toBeTruthy();
  });
});
