import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroModal } from './hero-modal';

describe('HeroModal', () => {
  let component: HeroModal;
  let fixture: ComponentFixture<HeroModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroModal],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
