import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isAuthenticated: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.checkAuthenticationStatus();
    setInterval(() => this.checkAuthenticationStatus(), 60000);
    
  }

  checkAuthenticationStatus() {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenExpiration = this.getTokenExpiration(token);
      const currentTime = new Date().getTime() / 1000;
      if (tokenExpiration && tokenExpiration > currentTime) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
        localStorage.removeItem('token'); // Remove expired token
      }
    } else {
      this.isAuthenticated = false;
    }
  }

  private getTokenExpiration(token: string): number | null {
    try {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        return payload.exp;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  checkAuthenticationStatusBool(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenExpiration = this.getTokenExpiration(token);
      const currentTime = new Date().getTime() / 1000;
      if (tokenExpiration && tokenExpiration > currentTime) {
        return true;
      } else {
        localStorage.removeItem('token');
        return false; // Remove expired token
      }
    } else {
      return false;
    }
  }

  login() {
    // Call your login service here and handle successful login
    // After successful login, set isAuthenticated to true
    this.isAuthenticated = true;
    // this.loadForecasts();
  }
}