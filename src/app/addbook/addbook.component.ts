import { Component } from '@angular/core';
import { Book } from '../home/book';
import { Observable, catchError, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BookService } from '../home/book.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent {
  private booksUrl = 'https://localhost:7136/Book';  
  isAuthenticated = false;
  newBook: Book = {
    title: '', writer: '', publishDate: '',
    id: 0
  };

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,private router: Router, private bookService:BookService) { 
    this.isLoggedIn();
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    this.isAuthenticated = !!token;
  }

  addBook(): void {
    if (!this.isAuthenticated) {
      throw new Error('You must be logged in to add a book.');
    }
    this.http.post<Book>(`${this.booksUrl}/`, this.newBook, this.httpOptions)
      .pipe(
        catchError(this.handleError<Book>('addBook'))
      )
      .toPromise()
      .then(() => {
        this.router.navigate(["/"]);
      })
      .catch((error) => {
        console.error('Failed to add book:', error);
      });
  }
  

  hideAddForm() {
    window.alert('No book was added');
    this.router.navigate(['/']);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
