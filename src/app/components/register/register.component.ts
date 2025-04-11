import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/user/user.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  name: string = '';
  userObj: User = new User();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userObj = new User();
  }

  registerUser() {
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      alert('All fields are required');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('email', this.email);
    formData.append('password', this.password);

    this.authService.register(formData).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        this.router.navigate(['']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        const message = error?.error?.message || 'Registration failed';
        alert(message);
      }
    });
  }
}
