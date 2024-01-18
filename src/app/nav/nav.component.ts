import { Component, OnInit } from '@angular/core';
import { BookService } from '../home/book.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isAuthenticated = false;
  
  ngOnInit() {
    this.isLoggedIn();
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    this.isAuthenticated = !!token;
  }

  signOut() {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
  }
}
