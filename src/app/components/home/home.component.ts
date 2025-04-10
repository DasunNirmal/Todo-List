import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe, NgClass, NgFor} from '@angular/common';
import {TaskService} from '../../services/task.service';
import {Tasks} from '../../model/tasks/tasks.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass, NgFor, CommonModule],
  providers: [DatePipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLightTheme = false;  /*Tracks whether the theme is light or dark*/
  tasks: Tasks[] = [];
  currentDate: string | null = '';
  currentStatus: string  = 'PENDING';

  constructor(private taskService: TaskService, private date: DatePipe) {}

  toggleTheme() {
    this.isLightTheme = !this.isLightTheme;
    document.body.classList.toggle('light', this.isLightTheme);
  }

  ngOnInit() {
    this.currentDate = this.date.transform(new Date(), 'yyyy-MM-dd');
    this.loadAllTasks();
  }

  /*CRUD*/
  loadAllTasks() {
    this.taskService.getAllTasks().subscribe((data: any) => {
      this.tasks = data;
      console.log(data);
    });
  }

  trackTaskById(index: number, task: Tasks): string {
    return task.id;
  }

  addTask(value: string) {
    if (!value.trim()) return;

    const newTask: Tasks = {
      id: '', /*back end will handle the id*/
      description: value,
      status: this.currentStatus,
      createdAt: this.currentDate || ''
    };

    this.taskService.addTask(newTask).subscribe({
      next: () => {
        this.loadAllTasks(); // Refresh the task list
      },
      error: (error) => {
        console.error('Error adding task:', error);
      }
    });
  }

  changeStatus(task: Tasks, event: Event) {
    const target = event.target as HTMLInputElement;
    task.status = target.checked ? 'COMPLETED' : 'PENDING';
    console.log(task);
  }
}
