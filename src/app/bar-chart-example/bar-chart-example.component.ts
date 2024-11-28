import { Component } from '@angular/core';
import {
  Color,
  ScaleType,
  BarChartModule,
  LegendPosition,
} from '@swimlane/ngx-charts';

@Component({
  selector: 'app-bar-chart-example',
  standalone: true,
  imports: [BarChartModule],
  templateUrl: './bar-chart-example.component.html',
  styleUrl: './bar-chart-example.component.css',
})
export class BarChartExampleComponent {
  // j'ai mis any[] mais {name: string, value: number}[] serait mieux
  data: any[] = [
    {
      name: 'Germany',
      value: 8940000,
    },
    {
      name: 'USA',
      value: 5000000,
    },
    {
      name: 'France',
      value: 7200000,
    },
  ];

  multi: any[] = [
    {
      name: 'Germany',
      series: [
        {
          name: '2010',
          value: 7300000,
        },
        {
          name: '2011',
          value: 8940000,
        },
      ],
    },
    {
      name: 'USA',
      series: [
        {
          name: '2010',
          value: 7870000,
        },
        {
          name: '2011',
          value: 8270000,
        },
      ],
    },
    {
      name: 'France',
      series: [
        {
          name: '2010',
          value: 5000002,
        },
        {
          name: '2011',
          value: 5800000,
        },
      ],
    },
  ];

  // La doc n'est pas très bonne sur la déclaration de view, mais c'est un tableau de 2 nombres
  view: [number, number] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  legendPosition = LegendPosition.Below;
  xAxisLabel: string = 'Population';

  // Attention, la doc du site n'est pas très bonne sur cete partie
  colorScheme: Color = {
    name: 'un_nom_comme_vous_voulez_peu_importe',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454'], // Vous pouvez mettre plusieurs couleurs
  };

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
