import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { LoaderModule } from '@progress/kendo-angular-indicators';
import { ApiService } from '../../services/app.api.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, LoaderModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userNo: string = '';
  password: string = '';
  error: string = '';
  isLoading = false;

  constructor(private http: HttpClient, private router: Router, private apiService: ApiService) {}

  login() {
    this.isLoading = true;
    const loginData = { userNo: this.userNo, password: this.password };

    this.apiService.post<{ message: string, role: string, token?: string }>('auth/login', loginData)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.message === 'Success') {
            localStorage.setItem('token', res['token'] ?? '');  // token save
            this.router.navigate(['/dashboard']);
          }
        },
        error: () => {
          this.isLoading = false;
          this.error = 'Invalid credentials';
        }
      });
  }
}
