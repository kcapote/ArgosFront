import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Util } from '../../util/util';
import { ValidTypesTasks } from '../../enums/valid-types-tasks.enum';
import { ProviderService } from '../../services/provider.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-assign-tasks',
  templateUrl: './assign-tasks.component.html',
  styles: []
})
export class AssignTasksComponent implements OnInit {
  
  urlProjects: string = Util.URL_POJECTS; 
  urlEmployees: string = Util.URL_PROJECT_EMPLOYEES;
  urlFloors: string = Util.URL_FLOORS;
  urlDepartments: string = Util.URL_DEPARTMENTS;
  urlTasks = Util.URL_TASKS;
  urlSubTasks = Util.URL_SUB_TASKS;
  urlCommonServices = Util.URL_COMMON_SERVICES;

  form: FormGroup;
  idProject = "";
  idFloor = "";
  taskType = ""
  idTask = "";
  
  

  enumType = Object.keys(ValidTypesTasks).map(
    r => {
      return ValidTypesTasks[r]
    }
  ) ;

  constructor(private _ps: ProviderService) { 
    // this._ps.getObjectsByFather(Util.URL_PROJECT_EMPLOYEES,'project',0,'5b009c6c113c341e571699f2').subscribe(
    //   res => {
    //       console.log(res);
          
    //   }
    // )

  }


  ngOnInit() {
    this.form = new FormGroup(
      {
        project: new FormControl('',Validators.required),
        employee: new FormControl('',Validators.required),
        area: new FormControl('', Validators.required),
        floor: new FormControl(),
        department: new FormControl(),
        subtask: new FormControl(),
        task: new FormControl(),
        commonServices: new FormControl()   
      }

    )

  }


  updateId(){
    this.idProject = this.form.get('project').value;
  }
  
  updateIdFloor(){
    this.idFloor = this.form.get('floor').value;
  } 
  
  updateType(){
    this.taskType = this.form.get('area').value;
    //this.urlCommonServices = this.urlCommonServices + 

  }
  
  updateIdTask(){
    this.idTask = this.form.get('task').value;
  }

}
