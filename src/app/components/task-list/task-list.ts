import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import type { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',


  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  updatedTasks: any[] = [];
  filteredTasks: Task[] = [];
  displayedColumns: string[] = ['title', 'status', 'priority', 'dueDate', 'actions'];
  filterStatus: string = 'all';
  searchQuery: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void { this.loadTasks(); }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;

      this.updatedTasks = this.tasks.map(task => {
        return {
          id: task.taskId,
          title: task.taskTitle,
          priority:task.taskPriority,
          status: task.taskStatus,
          dueDate: new Date(task.taskDueDate)
        };
      });

      console.log("Updated Tasks: ", this.updatedTasks, "Original Tasks: ", this.tasks, "Filtered Tasks: ", this.filteredTasks, "Displayed Columns: ", this.displayedColumns, "Filter Status: ", this.filterStatus, "Search Query: ", this.searchQuery)
      this.applyFilters();
    });
  }

  applyFilters() {
//   console.log("Applying Filters... Filter Status: ", this.filterStatus, "Search Query: ", this.searchQuery, "Updated Tasks: ", this.updatedTasks, "Filtered Tasks: ", this.filteredTasks, "Displayed Columns: ", this.displayedColumns, "Original Tasks: ", this.tasks, "Task Service: ", this.taskService, "Component Instance: ", this, "ngOnInit Called: ", this.ngOnInit,
  // "Load Tasks Called: ", this.loadTasks, "Apply Filters Called: ", this.applyFilters, "Delete Task Called: ", this.deleteTask);

    this.filteredTasks = this.updatedTasks.filter(task => {
      const matchesStatus = this.filterStatus === 'all' || task.status === this.filterStatus.toUpperCase();
      const matchesSearch = task.title?.toLowerCase().includes(this.searchQuery.toLowerCase()) || task.description?.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }

  deleteTask(id: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
    }
  }
    assignTo(id: number) {
      if (confirm('Are you sure you want to delete this task?')) {
        this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
      }
    }
}
