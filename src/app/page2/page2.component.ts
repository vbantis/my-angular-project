import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-page2',
  template: `
    <h1>Country Stats</h1>
    <div class="table-container">
      <table *ngIf="items.length > 0" class="business-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Country Code</th>
            <th>Year</th>
            <th>Population</th>
            <th>GDP</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of items">
            <td>{{ item.name }}</td>
            <td>{{ item.countryCode3 }}</td>
            <td>{{ item.year }}</td>
            <td>{{ item.population }}</td>
            <td>{{ item.gdp }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [
    `
    .table-container {
      overflow: auto;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      margin-top: 20px;
    }

    .business-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      border-radius: 10px;
      overflow: hidden;
    }

    th, td {
      padding: 12px 15px;
      border-bottom: 1px solid #ccc;
    }

    th {
      background: linear-gradient(45deg, #3f87a6, #ebf8e1, #f69d3c);
      color: white;
    }

    tbody tr:last-child td {
      border-bottom: none;
    }

    tbody tr:nth-child(even) {
      background-color: #f3f3f3;
    }

    tbody tr:hover {
      background-color: #eddcd2;
    }

    `
  ]
})
export class Page2Component implements OnInit {
  items: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get<any[]>('http://localhost:8080/api/countries/stats').subscribe(
      (data: any[]) => {
        this.items = data;
      },
      error => {
        console.error('Failed to fetch data:', error);
      }
    );
  }
}
