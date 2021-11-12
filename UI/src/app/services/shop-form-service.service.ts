import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class ShopFormServiceService {

  baseUrl: string = "http://localhost:8080/api";
  constructor(private http: HttpClient) { }

  getCreditCardMonths(startMonth: number) : Observable<number[]> {

    let months: number[] = [];

    for(let thMonth = startMonth; thMonth<=12; thMonth++) {
      months.push(thMonth);
    }

    return of(months);
  }

  getCreditCardYears() : Observable<number[]> {

    let years: number[] = [];

    const startYear = new Date().getFullYear();
    const endYear = startYear + 10;

    for (let theYear = startYear; theYear < endYear; theYear++) {
      years.push(theYear);
    }

    return of(years);
    
  }

  getCountries() : Observable<Country[]> {
    const url = `${this.baseUrl}/countries`;
    return this.http.get<ICountryResults>(url)
      .pipe(
        map(data => data._embedded.countries)
      );
  }

  getStates(countryCode: string): Observable<State[]> {
    const url = `${this.baseUrl}/states/search/findByCountryCode?code=${countryCode}`;
    return this.http.get<IStateResults>(url)
      .pipe(
        map(data => data._embedded.states)
      );
  }
}

interface ICountryResults {
  _embedded: {
    countries: Country[]
  }
}

interface IStateResults {
  _embedded: {
    states: State[]
  }
}