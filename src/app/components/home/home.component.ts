import {Component, OnInit} from '@angular/core';
import {NgClass} from '@angular/common';
import {TaskService} from '../../services/task.service';
import {Tasks} from '../../model/tasks/tasks.module';

@Component({
  selector: 'app-home',
  imports: [
    NgClass
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isLightTheme = false;  /*Tracks whether the theme is light or dark*/
  tasks: Tasks[] = [];

  constructor(private taskService: TaskService) {}

  toggleTheme() {
    this.isLightTheme = !this.isLightTheme;
    document.body.classList.toggle('light', this.isLightTheme);
  }

  ngOnInit() {
    this.loadAllTasks();
  }

  loadAllTasks() {
    this.taskService.getAllTasks().subscribe((data) => {
      console.log(data);
    })
  }
}
