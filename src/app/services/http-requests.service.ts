import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestsService {
  private apiURL = 'https://icanhazdadjoke.com/';
  constructor(private http: HttpClient) {}

  getRandomJoke(): Observable<string> {
    // Define headers
    const headers = new HttpHeaders({
      Accept: 'application/json',
    });

    // Include headers in the HTTP request
    return this.http.get<any>(this.apiURL, { headers }).pipe(
      map((response) => response.joke), // Extract 'joke' property
      catchError((error: any) => {
        console.error('error fetching', error);
        return throwError('error');
      })
    );
  }
}
