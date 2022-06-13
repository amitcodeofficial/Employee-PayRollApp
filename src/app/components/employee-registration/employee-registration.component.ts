import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Employee } from '../employee-details/employee.model';
import { Department } from '../employee-details/employee-department.model';
import { EmployeeHttpService } from 'src/app/service/employee-http.service';

@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.css'],
})
export class EmployeeRegistrationComponent implements OnInit {

  constructor(private employeeService: EmployeeHttpService) {}

  ngOnInit(): void {
    this.departmentsList = [
      { id: 1, select: false, name: 'HR' },
      { id: 2, select: false, name: 'Sales' },
      { id: 3, select: false, name: 'Finance' },
      { id: 4, select: false, name: 'Engineer' },
      { id: 5, select: false, name: 'Others' },
    ];
    console.log(this.departmentsList);
  }

  depart: Department = new Department('');
  departmentsList: any[] = [];

  selectedGender(value: string) {
    this.employee.gender = value;
  }

  selectedProfileImg(value: string) {
    this.employee.profileImg = value;
  }

  selectedDepartment(event:any) {
    this.depart.departmentName = event.source.value;
    console.log(this.depart.departmentName);
  }

  registrationForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    notes: new FormControl(null, [Validators.required]),
    selectSalary: new FormControl(null, [Validators.required]),
    selectDay: new FormControl(null, [Validators.required]),
    selectMonth: new FormControl(null, [Validators.required]),
    selectYear: new FormControl(null, [Validators.required]),
  });

  employee: Employee = new Employee(
    '',
    '',
    '',
    this.departmentsList,
    '',
    '',
    '',
    '',
    ''
  );

  submit() {
    this.employeeService.addEmployee(this.employee).subscribe((data) => {
      console.log(data);
    })
    console.log(this.registrationForm.get('name')?.value);
    alert('Submitted');
  }
}
