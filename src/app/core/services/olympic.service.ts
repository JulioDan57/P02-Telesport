import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Olympic } from 'src/app/core/models/Olympic';
import { LowerCasePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  //private olympics$ = new BehaviorSubject<any>(undefined);
  private olympics$ = new BehaviorSubject<Olympic[]>([]);
  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)), //lecture et sauvegarde de la valeur
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        //this.olympics$.next(null);
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  // On crée une méthode qui va nous permettre de trier les Olympic par pays.
  // Elle prend en paramètre un string, qui sera le pays.
  // Elle renvoie un observable d'Olympic, ou undefined si aucun Olympic n'est trouvé.
  getOlympicByCountry(country: string): Observable<Olympic | undefined> {
    return this.olympics$.pipe(
      map(
        olympics => olympics.find(olympic => this.toLowerCase(olympic.country) === this.toLowerCase(country))
      )
    );
  }
  
  private lowerCasePipe = inject(LowerCasePipe);
    toLowerCase(value: string): string {
    return this.lowerCasePipe.transform(value);
  }
  
}
