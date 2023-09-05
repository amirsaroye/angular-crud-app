import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { Employee } from '../employeeInterface';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-add-update',
  templateUrl: './add-update.component.html',
  styleUrls: ['./add-update.component.css']
})
export class AddUpdateComponent implements OnInit {

  @ViewChild('empForm') empForm: NgForm;
  
  public emp: Employee = {
    name: '',    
    department: '',
    salary: null
  };

  public submitBtnTxt: string = 'Submit';
  public selectedId: number;

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute){
    this.route.paramMap.subscribe( (param: ParamMap) =>{
      let id = param.get('id');
      if(parseInt(id)){
        this.selectedId = parseInt(id);
        this.submitBtnTxt = 'Update';
      }
    });
  }

  ngOnInit(): void {
    if(this.selectedId){
      this.emp = JSON.parse(this.apiService.getEmployee(this.selectedId));
    }
  }

  submitForm(form: NgForm): void {
    if (form.valid) {

      if(this.selectedId && this.selectedId > 0){
        let isUpdated = this.apiService.updateEmp(this.selectedId,this.emp);
        if(isUpdated){
          alert('Data updated successfully');
          this.router.navigate(['/home']);
        }
      }else{
        let isSubmitted = this.apiService.sendForm(this.emp);

        if(isSubmitted){
          this.empForm.reset();
          alert('Form submitted successfully');

          this.router.navigate(['/home']);
        }
        else{
          alert('Something went wrong. Please try again later.')
        }
      }
    }
  }
}
