import { Component } from '@angular/core';
import data from '../assets/space_travel_data.json';
import {
  BarChartModule,
  LineChartModule,
  NumberCardModule,
  PieChartModule,
} from '@swimlane/ngx-charts';

type SingleData = {
  value: number;
  name: string;
}[];

type MultipleData = {
  name: string;
  series: SingleData;
}[];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NumberCardModule, PieChartModule, BarChartModule, LineChartModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  step1Result: SingleData = [];
  step2Result: SingleData = [];
  step3Result: SingleData = [];
  step4Result: SingleData = [];
  step5Result: SingleData = [];
  step6Result: SingleData = [];

  private toSingleData = (data: any) =>
    Object.entries(data).map(([name, value]) => ({ name, value }));
  private toMultipleData = (serie: string, data: any) => {
    return [
      {
        name: serie,
        series: Object.entries(data).map(([name, value]) => ({ name, value })),
      },
    ];
  };

  ngOnInit() {
    console.log('companies', [...new Set(data.map((d) => d.company))]);
    console.log('destinations', [...new Set(data.map((d) => d.destination))]);
    console.log('ships', [...new Set(data.map((d) => d.shipType))]);
    console.log('travelClasses', [...new Set(data.map((d) => d.travelClass))]);
    console.log(
      'numberof happy',
      data.filter((d) => d.satisfied).length,
      'total',
      data.length
    );
    console.log('Motives', [...new Set(data.map((d) => d.motive))]);
    console.log('Males', data.filter((d) => d.gender === 'M').length);
    console.log('Females', data.filter((d) => d.gender === 'F').length);
    console.log('Other', data.filter((d) => d.gender === 'N/A').length);

    console.log('travelersByCompanies', this.travelersByCompanies());
    console.log('satisfactionByGenderPie', this.satisfactionByPie());

    this.step1Result = this.step1();
    this.step2Result = this.step2();
    this.step3Result = this.step3();
    this.step4Result = this.step4();
    this.step5Result = this.step5();
    this.step6Result = this.step6();
    console.log('step6', this.step6Result);
  }

  view: [number, number] = [700, 200];

  // NUMBER CARDS
  // Etape 1 quelques cartes
  // Nombre de voyages
  // Prix moyen
  // Note moyenne
  step1() {
    return [
      {
        name: 'Nombre de voyages',
        value: data.length,
      },
      {
        name: 'Prix moyen',
        value: data.reduce((acc, curr) => acc + curr.price, 0) / data.length,
      },
      {
        name: 'Note moyenne / 5',
        value: data.reduce((acc, curr) => acc + curr.rate, 0) / data.length,
      },
    ];
  }

  // Etape 2
  // Nombre de voyages en eco
  // Nombre de voyages en premios
  // Nombre de voyages en business
  // Prix moyen en eco
  // Prix moyen en premios
  // Prix moyen en business
  step2() {
    const eco = data.filter((d) => d.travelClass === 'eco');
    const premios = data.filter((d) => d.travelClass === 'premios');
    const business = data.filter((d) => d.travelClass === 'business');

    const numberOfEco = eco.length;
    const numberOfPremios = premios.length;
    const numberOfBusiness = business.length;

    const sumOfEco = eco.reduce((acc, curr) => acc + curr.price, 0);
    const sumOfPremios = premios.reduce((acc, curr) => acc + curr.price, 0);
    const sumOfBusiness = business.reduce((acc, curr) => acc + curr.price, 0);

    return [
      {
        name: 'Voyages en eco',
        value: numberOfEco,
      },
      {
        name: 'Voyages en premios',
        value: numberOfPremios,
      },
      {
        name: 'Voyages en business',
        value: numberOfBusiness,
      },
      {
        name: 'Prix moyen en eco',
        value: sumOfEco / numberOfEco,
      },
      {
        name: 'Prix moyen en premios',
        value: sumOfPremios / numberOfPremios,
      },
      {
        name: 'Prix moyen en business',
        value: sumOfBusiness / numberOfBusiness,
      },
    ];
  }

  // Etape 3 - Pie chart pour représenter les motifs de voyages non satisfaits
  step3(): any {
    const filtereData = data
      .filter((d) => !d.satisfied)
      .map((d) => d.motive)
      .reduce<any>((acc, curr) => {
        if (!acc[curr]) {
          acc[curr] = 0;
        }

        acc[curr]++;
        return acc;
      }, {});

    return this.toSingleData(filtereData);
  }

  // Step 4 - Bar chart vertical pour représenter le nombre de voyages par compagnie
  step4(): any {
    const result = data.reduce<any>((acc, curr) => {
      if (!acc[curr.company]) {
        acc[curr.company] = 0;
      }

      acc[curr.company]++;
      return acc;
    }, {});

    return this.toSingleData(result);
  }

  // Step 5 - Bar chart horizontal pour représenter le nombre de voyages par destination
  step5(): any {
    const result = data.reduce<any>((acc, curr) => {
      if (!acc[curr.destination]) {
        acc[curr.destination] = 0;
      }

      acc[curr.destination]++;
      return acc;
    }, {});

    return this.toSingleData(result);
  }

  // Step 6 - Line chart pour représenter le nombre de voyages par jour
  step6(): any {
    const result = data.reduce<any>((acc, curr) => {
      const day = new Date(curr.date).getDate();
      if (!acc[day]) {
        acc[day] = 0;
      }

      acc[day]++;
      return acc;
    }, {});

    // this should return a multi series data
    return this.toMultipleData('voyageurs', result);
  }

  travelersByCompanies() {
    const filteredData = data.reduce<any>((acc, curr) => {
      if (!acc[curr.company]) {
        acc[curr.company] = 0;
      }

      acc[curr.company]++;
      return acc;
    }, {});

    return Object.entries(filteredData).map(([name, value]) => ({
      name,
      value,
    }));
  }

  satisfactionByPie() {
    const filtereData = data
      .map((d) =>
        d.satisfied
          ? { ...d, satisfied: 'satisfied' }
          : { ...d, satisfied: 'unsatisfied' }
      )
      .reduce<any>((acc, curr) => {
        if (!acc[curr.satisfied]) {
          acc[curr.satisfied] = 0;
        }

        acc[curr.satisfied]++;
        return acc;
      }, {});

    return Object.entries(filtereData).map(([name, value]) => ({
      name,
      value,
    }));
  }
}
