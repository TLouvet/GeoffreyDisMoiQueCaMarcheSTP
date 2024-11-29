import { Component } from '@angular/core';
import jsonData from '../../assets/space_travel_data.json';
import {
  BarChartModule,
  LineChartModule,
  NumberCardModule,
  PieChartModule,
} from '@swimlane/ngx-charts';
import { RouterOutlet } from '@angular/router';

/**
 * Je définis ces données uniquement pour vous.
 *
 * Tous les objets du json contiennent ces données
 */
type DataFromJson = {
  company: string;
  destination: string;
  price: number;
  date: string;
  rate: number;
  motive: string;
  satisfied: boolean;
  gender: 'M' | 'F' | 'N/A';
  shipType: string;
  travelClass: 'eco' | 'premios' | 'business';
  isMember: boolean;
}[];

type SingleData = {
  value: number;
  name: string;
}[];

type MultipleData = {
  name: string;
  series: SingleData;
}[];

/**
 * Pour les graphiques acceptant un seul jeu de données, si vous appelez cette fonction
 * avec un objet, elle le transformera en un tableau où chaque objet aura deux propriétés.
 *
 * Une propriété name représentant la clé et propriété value représentant une valeur.
 *
 * @example
 * ```ts
 * toSingleData({ a: 1, b: 2 }) -> [{ name: 'a', value: 1 }, { name: 'b', value: 2 }]
 * toSingleData({ satisfied: 10, unsatisfied: 20 }) -> [{ name: 'satisfied', value: 10 }, { name: 'unsatisfied', value: 20 }]
 * ```
 */
function toSingleData(data: Record<string, number>): SingleData {
  return Object.entries(data).map(([name, value]) => ({ name, value }));
}

/**
 *  Pour les graphiques acceptant plusieurs jeux de données
 *
 *  @example
 * ```ts
 * toMultipleData('Vaisseau 1', { satisfied: 1500, unsatisfied: 2500 }) -> [{ name: 'Vaisseau 1', series: [{ name: 'satisfied', value: 1500 }, { name: 'unsatisfied', value: 2500 }] }]
 * ```
 */
function toMultipleData(serie: string, data: any): MultipleData {
  return [
    {
      name: serie,
      series: toSingleData(data),
    },
  ];
}

@Component({
  selector: 'app-chart-page',
  standalone: true,
  imports: [],
  templateUrl: './chart-page.component.html',
  styleUrl: './chart-page.component.css',
})
export class ChartPageComponent {
  ngOnInit() {
    console.log('companies', [...new Set(jsonData.map((d) => d.company))]);
    console.log('destinations', [
      ...new Set(jsonData.map((d) => d.destination)),
    ]);
    console.log('ships', [...new Set(jsonData.map((d) => d.shipType))]);
    console.log('travelClasses', [
      ...new Set(jsonData.map((d) => d.travelClass)),
    ]);
    console.log('Motives', [...new Set(jsonData.map((d) => d.motive))]);
  }
}
