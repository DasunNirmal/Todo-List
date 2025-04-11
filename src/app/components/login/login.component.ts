import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      alert('Email and password are required');
      return;
    }

    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']);
        } else {
          console.error('No token in response');
          alert('Login failed: Invalid response from server');
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        const message = error?.error?.message || 'Login failed';
        alert(message);
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']).then(r => true);
  }
}
