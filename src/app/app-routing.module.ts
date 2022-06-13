import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeeRegistrationComponent } from './components/employee-registration/employee-registration.component';

const routes: Routes = [
  {path: '', component: EmployeeDashboardComponent,
  children: [{path: '',component: EmployeeDetailsComponent}]
},
{path:'employee-registration', component: EmployeeRegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
