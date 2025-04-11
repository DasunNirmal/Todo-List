import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private router: Router) { }

  register() {
    this.router.navigate(['']).then(r => true);
  }

  goToLogin() {
    this.router.navigate(['']).then(r => true);
  }
}
