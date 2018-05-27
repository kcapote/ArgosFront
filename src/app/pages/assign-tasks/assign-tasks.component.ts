import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Util } from '../../util/util';
import { ValidTypesTasks } from '../../enums/valid-types-tasks.enum';
import { ProviderService } from '../../services/provider.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventEmitter } from 'protractor';
import { CommonService } from '../../interfaces/common-services.interface';
import { EmployeeSubTask } from '../../interfaces/employee-subtask';

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
  idProject: any;
  idFloor:any;
  taskType = "";
  idTask: any;
  

  collection: EmployeeSubTask[] = [];
  item: EmployeeSubTask;

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
        floor: new FormControl(''),
        department: new FormControl(''),
        subTask: new FormControl('',Validators.required),
        task: new FormControl('',Validators.required),
        commonService: new FormControl(''),
        recordDate: new FormControl('',Validators.required),
        hoursWorked: new FormControl('', [Validators.required, Validators.min(1), Validators.max(24) ])    
      }

    )

  }


  // employee: any;
  // subTask: any;
  // task: any;
  // floor?: any;
  // department?: any;
  // commonService?: any;
  // project: any;
  // recordDate: string;
  // hoursWorked: number;

  updateId(){
   
    this.idProject = this.form.get('project').value['_id'];
  }
  
  updateIdFloor(){
    this.idFloor = this.form.get('floor').value['_id'];
  } 
  
  updateType(){
    this.taskType = this.form.get('area').value;
    //this.urlCommonServices = this.urlCommonServices + 

  }
  
  updateIdTask(){
    this.idTask = this.form.get('task').value['_id'];
    //console.log(this.idTask);    
  }

  add(){
    if(this.form.valid){
      this.item = this.form.value;
      this.item.employee = this.item.employee['employee'];
      //delete this.item['area'];  
      this.collection.push(this.item);
      this.item = null;
      
    }

  

  }



  save() {

    let collectionTemp = this.collection;

    collectionTemp.forEach(
      c => {
        c.employee = c.employee['_id'];
        c.project = c.project['_id'];
        c.subTask = c.subTask['_id'];
        if(c.task['type']===ValidTypesTasks.DEPARTAMENTOS) {
          c.department = c.department['_id'];
          c.floor = c.floor['_id'];
          delete c['commonService'];  
        }else {
          c.commonService = c.commonService['id'];
          delete c['department'];
          delete c['floor'];
        } 
        c.task = c.task['_id'];
      }
    );
    console.log(collectionTemp);
    

  }
  
  viewLog() {
    console.log(this.form);
    
  } 

}
