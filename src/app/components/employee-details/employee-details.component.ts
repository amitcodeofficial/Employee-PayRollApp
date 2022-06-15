import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Department } from './employee-department.model';
import { Employee } from './employee.model';
import { EmployeeHttpService } from '../../service/employee-http.service';
import { map, Observable } from 'rxjs';
import { EmployeeResponse } from '../model/employeeResponse';
import { EmployeeDate } from '../model/employeeDate';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  constructor(
    private employeeHttpService: EmployeeHttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEmployeeDetails();
  }

  displayedColumns: string[] = [
    'name',
    'gender',
    'department',
    'salary',
    'startDate',
    'actions',
  ];
  employeeDetails: Employee[] = [];

  employeeResponse: EmployeeResponse = new EmployeeResponse([]);

  date: string[] = [];
  employeeDate: EmployeeDate = new EmployeeDate('');
  employeeDateList: EmployeeDate[] = [this.employeeDate];
  employeeUpdate: any=[];

  getEmployeeDetails() {
    this.employeeHttpService.getRequest('/employee').subscribe((data) => {
      this.employeeResponse.data = data;
      this.employeeDetails = this.employeeResponse.data.data;
      this.employeeDate.date = this.employeeDetails
        .map((e) => e.startDay + '/' + e.startMonth + '/' + e.startYear)
        .toString();
      console.log(this.employeeDateList);
      console.log(this.employeeDetails);
    });
  }

  getEmployees() {
    this.employeeHttpService.getRequest('/employee').subscribe((data) => {
      this.employeeResponse.data = data;
      return this.employeeResponse.data.data;
    });
  }

  deleteEmployeeFromTable(name: string) {
    this.employeeHttpService.deleteEmployee(name).subscribe((data) => {
      this.employeeResponse.data = data;
      console.log(this.employeeResponse.data);
    });
  }

  // @Output() event = new EventEmitter<any>();

  updateEmployee(name: string) {
    this.employeeUpdate = this.employeeDetails.filter(
      (data) => data.name === name
    );
    console.log(this.employeeUpdate);
    // this.event.emit(this.employeeUpdate);
    this.employeeHttpService.sendEmployeeDetails(this.employeeUpdate);
    this.router
      .navigateByUrl('/employee-registration');
  }
}
