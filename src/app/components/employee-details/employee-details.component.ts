import { Component, OnInit } from '@angular/core';
import { Department } from './employee-department.model';
import { Employee } from './employee.model';
import { EmployeeHttpService } from '../../service/employee-http.service';
import { map, Observable } from 'rxjs';
import { EmployeeResponse } from '../model/employeeResponse';
import { EmployeeDate } from '../model/employeeDate';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {

  displayedColumns: string[] = [
    'name',
    'gender',
    'department',
    'salary',
    'startDate',
    'actions',
  ];
  employeeDetails: Employee[] = [];

  constructor(private employeeHttpService : EmployeeHttpService) {}

  employeeResponse: EmployeeResponse = new EmployeeResponse([]);

  ngOnInit(): void {
    this.getEmployeeDetails()
  }

  date:string[]=[];
  employeeDate: EmployeeDate = new EmployeeDate("");
  employeeDateList: EmployeeDate[] = [this.employeeDate];

  getEmployeeDetails(){
    this.employeeHttpService.getRequest('/employee').subscribe((data) => {
      this.employeeResponse.data = data;
      this.employeeDetails = this.employeeResponse.data.data;
      this.employeeDate.date = (this.employeeDetails.map(e => e.startDay+"/"+e.startMonth+"/"+e.startYear)).toString();
      console.log(this.employeeDateList);
      console.log(this.employeeDetails);
    });
  }

}
