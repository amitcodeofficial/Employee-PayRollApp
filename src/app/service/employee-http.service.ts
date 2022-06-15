import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../components/employee-details/employee.model';
import { EmployeeResponse } from '../components/model/employeeResponse';

@Injectable({
  providedIn: 'root',
})
export class EmployeeHttpService {
  baseUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  getRequest(url: string): Observable<EmployeeResponse> {
    return this.httpClient.get<EmployeeResponse>(this.baseUrl + url);
  }

  getEmployee(): Observable<EmployeeResponse> {
    return this.httpClient.get<EmployeeResponse>(this.baseUrl);
  }

  addEmployee(employee: any) {
    return this.httpClient.post(this.baseUrl + '/employee', employee);
  }

  deleteEmployee(name: string) {
    return this.httpClient.delete(this.baseUrl + '/employee/' + name);
  }

  updateEmployee(employee: any, name: any) {
    return this.httpClient.put(this.baseUrl + '/employee/' + name, employee);
  }

  // checkEmployee(employee: Employee) {
  //   return this.httpClient.post(this.baseUrl+'/employeeE', employee);
  // }
  checkEmployee(name: string): Observable<EmployeeResponse> {
    return this.httpClient.get<EmployeeResponse>(
      this.baseUrl + '/employee' + '/check/' + name
    );
  }

  sendEmployee: Employee[] = [];
  tempEmp: Employee = new Employee('','','',[],'','','','','');

  sendEmployeeDetails(employee: Employee) {
    this.tempEmp.name = employee.name;
    this.tempEmp.profileImg = employee.profileImg;
    this.tempEmp.gender = employee.gender;
    this.tempEmp.notes = employee.notes;
    this.tempEmp.department = employee.department;
    this.tempEmp.salary = employee.salary;
    this.tempEmp.startDay = employee.startDay;
    this.tempEmp.startMonth = employee.startMonth;
    this.tempEmp.startYear = employee.startYear;
    console.log(employee);
    this.sendEmployee.push(this.tempEmp);
  }

  getEmployeeToBeUpdated() {
    return this.sendEmployee;
  }
}
