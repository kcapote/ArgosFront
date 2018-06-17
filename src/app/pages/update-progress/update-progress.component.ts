import { Component, OnInit } from '@angular/core';
import { ValidTypesTasks } from '../../enums/valid-types-tasks.enum';
import { Util } from '../../util/util';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProviderService } from '../../services/provider.service';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-progress',
  templateUrl: './update-progress.component.html',
  styles: []
})
export class UpdateProgressComponent implements OnInit {
  
  urlProjects: string = Util.URL_POJECTS;
  urlTasks = Util.URL_TASKS;
  urlSubTasks = Util.URL_SUB_TASKS;
  idProject = "";
  taskType = "";
  idTask = "";
  idFloor:string = "";
  idDepartment:string = "" ;
  idSubTask:string = "";

  collection: any [] = [];
  form: FormGroup;
  urlFloors: string = Util.URL_FLOORS;
  urlDepartments: string = Util.URL_DEPARTMENTS;
  urlCommonServices = Util.URL_COMMON_SERVICES;

  enumType = Object.keys(ValidTypesTasks).map(
    r => {
      return ValidTypesTasks[r]
    }
  );

  constructor(private _ps: ProviderService, 
              private _msg: MsgBoxService,
              private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup(
      {
        project: new FormControl('',Validators.required),
        area: new FormControl('', Validators.required),
        subTask: new FormControl('',Validators.required),
        task: new FormControl('',Validators.required),
        floor: new FormControl(''),
        department: new FormControl(''),
        commonService: new FormControl('')
      }
    );

  

  }

  updateType(){
    this.taskType = this.form.get('area').value;
    //this.idTask = "sss";
    if(this.form.get('area').value !== 'DEPARTAMENTOS'){
      
      this.urlCommonServices =  `${Util.URL_COMMON_SERVICES}/project/${ this.idProject }/${this.taskType}` ;
    
      
    }

  }

  updateId(){
    this.collection = [];
    this.idProject = this.form.get('project').value['_id'];
    this.updateType();
    this.updateIdTask();
    this.idTask = "";
  }
  

  updateIdTask() {
    this.idTask = this.form.get('task').value['_id'];

  }

  updateIdSubTask() {
    this.idSubTask = this.form.get('subTask').value['_id'];

  }

  updateIdFloor(){
    if(this.form.get('area').value == 'DEPARTAMENTOS'){
      this.idFloor = this.form.get('floor').value['_id'];
    }else{
      this.idFloor = this.form.get('commonService').value['_id']
    }
  }
  
  updateIdDeparment(){
   
      this.idFloor = this.form.get('department').value['_id'];
       
  }



  load() {

  }

  updateElement(idx: number, val) {
    this.collection[idx].status = val;
   
    
  }


  saveOne (idx: number) {
    
    

  }


  search() {
   
   if(this.form.get('area').value === ValidTypesTasks.DEPARTAMENTOS){
      let url = `${ Util.URL_EMPLOYEE_SUBTASK }/department/${this.idProject}/${this.idFloor}/${this.idDepartment}/${this.idTask}/${this.idSubTask}`;
      console.log('URL',url);
      
      this._ps.getObjectsAny(url,0).subscribe(
        res=>{
           console.log(res);
              

        },err => {
           console.log(err);
            
        }
      )

    }else{
      let url = `${ Util.URL_EMPLOYEE_SUBTASK }/commonService/${this.idProject}/${this.idFloor}/${this.idTask}/${this.idSubTask}`;

    } 
  }

}
