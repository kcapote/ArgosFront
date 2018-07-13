import { Component, OnInit } from '@angular/core';
import { ValidTypesTasks } from '../../enums/valid-types-tasks.enum';
import { Util } from '../../util/util';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProviderService } from '../../services/provider.service';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { Router } from '@angular/router';
import { DepartmentSubTask } from '../../interfaces/departmentSubTask.interface';
import { CommonServiceSubTask } from '../../interfaces/commonServiceSubTask.interface';

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
  idCommonServices = "";

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
    if(this.form.get('task').value){
      this.idTask = this.form.get('task').value['_id'];
    }

  }

  updateIdSubTask() {
    if(this.form.get('subTask').value){
      this.idSubTask = this.form.get('subTask').value['_id'];
    }
  }

  updateIdFloor(){
    if(this.form.get('area').value == 'DEPARTAMENTOS'){
      this.idFloor = this.form.get('floor').value['_id'];
    }else{
      this.idFloor = this.form.get('commonService').value['_id']
    }
  }
  
  updateIdDeparment(){
   if(this.form.get('department').value){
     this.idDepartment = this.form.get('department').value['_id'];
   }
       
  }



  load() {

  }

  updateIdCommonServices(){
   if(this.form.get('commonService').value){
     this.idCommonServices = this.form.get('commonService').value['_id'];
   } 
  }

  updateElement(idx: number, val) {
    this.collection[idx].status = val;
  }


  saveOne (idx: number) {
    this._msg.show(Util.UPDATE_TITLE,Util.MSJ_UPDATE_QUESTION,Util.ACTION_UPDATE).subscribe(
      res => {
        if(res.response == Util.OK_RESPONSE){
          if(this.form.get('area').value == 'DEPARTAMENTOS'){
              this.saveDepartment(idx);
          }else{
              this.saveCommonServices(idx);
          }
        }
      }
    );
    
  }


  saveCommonServices(idx: number){
    let a:CommonServiceSubTask = this.collection[idx];
    a.project = a.project['_id'];
    a.commonService = a.commonService['_id'];
    a.subTask = a.subTask['_id'];
    a.task = a.task['_id'];
    if(a.status ==100 ){
      a.endDate = new Date().toString();
    }

    if(!a.subTask || !a.task){
      this._msg.show('Error','Debe completar los datos',Util.ACTION_INFO).subscribe();

    }else {
      this._ps.updateObject(Util.URL_COMMON_SERVICES_SUB_TASKS,a['_id'],a,0).subscribe(
        res => {
          let url = `${ Util.URL_COMMON_SERVICES_SUB_TASKS }/sum`;
          let obj = {
            idTask: a.task,
            projectId: a.project,
            commonService: a.commonService,
            typeCommon: this.taskType
          }   
          this._ps.updateObject(url,a.task,obj).subscribe(
              res=>{
                this.search();
              }
            );
        }
      );
    }


  }


  saveDepartment(idx: number){

    let a:DepartmentSubTask = this.collection[idx];
    a.project = a.project['_id'];
    a.floor = a.floor['_id'];
    a.subTask = a.subTask['_id'];
    a.task = a.task['_id'];
    a.department = a.department['_id'];
    
    if(a.status ==100 ){
      a.endDate = new Date().toString();
    }

    this._ps.updateObject(Util.URL_DEPARTMENTS_SUB_TASKS,a['_id'],a,0).subscribe(
      res => {
        this._ps.updateObject(Util.URL_DEPARTMENTS_SUB_TASKS,a['_id'],a,0).subscribe(
          res => {
            let url = `${ Util.URL_DEPARTMENTS_SUB_TASKS }/sum`;
            let obj = {
              project: a.project,
              floor: a.floor,
              subTask: a.subTask,
              task: a.task,
              department: a.department
            }   
            this._ps.updateObject(url,a.task,obj) .subscribe(
              res=>{
                this.search();
              }
            );
          }
        );        
      }
    );


  }




  search() {
   
   if(this.form.get('area').value === ValidTypesTasks.DEPARTAMENTOS){
      console.log('project ', this.idProject, ' floor ', this.idFloor, ' department ', this.idDepartment, ' task ',this.idTask  ,' sub task ', this.idSubTask);
    
      let url = `${ Util.URL_DEPARTMENTS_SUB_TASKS }/department/${this.idProject}/${this.idDepartment}/${this.idTask}`;
      //console.log('URL',url);
      
      this._ps.getObjectsAny(url,0).subscribe(
        res=>{
           console.log(res);
           this.collection = res.departmentSubTasks;   

        },err => {
           console.log('ERROR',err);
            
        }
      )

    }else{
      let url = `${ Util.URL_COMMON_SERVICES_SUB_TASKS }/task/${this.idProject}/${this.idTask}/${this.taskType}/${ this.idCommonServices }`;
      console.log(url);
      this._ps.getObjectsAny(url,0).subscribe(
        res=>{
          this.collection = res.commonServiceSubTasks;
            
        }, err=>{

        }

      )

    } 
  }

  
  sum() {
    let url = `${ Util.URL_COMMON_SERVICES_SUB_TASKS }/sum`;
    let obj = {
      idTask: '5b32fb03a7dcec42aa0d95f2'
    }   
    this._ps.updateObject(url,'5b00976acdb619173b5c13e4',obj)
            .subscribe(
              res=>{
                console.log(res);
                
              }
            );
    
  }

  

}
