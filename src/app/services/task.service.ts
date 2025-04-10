import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8081/todo/api/v1/tasks';
  constructor(private http: HttpClient) { }

  getAllTasks() {
    return this.http.get(this.apiUrl);
  }
}
