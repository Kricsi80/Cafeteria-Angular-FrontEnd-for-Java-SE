import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-employee-riport',
  templateUrl: './employee-riport.component.html',
  styleUrls: ['./employee-riport.component.css']
})
export class EmployeeRiportComponent implements OnInit {

  // month list for selection
   months = [
    { name: 'Január', value: 1 },
    { name: 'Február', value: 2 },
    { name: 'Március', value: 3 },
    { name: 'Április', value: 4 },
    { name: 'Május', value: 5 },
    { name: 'Június', value: 6 },
    { name: 'Július', value: 7 },
    { name: 'Augusztus', value: 8 },
    { name: 'Szeptember', value: 9 },
    { name: 'Október', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 },
  ];

   selectedMonth: number;

  // variables for loading/error/data output
   loading = false;
   error = false;
   hasData = false;
   initial = false;

  // data for the table
   allEmployeeDebt = new MatTableDataSource();

  // name and order of the data in the table
   displayedColumns: string[] = ['employeeName', 'debt'];

  constructor(private ds: DataService) { }

  ngOnInit() {
  }

  // function on selecting month
  onMonthSelect(): void {
    // set variables
    this.hasData = false;
    this.error = false;
    this.loading = true;
    this.initial = true;
    // get data from service
    this.ds.getDebtOfEmployeesByMonth(this.selectedMonth).subscribe(
        employee => {
        // fill up data for the table
        this.allEmployeeDebt.data = employee;
        // hide loader
        this.loading = false;
        if (this.allEmployeeDebt.data.length > 0) {
          this.hasData = true;
        }
      },
      err => {
        // if couldnt get data, hide loader, hide nodata, show error
        this.loading = false;
        this.hasData = true;
        this.error = true;
      }
      );
  }
}
