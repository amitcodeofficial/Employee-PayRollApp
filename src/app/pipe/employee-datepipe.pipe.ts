import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'employeeDatepipe'
})
export class EmployeeDatepipePipe implements PipeTransform {

  transform(value: any, startMonth:string, startYear:string): any {
    return value + '/' + startMonth + '/' + startYear;
  }

}
