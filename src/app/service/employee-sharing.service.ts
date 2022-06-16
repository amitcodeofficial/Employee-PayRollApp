import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../components/employee-details/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeSharingService {

  // employee: Employee='';


  public employeeUpdate= new BehaviorSubject<any>('');

  constructor() { }

  sendInfo(data: any){
    this.employeeUpdate.next(data);
  }
}
