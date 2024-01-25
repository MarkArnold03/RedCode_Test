import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Citat } from './citat';

@Injectable({ providedIn: 'root' })
export class CitatService {

  private citatsUrl = 'https://redcodetestapi.azurewebsites.net/citat';  
  isAuthenticated = false;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { 

  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    this.isAuthenticated = !!token;
  }


  
  getBooks(): Observable<Citat[]> {
    return this.http.get<Citat[]>(`${this.citatsUrl}/GetAll`)
      .pipe(
        catchError(this.handleError<Citat[]>('getBooks', []))
      );
  }

  addBook(citat: Citat): Observable<Citat> {
    if (!this.isAuthenticated) {
      throw new Error('You must be logged in to add a book.');
    }
    return this.http.post<Citat>(`${this.citatsUrl}/`, citat, this.httpOptions)
      .pipe(
        catchError(this.handleError<Citat>('addCitat'))
      );
  }

  deleteBook(id: any): Observable<Citat> {
    if (!this.isAuthenticated) {
      throw new Error('You must be logged in to delete a book.');
    }
    return this.http.delete<Citat>(`${this.citatsUrl}/Delete/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError<Citat>('deleteBook'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
