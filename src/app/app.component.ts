import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PieChartExampleComponent } from './pie-chart-example/pie-chart-example.component';
import { BarChartExampleComponent } from './bar-chart-example/bar-chart-example.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PieChartExampleComponent, BarChartExampleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
