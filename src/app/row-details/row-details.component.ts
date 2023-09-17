import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-row-details',
  template: `
    <h1>Spoken Languages</h1>
    <table *ngIf="items && items.length > 0" class="styled-table">
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of items">
          <td>{{ item.language }}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [
    `
    .styled-table {
      width: 100%;
      border-collapse: collapse;
      margin: 25px 0;
      font-size: 0.9em;
      font-family: sans-serif;
      text-align: left;
    }

    .styled-table thead tr {
      background-color: #009879;
      color: white;
      text-align: left;
    }

    .styled-table th,
    .styled-table td {
      padding: 12px 15px;
    }

    .styled-table tbody tr {
      border-bottom: 1px solid #dddddd;
    }

    .styled-table tbody tr:nth-of-type(even) {
      background-color: #f3f3f3;
    }

    .styled-table tbody tr:last-of-type {
      border-bottom: 2px solid #009879;
    }

    .styled-table tbody tr.active-row {
      font-weight: bold;
      color: #009879;
    }
    `
  ]
})
export class RowDetailsComponent implements OnInit {
  items: any[] = [];  // Initialize as an empty array

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');  // id is already a string, no need to convert to Number

    // Fetch data from API
    this.http.get<any[]>(`http://localhost:8080/api/countries/country/${id}`).subscribe(
      (data: any[]) => {
        this.items = data;  // Set the items array to the fetched data
      },
      error => {
        console.error('Failed to fetch data:', error);
      }
    );
  }
}
