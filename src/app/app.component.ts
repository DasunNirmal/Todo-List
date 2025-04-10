import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo-task-manager';
}
