import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Tasks} from '../model/tasks/tasks.module';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8081/todo/api/v1/tasks';
  constructor(private http: HttpClient) { }

  getAllTasks() {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get(this.apiUrl, { headers });
  }

  addTask(task: Tasks) {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(this.apiUrl, task, { headers });
  }

  updateTask(updatedTask: Tasks, id: string) {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.patch(`${this.apiUrl}/${id}`, updatedTask, { headers });
  }

  deleteTask(id: string) {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
