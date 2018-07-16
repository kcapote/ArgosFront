import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Util } from '../../util/util';
import { ValidTypesTasks } from '../../enums/valid-types-tasks.enum';
import { ProviderService } from '../../services/provider.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventEmitter } from 'protractor';
import { CommonService } from '../../interfaces/common-services.interface';
import { EmployeeSubTask } from '../../interfaces/employee-subtask';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { Router } from '@angular/router';

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
  showServices = false;

 

  collection: EmployeeSubTask[] = [];
  collectionErrors: String[] = [];
  item: EmployeeSubTask;
  userTemp: any;

  enumType = Object.keys(ValidTypesTasks).map(
    r => {
      return ValidTypesTasks[r]
    }
  );

  constructor(private _ps: ProviderService, 
              private _msg: MsgBoxService,
              private router: Router) { 


                let user = JSON.parse(localStorage.getItem('user'));
                this._ps.getObject(Util.URL_USER,user._id).subscribe(
                    res => { 
                        this._ps.refresToken(res);                                           
                        this.userTemp = res.users[0];
                        if(user.role != this.userTemp.role){
                            localStorage.setItem('user','');
                            this.router.navigate(['login'])
                        }
                    }
                )

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

  updateId(){
    this.collection = [];
    this.idProject = this.form.get('project').value['_id'];
    this.updateType();
    this.updateIdFloor();
    this.updateIdTask();
    this.idTask = "";
  }
  
  updateIdFloor(){
    if(this.form.get('area').value == 'DEPARTAMENTOS'){
      this.idFloor = this.form.get('floor').value['_id'];
    }
  } 
  
  updateType(){
    this.taskType = this.form.get('area').value;
    if(this.form.get('area').value !== 'DEPARTAMENTOS'){
      
      this.urlCommonServices =  `${Util.URL_COMMON_SERVICES}/project/${ this.idProject }/${this.taskType}` ;
     
    }

  }



  
  updateIdTask(){
      this.idTask = this.form.get('task').value['_id'];
  }



  add(){
    if(this.form.valid){
      let temp:EmployeeSubTask = this.form.value;
      if(this.collection.length===0){
        this.collection.push(temp);
      } 
      let exist = false;
      for (var i = 0; i < this.collection.length; i++){
        if(temp.employee._id===this.collection[i].employee._id){
          exist = true;
        }
      }
      if(!exist){
        this.collection.push(temp);
      }
           
    }

  }


  delete(idx: number ) {
    this.collection.splice(idx,1);  

  }


  async save() {
  this.collectionErrors = [];       
  let collectionTemp = []; 
    for(let i = 0; i< this.collection.length; i++){  
        let c = this.collection[i];
        let f:EmployeeSubTask = {
          employee: c.employee.employee['_id'],
          project: c.project['_id'],
          subTask: c.subTask['_id'],           
          task: c.task['_id'],
          recordDate: c.recordDate,
          hoursWorked: c.hoursWorked,

        }
        if(c.task['type']===ValidTypesTasks.DEPARTAMENTOS) {
          f.department = c.department['_id'];
          f.floor = c.floor['_id'];
          delete c['commonService'];  
        }else {
          f.commonService = c.commonService['_id'];
          delete f['department'];
          delete f['floor'];
        }
        collectionTemp.push(f);
      
     }
  
  
     for(const item of collectionTemp){
      
       await this._ps.saveObject(Util.URL_EMPLOYEE_SUBTASK,item,0).subscribe(
          res =>{ 
          },
         err=> {
            if(err.error.errors.message){
              this.collectionErrors.push(String(err.error.errors.message));
            }
          }
        )            
    }

    this._msg.show(Util.SAVE_TITLE, Util.MSJ_SAVE_SUCCESS,Util.ACTION_SUCCESS).subscribe(
      res => {
        this.collection = []; 
      }
    )
  }
  
}
