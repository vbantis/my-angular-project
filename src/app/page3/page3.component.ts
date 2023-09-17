import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-page3',
  template: `
    <h1>Country Continents and Regions</h1>
    <form [formGroup]="filterForm">
      <select formControlName="regionName">
        <option value="">Select Region</option>
        <option *ngFor="let region of uniqueRegions">{{ region }}</option>
      </select>
      <input type="number" formControlName="yearFrom" placeholder="Year From">
      <input type="number" formControlName="yearTo" placeholder="Year To">
      <button type="button" (click)="applyFilter()">Apply</button>
    </form>
    <div class="table-container">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Continent Name</th>
            <th>Region Name</th>
            <th>Country Name</th>
            <th>Year</th>
            <th>Population</th>
            <th>GDP</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of getCurrentPageItems()">
            <td>{{ item.continentName }}</td>
            <td>{{ item.regionName }}</td>
            <td>{{ item.countryName }}</td>
            <td>{{ item.year }}</td>
            <td>{{ item.population }}</td>
            <td>{{ item.gdp }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination">
      <button (click)="currentPage = currentPage - 1" [disabled]="currentPage === 1">Previous</button>
      <span>Page {{currentPage}}</span>
      <button (click)="currentPage = currentPage + 1" [disabled]="currentPage === getTotalPages()">Next</button>

    </div>
  `,
  styles: [`
    /* ... existing styles ... */
    .table-container {
    overflow: auto;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0,0,0,0.15);
  }
  .styled-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 1em;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-align: left;
    width: 100%;
    border: 1px solid #ccc;
  }
  .styled-table thead tr {
    background-color: #24478f;
    color: white;
    text-align: left;
  }
  .styled-table th,
  .styled-table td {
    padding: 16px 24px;
    border-bottom: 1px solid #ccc;
  }
  .styled-table tbody tr {
    transition: background-color .3s ease;
  }
  .styled-table tbody tr:nth-of-type(odd) {
    background-color: #f3f4f6;
  }
  .styled-table tbody tr:nth-of-type(even) {
    background-color: #e5e7eb;
  }
  .styled-table tbody tr:hover {
    background-color: #ffcc00;
    transition: background-color .3s ease;
    cursor: pointer;
  }
    .pagination {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  `]
})
export class Page3Component implements OnInit {
  Math = Math;
  items: any[] = [];
  filterForm: FormGroup;
  filteredItems: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      regionName: [''],
      yearFrom: [''],
      yearTo: ['']
    });
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/api/countries/continents').subscribe(
      (data: any[]) => {
        this.items = data;
        this.filteredItems = [...this.items];
        this.totalItems = this.filteredItems.length;
      },
      error => {
        console.error('Failed to fetch data:', error);
      }
    );
  }

  get uniqueRegions(): string[] {
    const regions = this.items.map(item => item.regionName);
    return Array.from(new Set(regions));
  }

  applyFilter() {
    const { regionName, yearFrom, yearTo } = this.filterForm.value;
    this.filteredItems = this.items.filter(item => {
      return ( !regionName || item.regionName === regionName) &&
             ( !yearFrom || item.year >= yearFrom) &&
             ( !yearTo || item.year <= yearTo);
    });
    this.totalItems = this.filteredItems.length;
    this.currentPage = 1; // Reset to the first page
  }

  getCurrentPageItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredItems.slice(startIndex, startIndex + this.itemsPerPage);
  }
}
