import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userNo: string = '';
  password: string = '';
  error: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const loginData = { userNo: this.userNo, password: this.password };
debugger
    this.http.post<{ message: string, role: string }>('http://localhost:5000/api/auth/login', loginData)
      .subscribe({
        next: (response) => {
          if (response.message === 'Success') {
            if (response.role === 'Admin') {
              this.router.navigate(['/dashboard']);  // Navigate to the dashboard
            } else {
              //this.router.navigate(['/']);  // Navigate to user home (or any other page)
            }
          }
        },
        error: (e) => {
          this.error = 'Invalid credentials. Please try again.';
          alert(`Error: ${this.error}`);
          console.error('Error:', e);
        }
      });
  }
}
