import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { Employee } from '../employee-details/employee.model';
import { Department } from '../employee-details/employee-department.model';
import { EmployeeHttpService } from 'src/app/service/employee-http.service';
import { EmployeeResponse } from '../model/employeeResponse';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.css'],
})
export class EmployeeRegistrationComponent implements OnInit {
  depart: Department = new Department('');
  userDepartment: any = [];
  departmentsList: any[] = [];
  employeeResponse: EmployeeResponse = new EmployeeResponse([]);
  // getEmployeeUpdateDetails: Employee[] = [];
  getEmployeeUpdateDetails: any[] = [];
  tempOk: Observable<EmployeeResponse> = new Observable();
  tempEmp: Employee = new Employee('', '', '', [], '', '', '', '', '');
  tempEmpName: any;

  constructor(
    private employeeService: EmployeeHttpService,
    private employeeHttpService: EmployeeHttpService
  ) {}

  ngOnInit(): void {
    this.departmentsList = [
      { id: 1, select: false, name: 'HR' },
      { id: 2, select: false, name: 'Sales' },
      { id: 3, select: false, name: 'Finance' },
      { id: 4, select: false, name: 'Engineer' },
      { id: 5, select: false, name: 'Others' },
    ];
    console.log(this.departmentsList);

    this.employeeHttpService.getRequest('/department').subscribe((data) => {
      this.departmentsList = data.data;
      console.log(this.departmentsList);
    });
    console.log(this.departmentsList);

    this.getEmployeeUpdateDetails =
      this.employeeHttpService.getEmployeeToBeUpdated();

    console.log(this.getEmployeeUpdateDetails);
  }

  selectedGender(value: string) {
    this.employee.gender = value;
  }

  selectedProfileImg(value: string) {
    this.employee.profileImg = value;
  }

  selectedDepartment(department: any) {
    this.userDepartment.push(department);
    // this.registrationForm.get('department')?.value?.push(department);
  }

  registrationForm = new FormGroup({
    profileImg: new FormControl(''),
    gender: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    notes: new FormControl(null, [Validators.required]),
    salary: new FormControl(0, [Validators.required]),
    startDay: new FormControl(null, [Validators.required]),
    startMonth: new FormControl(null, [Validators.required]),
    startYear: new FormControl(null, [Validators.required]),
    department: new FormControl([]),
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

  tempEmployee: any;
  tempName: any;
  tempBoolean: any;
  submit() {
    this.tempEmployee = this.registrationForm.getRawValue();
    this.tempEmployee.department = this.userDepartment;A
    this.tempName = this.registrationForm.getRawValue().name;
    console.log(this.tempName);
    console.log(this.tempEmployee);
    this.employeeHttpService.checkEmployee(this.tempName).subscribe((data) => {
      console.log(this.tempName);
      this.employeeResponse.data = data.data;
      console.log(this.employeeResponse.data);
      // this.tempBoolean = this.employeeResponse.data;
      // if(this.employeeResponse.data===true){
      //   console.log("Update Okkk");
      //   console.log(this.tempEmployee);
      //   this.employeeService.updateEmployee(this.registrationForm.getRawValue(),this.registrationForm.get('name')?.value).subscribe((data2) => console.log(data2));
      //   alert("Employee Updated Successfully");
      // }else{
      //   console.log("Add ok");
      //   console.log(this.tempEmployee);
      //   this.employeeService.addEmployee(this.tempEmployee).subscribe((data3) => console.log(data3));
      //   alert("Employee Added Successfully");
      // }
    });
    if (this.employeeResponse.data === true) {
      console.log('Update Okkk');
      console.log(this.tempEmployee);
      // this.registrationForm.get('department')?.setValue(this.userDepartment);
      this.employeeService
        .updateEmployee(
          this.registrationForm.getRawValue(),
          this.registrationForm.get('name')?.value
        )
        .subscribe((data2) => console.log(data2));
      alert('Employee Updated Successfully');
    } else {
      console.log('Add ok');
      console.log(this.tempEmployee);
      // this.registrationForm.get('department')?.setValue(this.userDepartment);
      this.employeeService
        .addEmployee(this.tempEmployee)
        .subscribe((data3) => console.log(data3));
      alert('Employee Added Successfully');
    }

    // this.registrationForm.get('department')?.setValue(this.userDepartment);
    // this.employeeService.addEmployee(this.registrationForm.getRawValue()).subscribe((data) => {
    //   console.log(data);
    // });
    // console.log(this.registrationForm.get('name')?.value);
    // alert('Submitted');
  }
}
