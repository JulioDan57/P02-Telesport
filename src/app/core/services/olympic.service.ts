import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Olympic, JsonReadingStatus } from 'src/app/core/models/Olympic';
import { LowerCasePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);
  private jsonReadingStatus$=new BehaviorSubject<JsonReadingStatus>({failed:false, message:"Success"});  
  constructor(private http: HttpClient) {}


  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)), //lecture et sauvegarde de la valeur
      catchError((error) => {
        console.error(error);
        // set the error status and the error code 
        this.jsonReadingStatus$.next({failed:true, message: error.status});
        this.olympics$.next([]);
        return of(undefined);
      })
    );
  }

  // return the Olympic observable
  getOlympics() {
    return this.olympics$.asObservable();
  }

  // Search by using the country name and retune a Olympic observable
  getOlympicByCountry(country: string): Observable<Olympic | undefined> {
    return this.olympics$.pipe(
      map(
        olympics => olympics.find(olympic => this.toLowerCase(olympic.country) === this.toLowerCase(country))
      )
    );
  }
  
  // return the input string value converted to lower case
  private lowerCasePipe = inject(LowerCasePipe);
    toLowerCase(value: string): string {
    return this.lowerCasePipe.transform(value);
  }

   // return the jsonReadingStatus observable.
  getJsonReadingStatus()
  {
    return this.jsonReadingStatus$.asObservable();
  }
}
