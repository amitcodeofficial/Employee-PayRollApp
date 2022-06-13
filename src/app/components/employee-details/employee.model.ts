import { Department } from './employee-department.model';

export class Employee {
  profileImg: string;
  name: string;
  gender: string;
  department: any[];
  salary: string;
  startDay: string;
  startMonth: string;
  startYear: string;
  notes: string;

  constructor(
    profileImg: string,
    name: string,
    gender: string,
    department: any[],
    salary: string,
    startDay: string,
    startMonth: string,
    startYear: string,
    notes: string
  ) {
    this.profileImg = profileImg;
    this.name = name;
    this.gender = gender;
    this.department = department;
    this.salary = salary;
    this.startDay = startDay;
    this.startMonth = startMonth;
    this.startYear = startYear;
    this.notes = notes;
  }
}
