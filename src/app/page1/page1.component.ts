import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-page1',
  template: `
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Area</th>
          <th>Country Code 2</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of items" (click)="navigateToDetails(item.countryId)">
          <td>{{ item.name }}</td>
          <td>{{ item.area }}</td>
          <td>{{ item.countryCode2 }}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [
    `
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }

    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }

    th {
      background-color: #4CAF50;
      color: white;
    }

    tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    tr:hover {
      background-color: #f5f5f5;
      cursor: pointer;
    }
    `
  ]
})
export class Page1Component implements OnInit {
  items: any[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.http.get<any[]>('http://localhost:8080/api/countries').subscribe(
      (data: any[]) => {
        this.items = data.sort((a, b) => a.name.localeCompare(b.name));
      },
      error => {
        console.error('Failed to fetch data:', error);
      }
    );
  }

  navigateToDetails(countryId: number): void {
    this.router.navigate(['/page1', countryId]);
  }
}
