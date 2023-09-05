import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public fetchedEmployees = [];
  public sortOrder: string;
  public uniqueDepartments = new Set<string>();

  constructor(private apiService: ApiService, private router: Router){}

  ngOnInit(): void {
    this.fetchedEmployees = this.apiService.getEmployess();
    for (const employee of this.fetchedEmployees) {
      this.uniqueDepartments.add(employee.department);
    }
  }

  deleteEmp(id: number){
    let sureDelete: boolean = confirm('Are you sure you want to delete this row');
    if(sureDelete){
      let isDeleted: boolean = this.apiService.deleteEmployee(id);

      if(isDeleted){
        const index = this.fetchedEmployees.findIndex(emp => emp.id === id);
        if (index !== -1) {
          this.fetchedEmployees.splice(index, 1); // Remove employee from the fetched array
        }
      }
    }
  }

  updateEmp(id: number){
    this.router.navigate(['/update/'+id]);
  }

  sortSalary(){
    this.sortOrder = this.sortOrder === 'dsc' ? 'asc' : 'dsc';

    if(this.sortOrder === 'asc'){
      this.fetchedEmployees.sort((a, b) => a.salary - b.salary);
    }else{
      this.fetchedEmployees.sort((a, b) => b.salary - a.salary);
    }
  }

  filterDepartments(event: any){
    this.ngOnInit(); // to refresh the employees array because it may be already filtered
    if(this.uniqueDepartments.has(event.target.value)){
     this.fetchedEmployees = this.fetchedEmployees.filter((employee) => employee.department === event.target.value);
    }
  }
}
