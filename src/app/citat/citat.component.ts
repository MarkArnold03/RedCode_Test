import { Component, OnInit } from '@angular/core';
import { Citat } from './citat';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CitatService } from './citat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-citat',
  templateUrl: './citat.component.html',
  styleUrl: './citat.component.css'
})
export class CitatComponent implements OnInit {
  private citatsUrl = 'https://localhost:7136/Book'; 
  isAuthenticated = false;
  citat: Citat = {
    id: 0,
    name: '',
    writer: '',
    text: ''
  };

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  citats: Citat[] = [];

  constructor(private citatService: CitatService,private http: HttpClient, private router: Router) {
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
    this.citatService.getBooks().subscribe(data => {this.citats = data})
    } catch (error) {
      console.error('Failed to get books:', error);
    }
  }

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
          return this.http.delete<Citat>(`${this.citatsUrl}/${id}`, this.httpOptions)
          .toPromise()
          .catch((error) => {
              console.error('An error occurred:', error);
              alert('Failed to delete the book. Please try again.');
          });
        }
    }
}
}
