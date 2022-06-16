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
import { EmployeeSharingService } from '../../service/employee-sharing.service';

@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.css'],
})
export class EmployeeRegistrationComponent implements OnInit {
  userDepartment: any = [];
  departmentsList: any[] = [];
  employeeResponse: EmployeeResponse = new EmployeeResponse([]);

  tempEmployeeU: any;

  tempOK: string = '';

  // Temp Employee Details
  tempEmployeeName: string = '';
  tempEmployeeGender: string = '';
  tempEmployeeNotes: string = '';
  tempEmployeeProfileImg: string = '';
  tempEmployeeSalary: string = '';
  tempEmployeeStartDay: string = '';
  tempEmployeeStartMonth: string = '';
  tempEmployeeStartYear: string = '';
  tempEmployeeDepartment: any[] = [];

  constructor(
    private employeeService: EmployeeHttpService,
    private employeeHttpService: EmployeeHttpService,
    private employeeSharing: EmployeeSharingService
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

    this.employeeSharing.employeeUpdate.subscribe((data) => {
      this.tempEmployeeU = data;
      console.log('Employee Sharing');
      console.log(data);
    });

    this.registrationForm = new FormGroup({
      id: new FormControl(this.tempEmployeeU.id),
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

    // this.getEmployeeUpdateDetails=this.employeeHttpService.getEmployeeToBeUpdated();
    // this.tempEmployeeU = this.employeeHttpService.getEmployeeToBeUpdated();
    // console.log('Register U');
    // console.log(this.tempEmployeeU);

    // console.log(this.tempEmployeeU[0]);
    // console.log(this.getEmployeeUpdateDetails);
    // this.tempEmployeeName=this.tempEmployeeU[0].name;
    // console.log(this.tempEmployeeName);
    // if (this.tempEmployeeU === undefined) {
    //   console.log('none');
    // } else {
    //   console.log('Undefined getting');
    //   this.tempEmployeeName = this.tempEmployeeU[0].name;
    //   this.tempEmployeeGender = this.tempEmployeeU[0].gender;
    //   this.tempEmployeeNotes = this.tempEmployeeU[0].notes;
    //   this.tempEmployeeProfileImg = this.tempEmployeeU[0].profileImg;
    //   this.tempEmployeeSalary = this.tempEmployeeU[0].salary;
    //   this.tempEmployeeStartDay = this.tempEmployeeU[0].startDay;
    //   this.tempEmployeeStartMonth = this.tempEmployeeU[0].startMonth;
    //   this.tempEmployeeStartYear = this.tempEmployeeU[0].startYear;
    //   // this.tempEmployeeDepartment=this.tempEmployeeU[0].department;
    // }
  }

  // selectedGender(value: string) {
  //   this.employee.gender = value;
  // }

  // selectedProfileImg(value: string) {
  //   this.employee.profileImg = value;
  // }

  selectedDepartment(department: any) {
    this.userDepartment.push(department);
    // this.registrationForm.get('department')?.value?.push(department);
  }

  registrationForm = new FormGroup({
    id: new FormControl(0),
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

  // employee: Employee = new Employee(
  //   '',
  //   '',
  //   '',
  //   this.departmentsList,
  //   '',
  //   '',
  //   '',
  //   '',
  //   ''
  // );

  tempEmployee: any;
  tempName: any;
  tempBoolean: any;
  submit() {
    this.tempEmployee = this.registrationForm.getRawValue();
    this.tempEmployee.department = this.userDepartment;
    console.log('Temporary');
    console.log(this.tempEmployee);

    if(this.tempEmployee.id===null){
      alert("Employee Added");
      this.employeeHttpService.addEmployee(this.tempEmployee).subscribe((data) => console.log(data));
    }else{
      alert("Employee Updated");
      this.employeeHttpService.updateEmployeeNew(this.tempEmployee).subscribe((data) => console.log(data));
    }





    // if (this.tempOK === undefined) {
    //   this.tempOK = '';
    // } else {
    //   console.log(this.tempOK);
    // }
    // this.tempName = this.registrationForm.getRawValue().name;
    // console.log(this.tempName);
    // console.log(this.tempEmployee);
    // this.employeeHttpService.checkEmployee(this.tempOK).subscribe((data) => {
    //   console.log(this.tempEmployeeU[0].name);
    //   this.employeeResponse.data = data.data;
    //   console.log(this.employeeResponse.data);
    //   // this.tempBoolean = this.employeeResponse.data;
    //   // if(this.employeeResponse.data===true){
    //   //   console.log("Update Okkk");
    //   //   console.log(this.tempEmployee);
    //   //   this.employeeService.updateEmployee(this.registrationForm.getRawValue(),this.registrationForm.get('name')?.value).subscribe((data2) => console.log(data2));
    //   //   alert("Employee Updated Successfully");
    //   // }else{
    //   //   console.log("Add ok");
    //   //   console.log(this.tempEmployee);
    //   //   this.employeeService.addEmployee(this.tempEmployee).subscribe((data3) => console.log(data3));
    //   //   alert("Employee Added Successfully");
    //   // }
    // });
    // if (this.employeeResponse.data === 'True') {
    //   console.log('Update Okkk');
    //   console.log(this.tempEmployee);
    //   // this.registrationForm.get('department')?.setValue(this.userDepartment);
    //   this.employeeService
    //     .updateEmployee(this.registrationForm.getRawValue(), this.tempOK)
    //     .subscribe((data2) => console.log(data2));
    //   alert('Employee Updated Successfully');
    // } else {
    //   console.log('Add ok');
    //   console.log(this.tempEmployee);
    //   // this.registrationForm.get('department')?.setValue(this.userDepartment);
    //   this.employeeService
    //     .addEmployee(this.tempEmployee)
    //     .subscribe((data3) => console.log(data3));
    //   alert('Employee Added Successfully');
    // }

    // // this.registrationForm.get('department')?.setValue(this.userDepartment);
    // // this.employeeService.addEmployee(this.registrationForm.getRawValue()).subscribe((data) => {
    // //   console.log(data);
    // // });
    // // console.log(this.registrationForm.get('name')?.value);
    // // alert('Submitted');
  }
}
