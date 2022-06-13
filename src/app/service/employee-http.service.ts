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

  getRequest(url: string) {
    return this.httpClient.get(this.baseUrl + url);
  }

  getEmployee() : Observable<EmployeeResponse> {
    return this.httpClient.get<EmployeeResponse>(this.baseUrl);
  }

  addEmployee(employee: Employee){
    return this.httpClient.post(this.baseUrl+'/employee', employee);
  }
}
