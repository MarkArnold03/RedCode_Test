import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { Book } from './book';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private booksUrl = 'https://localhost:7136/Book'; 
  isAuthenticated = false;
  book: Book = {
    id: 0,
    title: '',
    writer: '',
    publishDate: ''
  };
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  books: Book[] = [];

  constructor(private bookService: BookService,private http: HttpClient, private router: Router) {
    this.isLoggedIn();
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    this.isAuthenticated = !!token;
  }
  ngOnInit() {
    this.getBooks();
  }

  async getBooks() {
    try {
    this.bookService.getBooks().subscribe(data => {this.books = data})
    } catch (error) {
      console.error('Failed to get books:', error);
    }
  }
  // async submit() {
  //   if (this.book.title && this.book.author) {
  //     if (this.book.id) {
  //       // If the book already exists, update it
  //       await this.bookService.updateBook(this.book).toPromise();
  //     } else {
  //       // If the book doesn't exist, add it
  //       await this.bookService.addBook(this.book).toPromise();
  //     }
  //     // Reset the form and refresh the book list
  //     this.book = {
  //       id: 0,
  //       title: '',
  //       author: '',
  //       date: ''
  //     };
  //     await this.getBooks();
  //   } else {
  //     throw new Error('Title and author are required.');
  //   }
  // }

  add(): void {
    if (!this.isAuthenticated) {
      window.alert('You must be logged in to add a book.');
      return;
    }
    // Navigate to the add new book page
    this.router.navigate(['/addbook']); // assuming '/add' is your add new book route
  }

  async deleteBook(id: any){
    if (!this.isAuthenticated) {
      throw new Error('You must be logged in to delete a book.');
    }
    
    let confirmDelete = window.confirm('Are you sure you want to delete this book?');
    if (confirmDelete) {
        confirmDelete = window.confirm('Are you really sure you want to delete this book?');
        if (confirmDelete) {
          return this.http.delete<Book>(`${this.booksUrl}/${id}`, this.httpOptions)
          .toPromise()
          .catch((error) => {
              console.error('An error occurred:', error);
              alert('Failed to delete the book. Please try again.');
          });
        }
    }
}
  async edit(title: any) {
    if (!this.isAuthenticated) {
      window.alert('You must be logged in to edit a book.');
      return;
    }
    // Navigate to the edit book page
    this.router.navigate(['/updatebook',title]); // assuming '/edit' is your edit book route
  }
}
