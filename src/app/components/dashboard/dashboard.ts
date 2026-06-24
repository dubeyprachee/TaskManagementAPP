import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ChartsModule } from '../../charts.module';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { TaskService } from '../../services/task.service';
import type { Task , TaskSummary} from '../../models/task.model';

@Component({
  selector: 'app-dashboard',


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
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Completed Tasks' },{ data: [0, 0, 1, 0, 0, 6, 7], label: 'Pending Tasks' }]
  };
  public barChartType: ChartType = 'bar';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => this.calculateStats(tasks));
    this.taskService.getTasksSummary().subscribe(summary => this.loadChartData(summary));

  }

  calculateStats(tasks: any[]) {
    this.completedTasks = tasks.filter(t => t.taskStatus.toLowerCase() === 'completed').length;
    this.pendingTasks = tasks.filter(t => t.taskStatus.toLowerCase() === 'pending').length;
    this.overdueTasks = tasks.filter(t => t.taskStatus.toLowerCase() === 'overdue').length;
    this.pieChartData = {
      ...this.pieChartData,
      datasets: [{ ...this.pieChartData.datasets[0], data: [this.pendingTasks, this.completedTasks, this.overdueTasks] }]
    };
  }

  loadChartData(summary : TaskSummary) {

    this.barChartData = {
    ...this.barChartData,
      labels :summary.months,
      datasets: [
        {
          label : 'Completed Tasks',
          data: summary.compledtedCounts
         },
         {
           label : 'Pending Tasks',
           data: summary.pendingCounts
          }
      ]
    };
  }
}
