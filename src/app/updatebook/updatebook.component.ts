import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../home/book';
import { BookService } from '../home/book.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-updatebook',
  templateUrl: './updatebook.component.html',
  styleUrls: ['./updatebook.component.css']
})
export class UpdatebookComponent {
  private booksUrl = 'https://localhost:7136/Book'; 
  book!: Book;
  isAuthenticated = false;
  id? : any;
  selectedBook: any = {
    title: '',
    Writer: '',
    PublishDate: ''
  };

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) {
    this.isLoggedIn();
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    this.isAuthenticated = !!token;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookService.getBook(id).subscribe(book => {
        this.book = book;
        this.selectedBookMethod(book);
      });
    }
  }

  selectedBookMethod(book: any) {
    this.selectedBook = book;
  }

  hideUpdateForm() {
    window.alert('book was not updated');
    this.router.navigate(['/']);
  }

  submit(): void {
    if (!this.isAuthenticated) {
      window.alert('You must be logged in to update a book.');
    }

    this.id = this.book.id;
    try {
      const url = `${this.booksUrl}/${this.id}`;
    this.http.put(url, this.book).subscribe(() => {
      this.router.navigate(['/']);
        
    }, error => {
      console.error('Failed to update book:', error);
    });
    } catch (error) {
      console.error('Failed to update book:', error);
    }
  }
}
