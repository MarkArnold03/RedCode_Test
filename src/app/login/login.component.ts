import { Component } from '@angular/core';
import { loginService } from '../login/login.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private loginService: loginService, private router: Router) {
    this.loginForm = new FormGroup({
      'UserName': new FormControl(null, [Validators.required]),
      'Password': new FormControl(null, Validators.required)
    });
  }

  onsubmit() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value.UserName, this.loginForm.value.Password).subscribe(
        response => {
          if (response && response.token) {

            localStorage.setItem('token', response.token);
            this.router.navigate(["/"]);
          } else {

            console.log('Login successful, but no token returned');
            // Navigate to a different page or show a message to the user
          }
        },
        error => {
          console.error('Login failed', error);
        }
      );
    }
  }
}
