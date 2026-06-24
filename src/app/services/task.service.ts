import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { Task } from '../models/task.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.apiBaseUrl; //'http://localhost:8055/tms/api/tasks';
  private createTaskUrl = environment.apiBaseUrl + environment.createTaskUrl;
  private getTasksUrl = environment.apiBaseUrl + environment.getTasksUrl;
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.getTasksUrl)
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}${this.getTasksUrl}/${id}`);
  }

  createTask(task: Task): Observable<Task> {
   console.log('Creating task:', task);
   const updatedTask = { taskTitle : task.title,
                        taskDescription: task.description,
                        taskPriority: task.priority.toUpperCase(),
                        taskStatus: task.status.toUpperCase(),
                        taskDueDate: task.dueDate}; // Set default status to 'New'
    return this.http.post<Task>(this.createTaskUrl, updatedTask);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  assignTask(taskId: number, userId: number | undefined): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}${this.getTasksUrl}/${taskId}`, { assignedTo: userId });
  }
}
