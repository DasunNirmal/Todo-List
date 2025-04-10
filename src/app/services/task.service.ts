import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tasks} from '../model/tasks/tasks.module';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8081/todo/api/v1/tasks';
  constructor(private http: HttpClient) { }

  getAllTasks() {
    return this.http.get(this.apiUrl);
  }

  addTask(task: Tasks) {
    return this.http.post(this.apiUrl, task);
  }
}
