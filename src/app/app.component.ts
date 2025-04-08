import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isLightTheme = false;  /*Tracks whether the theme is light or dark*/

  toggleTheme() {
    this.isLightTheme = !this.isLightTheme;
    document.body.classList.toggle('light', this.isLightTheme);
  }
}
