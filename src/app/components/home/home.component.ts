import {Component, OnInit, ViewChild} from '@angular/core';
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
  editingTaskId: string | null = null;
  @ViewChild('card') card: any

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
      created_at: this.currentDate || ''
    };

    this.taskService.addTask(newTask).subscribe({
      next: () => {
        this.loadAllTasks();
      },
      error: (error) => {
        console.error('Error adding task:', error);
      }
    });
  }

  changeStatus(task: Tasks, event: Event, card: HTMLElement) {
    const target = event.target as HTMLInputElement;
    task.status = target.checked ? 'COMPLETED' : 'PENDING';
    target.checked ? card.classList.add('checked') : card.classList.remove('checked');
    console.log(task);

    const updatedTask: Tasks = {
      id: task.id,
      description: task.description,
      status: task.status,
      created_at: this.currentDate || ''
    };

    console.log(updatedTask);

    this.taskService.updateTask(updatedTask,task.id).subscribe({
      next: () => {
        this.loadAllTasks();
        console.log('Task status changed successfully');
      },
      error: (error) => {
        console.error('Error adding task:', error);
      }
    });
  }

  toggleEditMode(taskId: string, inputElement?: HTMLInputElement, value?: string) {
    this.editingTaskId = this.editingTaskId === taskId ? null : taskId;

    if (this.editingTaskId && inputElement) {
      setTimeout(() => inputElement.focus(), 0);
    }

    console.log(value);

    const updatedTask: Tasks = {
      id: taskId,
      description: value || '',
      status: this.currentStatus,
      created_at: this.currentDate || ''
    };

    this.taskService.updateTask(updatedTask, taskId).subscribe({
      next: () => {
        this.loadAllTasks();
        console.log('Task updated successfully');
      },
      error: (error) => {
        console.error('Error adding task:', error);
      }
    });
  }

  removeTask(id: string) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.loadAllTasks();
        console.log('Task deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting task:', error);
      }
    })
  }
}
