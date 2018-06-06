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
  collectionCommonServices:any[] = [];
 

  collection: EmployeeSubTask[] = [];
  item: EmployeeSubTask;

  enumType = Object.keys(ValidTypesTasks).map(
    r => {
      return ValidTypesTasks[r]
    }
  ) ;

  constructor(private _ps: ProviderService, 
              private _msg: MsgBoxService,
              private router: Router) { 
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
    this.idTask = "sss";
    if(this.form.get('area').value !== 'DEPARTAMENTOS'){
      
      this.urlCommonServices =  `${Util.URL_COMMON_SERVICES}/project/${ this.idProject }/${this.taskType}` ;
     
      //  this._ps.getObjectsAny(this.urlCommonServices,0).subscribe(
      //   res =>  (this.collectionCommonServices = res['commonService'])        
      // )
      
    }




    //this.urlCommonServices = this.urlCommonServices + 

  }



  
  updateIdTask(){
    // if(this.form.get('task').value['_id']){
      this.idTask = this.form.get('task').value['_id'];
     console.log('el idtask es ',this.idTask);
     
    // }
    //console.log(this.idTask);    
  }



  add(){
    if(this.form.valid){
      let temp:EmployeeSubTask = this.form.value;

      this.collection.push(temp);     
      console.log('despues del push ',this.collection);
    }

  }


  delete(idx: number ) {
    this.collection.splice(idx,1);  

  }


  save() {

    let collectionTemp = [];
    console.log(collectionTemp);
    
    
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
    console.log(collectionTemp);    

  
   for(let i = 0; i< collectionTemp.length; i++){
     console.log(collectionTemp[i]);
     
      this._ps.saveObject(Util.URL_EMPLOYEE_SUBTASK,collectionTemp[i],0).subscribe(
           res =>{ 
              console.log('salvado' , res)  
          },
           err=> {
              console.log('salvado' , err)              
          }
        )            
   }

   
  this._msg.show(Util.SAVE_TITLE, Util.MSJ_SAVE_SUCCESS,Util.ACTION_SUCCESS).subscribe(
    res => {
      console.log(res);
      this.collection = [];      
      // this.router.navigate(['/pages','home']);
    }
  )
     
    

  }
  



}
