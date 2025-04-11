import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router) { }

  login() {
    this.router.navigate(['home']).then(r => true);
  }

  goToRegister() {
    this.router.navigate(['register']).then(r => true);
  }
}
