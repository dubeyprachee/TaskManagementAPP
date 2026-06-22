import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  completedTasks = 0;
  pendingTasks = 0;
  overdueTasks = 0;

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: { legend: { display: true, position: 'top' } }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Pending', 'Completed', 'Overdue'],
    datasets: [{ data: [0, 0, 0], backgroundColor: ['#ffe0b2', '#c8e6c9', '#ffcdd2'] }]
  };
  public pieChartType: ChartType = 'pie';

  public barChartOptions: ChartConfiguration['options'] = { responsive: true };
  public barChartData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Completed Tasks' }]
  };
  public barChartType: ChartType = 'bar';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => this.calculateStats(tasks));
  }

  calculateStats(tasks: Task[]) {
    this.completedTasks = tasks.filter(t => t.status === 'completed').length;
    this.pendingTasks = tasks.filter(t => t.status === 'pending').length;
    this.overdueTasks = tasks.filter(t => t.status === 'overdue').length;
    this.pieChartData = {
      ...this.pieChartData,
      datasets: [{ ...this.pieChartData.datasets[0], data: [this.pendingTasks, this.completedTasks, this.overdueTasks] }]
    };
  }
}
