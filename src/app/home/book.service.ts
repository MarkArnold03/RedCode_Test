import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Book } from './book';

@Injectable({ providedIn: 'root' })
export class BookService {

  private booksUrl = 'https://localhost:7136/Book';  
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

  getBook(id: any): Observable<Book> {
    return this.http.get<Book>(`${this.booksUrl}/${id}`)
      .pipe(
        catchError(this.handleError<Book>('getBook'))
      );
  }
  
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.booksUrl}/GetAll`)
      .pipe(
        catchError(this.handleError<Book[]>('getBooks', []))
      );
  }

  addBook(book: Book): Observable<Book> {
    if (!this.isAuthenticated) {
      throw new Error('You must be logged in to add a book.');
    }
    return this.http.post<Book>(`${this.booksUrl}/`, book, this.httpOptions)
      .pipe(
        catchError(this.handleError<Book>('addBook'))
      );
  }

  updateBook(book: any, id: number): Observable<any> {
    if (!this.isAuthenticated) {
      throw new Error('You must be logged in to update a book.');
    }
    const url = `${this.booksUrl}/Put/${id}`;
    return this.http.put(url, book);
    
  }

  deleteBook(id: any): Observable<Book> {
    if (!this.isAuthenticated) {
      throw new Error('You must be logged in to delete a book.');
    }
    return this.http.delete<Book>(`${this.booksUrl}/Delete/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError<Book>('deleteBook'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
