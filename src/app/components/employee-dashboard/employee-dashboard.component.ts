import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  addUserBtn(){
    this.router.navigateByUrl("/employee-registration").then(() => {window.location.reload();});
  }
}
