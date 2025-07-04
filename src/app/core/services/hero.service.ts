import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hero } from '../models/hero.model';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private readonly initialHeroes: Hero[] = [
    { id: 1, name: 'Hombre Araña' },
    { id: 2, name: 'Superman' },
    { id: 3, name: 'Batman' },
    { id: 4, name: 'Mujer Maravilla' },
    { id: 5, name: 'Iron Man' },
    { id: 6, name: 'Capitán América' },
    { id: 7, name: 'Hulk' },
    { id: 8, name: 'Thor' },
    { id: 9, name: 'Flash' },
    { id: 10, name: 'Black Panther' },
    { id: 11, name: 'Doctor Strange' },
    { id: 12, name: 'Bruja Escarlata' },
    { id: 13, name: 'Capitana Marvel' },
    { id: 14, name: 'Ant-Man' },
    { id: 15, name: 'Deadpool' },
    { id: 16, name: 'Linterna Verde' },
    { id: 17, name: 'Cyborg' },
    { id: 18, name: 'El Chapulín Colorado' },
    { id: 19, name: 'Kaliman' },
    { id: 20, name: 'El Eternauta' },
  ];

  private heroes: Hero[] = [...this.initialHeroes];
  readonly heroesSubject = new BehaviorSubject<Hero[]>([...this.heroes]);

  // Resetear a los datos originales
  reset(): void {
    this.heroes = [...this.initialHeroes];
    this.heroesSubject.next([...this.heroes]);
  }

  // Obtener todos los héroes
  getAll(): Observable<Hero[]> {
    return this.heroesSubject.asObservable();
  }

  // Obtener héroe por ID
  getById(id: number): Observable<Hero | undefined> {
    const hero = this.heroes.find((h) => h.id === id);
    return of(hero);
  }

  // Buscar héroes por nombre
  search(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return this.getAll();
    }
    const lower = term.toLowerCase();
    return this.heroesSubject.pipe(
      map((list) => list.filter((h) => h.name.toLowerCase().includes(lower))),
    );
  }

  // Agregar nuevo héroe
  add(hero: Hero): boolean {
    const newName = hero.name.toLowerCase().trim();

    const alreadyExists = this.heroes.some(
      (h) => h.name.toLowerCase().trim() === newName,
    );

    if (alreadyExists) {
      return false;
    }

    this.heroes.push(hero);
    this.heroesSubject.next([...this.heroes]);
    return true;
  }

  // Obtener siguiente ID
  getNextId(): number {
    if (this.heroes.length === 0) return 1;
    return Math.max(...this.heroes.map((h) => h.id)) + 1;
  }

  // Actualizar héroe
  update(updatedHero: Hero): void {
    if (!updatedHero?.id) return;

    const index = this.heroes.findIndex((h) => h.id === updatedHero.id);
    if (index === -1) return;

    const currentHero = this.heroes[index];

    if (currentHero.name === updatedHero.name) return;

    this.heroes[index] = { ...updatedHero };
    this.heroesSubject.next([...this.heroes]);
  }

  // Eliminar héroe
  delete(id: number): void {
    this.heroes = this.heroes.filter((h) => h.id !== id);
    this.heroesSubject.next([...this.heroes]);
  }
}
