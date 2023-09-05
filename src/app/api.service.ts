import { Injectable } from '@angular/core';
import { Employee } from './employeeInterface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private employees: number[] = []; //to keep track of saved employees

  constructor() { }

  sendForm(empData: Employee): boolean{
    let toSaveEmp = empData;

    this.employees = JSON.parse(localStorage.getItem('employeesArray'));
    let lastEmpNumber: number;
    let nextEmpNumber: number;

    if(this.employees?.length){
      lastEmpNumber = this.employees[this.employees.length - 1];
      nextEmpNumber = lastEmpNumber + 1;
    }
    else{
      nextEmpNumber = 1; //first employee
      this.employees = [];
    }

    toSaveEmp['id'] = nextEmpNumber;
    localStorage.setItem('Emp-'+nextEmpNumber,JSON.stringify(toSaveEmp));

    this.employees.push(nextEmpNumber);
    localStorage.setItem('employeesArray',JSON.stringify(this.employees));

    return true;
  }

  getEmployess(){
    this.employees = JSON.parse(localStorage.getItem('employeesArray'));
    let employees = [];

    for(let i=0; i< this.employees.length; i++){
      // console.log(localStorage.getItem('Emp-'+(i+1)))
      employees.push(JSON.parse(localStorage.getItem('Emp-'+(i+1))));
    }
    return employees;
  }

  deleteEmployee(id: number): boolean{

    localStorage.removeItem('Emp-'+id);
    this.employees = JSON.parse(localStorage.getItem('employeesArray'));

    this.employees = this.employees.filter(i => i !== id);

    localStorage.setItem('employeesArray',JSON.stringify(this.employees));

    return true;
  }

  getEmployee(id: number){
    return (localStorage.getItem('Emp-'+id));
  }

  updateEmp(id: number, updatedEmp: Employee): boolean{
    let toSaveEmp = updatedEmp;

    toSaveEmp['id'] = id;
    localStorage.removeItem('Emp-'+id);
    localStorage.setItem('Emp-'+id,JSON.stringify(toSaveEmp));

    return true;
  }
}
