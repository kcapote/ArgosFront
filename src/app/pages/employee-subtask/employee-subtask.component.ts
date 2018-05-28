import { Component, OnInit } from '@angular/core';
import { Util } from '../../util/util';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeSubTask } from '../../interfaces/employee-subtask';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-employee-subtask',
  templateUrl: './employee-subtask.component.html',
  styles: []
})
export class EmployeeSubtaskComponent implements OnInit {

  urlProjects: string = Util.URL_POJECTS; 
  urlEmployees: string = Util.URL_PROJECT_EMPLOYEES;

  form: FormGroup;
  idProject: any;
  idEmployee:any;
  

  collection: EmployeeSubTask[] = [];
  item: EmployeeSubTask;


  constructor(private _ps: ProviderService) { }

  ngOnInit() {

    this.form = new FormGroup(
      {
        project: new FormControl('',Validators.required),
        employee: new FormControl('',Validators.required)
      })

  }

  updateId(){
    this.idProject = this.form.get('project').value['_id'];
  }
  
  updateIdEmployee(){
    this.idEmployee = this.form.get('employee').value['_id'];
  } 

  query(){
    this._ps.getObjectsAny(Util.URL_EMPLOYEE_SUBTASK+'/employee/'+this.idProject+'/'+this.idEmployee).subscribe(
      res => {           
        this._ps.refresToken(res);
        this.collection = res.employeeSubTasks;
      }   
   );

  }



}
