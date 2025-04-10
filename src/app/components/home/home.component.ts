import { Component } from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    NgClass
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isLightTheme = false;  /*Tracks whether the theme is light or dark*/

  toggleTheme() {
    this.isLightTheme = !this.isLightTheme;
    document.body.classList.toggle('light', this.isLightTheme);
  }
}
