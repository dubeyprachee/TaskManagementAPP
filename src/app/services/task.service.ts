import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private mockTasks: Task[] = [
    { id: 1, title: 'Fix bug A', description: 'Description A', dueDate: '2023-10-01', status: 'completed', priority: 'high' },
    { id: 2, title: 'Develop feature B', description: 'Description B', dueDate: '2023-11-15', status: 'pending', priority: 'medium' },
    { id: 3, title: 'Review PR C', description: 'Description C', dueDate: '2023-09-20', status: 'overdue', priority: 'low' },
  ];

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return of(this.mockTasks);
  }

  getTaskById(id: number): Observable<Task> {
    const task = this.mockTasks.find(t => t.id === id);
    return of(task!);
  }

  createTask(task: Task): Observable<Task> {
    const newTask = { ...task, id: Date.now() };
    this.mockTasks.push(newTask);
    return of(newTask);
  }

  updateTask(task: Task): Observable<Task> {
    const index = this.mockTasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.mockTasks[index] = task;
    }
    return of(task);
  }

  deleteTask(id: number): Observable<void> {
    this.mockTasks = this.mockTasks.filter(t => t.id !== id);
    return of(undefined);
  }
}
