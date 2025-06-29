import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { take } from 'rxjs/operators';
import { Hero } from '../models/hero.model';

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [HeroService] });
    service = TestBed.inject(HeroService);
    service.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all heroes', (done) => {
    service.getAll().pipe(take(1)).subscribe((heroes) => {
      expect(heroes.length).toBe(20);
      done();
    });
  });

  it('should get a hero by ID', (done) => {
    service.getById(1).pipe(take(1)).subscribe((hero) => {
      expect(hero).toBeDefined();
      expect(hero?.name).toBe('Hombre Araña');
      done();
    });
  });

  it('should return undefined for non-existent hero', (done) => {
    service.getById(999).pipe(take(1)).subscribe((hero) => {
      expect(hero).toBeUndefined();
      done();
    });
  });

  it('should search heroes by name (case insensitive)', (done) => {
    service.search('man').pipe(take(1)).subscribe((heroes) => {
      expect(heroes.length).toBeGreaterThan(0);
      expect(heroes.every(h => h.name.toLowerCase().includes('man'))).toBeTrue();
      done();
    });
  });

  it('should return all heroes if search term is empty', (done) => {
    service.search('').pipe(take(1)).subscribe((heroes) => {
      expect(heroes.length).toBe(20);
      done();
    });
  });

  it('should add a new hero', (done) => {
    const newHero: Hero = { id: 21, name: 'Test Hero' };
    service.add(newHero);

    service.getAll().pipe(take(1)).subscribe((heroes) => {
      expect(heroes.length).toBe(21);
      expect(heroes.find(h => h.id === 21)).toEqual(newHero);
      done();
    });
  });

  it('should update an existing hero', (done) => {
    const updatedHero: Hero = { id: 1, name: 'Spider-Man Updated' };
    service.update(updatedHero);

    service.getById(1).pipe(take(1)).subscribe((hero) => {
      expect(hero?.name).toBe('Spider-Man Updated');
      done();
    });
  });

  it('should not update if hero does not exist', (done) => {
    const updatedHero: Hero = { id: 999, name: 'Nonexistent' };
    service.update(updatedHero);

    service.getById(999).pipe(take(1)).subscribe((hero) => {
      expect(hero).toBeUndefined();
      done();
    });
  });

  it('should delete a hero', (done) => {
    service.delete(1);

    service.getAll().pipe(take(1)).subscribe((heroes) => {
      expect(heroes.length).toBe(19);
      expect(heroes.find(h => h.id === 1)).toBeUndefined();
      done();
    });
  });

  it('should generate next available ID', () => {
    const nextId = service.getNextId();
    expect(nextId).toBe(21);
  });
});
