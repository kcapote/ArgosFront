import { Component, OnInit } from '@angular/core';
import { Floors } from '../../interfaces/floors.interface';
import { Validators } from '@angular/forms';
import { ActivatedRoute,  Router } from '@angular/router';
import { ValidTypesFloors } from '../../enums/valid-types-floors';
import { ProviderService } from '../../services/provider.service';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { Util } from '../../util/util';
import { Department } from '../../interfaces/department.interface';
import { DepartmentTask } from '../../interfaces/departmentTask.interface';
import { DepartmentSubTask } from '../../interfaces/departmentSubTask.interface';


@Component({
  selector: 'app-project-floors',
  templateUrl: './project-floors.component.html',
  styles: []
})
export class ProjectFloorsComponent implements OnInit {

  idProject: string;
  collection: Floors[] = [];
  numFloors: number;
  numDepts: number;
  saving: boolean = false;
  existFloors = false;
  collectionDepts: Department[] =[];
  local: string = ValidTypesFloors.LOCAL;

  constructor(private activedRoute: ActivatedRoute,
              private _ps: ProviderService,
              private _msg: MsgBoxService,
              private router: Router ) { 

    activedRoute.params.subscribe(
        p => {
          if(p['id']){
            this.idProject = p['id'];
          }
        }
    );


    this._ps.getObjectsByFather(Util.URL_FLOORS,'project',0, this.idProject).subscribe(
      res => {
        this._ps.refresToken(res);
        this.collection = res.floors;
        this.existFloors = this.collection.length>0? true: false;
        
      }

    )

    this._msg.notify.subscribe(
      res => {
          if(res.type === Util.ACTION_SUCCESS && res.response === Util.OK_RESPONSE ){
            this.router.navigate(['/pages/projectsCommon',this.idProject]);
          }
      }
    )   
    



  }
  

  ngOnInit() {
      
  }


  buildFloors(){
    
    this.collection = [];
    
    for (let index = 0; index < this.numFloors; index++) {
      let item: Floors={
        number: (index+1),
        project: this.idProject,
        quantityDepartment: this.numDepts,
        type: ValidTypesFloors.RESIDENCIA
      }

      this.collection.push(item);
                              
    }

  }

  loadDepartmens() {
    if(this.collection.length>0) {
      this.collection.forEach(element => {
        this._ps.getObjectsByFather(Util.URL_DEPARTMENTS,'floor',0 ,element._id).subscribe(
          res => {
            this._ps.refresToken(res);
            this.collectionDepts.push(res.departments);
          }
        )      
                
      });
    }
  }

  updateType(idx: number) {   
    this.collection[idx].type = this.collection[idx].type === ValidTypesFloors.RESIDENCIA?ValidTypesFloors.LOCAL: ValidTypesFloors.RESIDENCIA; 
  }



  save() {

    if(!this.existFloors){
      
         
      this.saving = true;
      if(this.collection.length<1) {
        return;
      }
  
      for(let k =0; k < this.collection.length; k++  ){
      //this.collection.forEach(  element => {
        //Creación del piso
        
        this._ps.saveObject(Util.URL_FLOORS, this.collection[k],0 ).subscribe(
           res => {
              this._ps.refresToken(res); 
               for(let i=0;i < res.floor.quantityDepartment; i++){
                //Creación de los departamentos del piso  
                              
                if(res.success==true){
                   let dep: Department = {
                      floor: res.floor._id,
                      number: i+1,
                      status: 0   
                   }
                  this._ps.saveObject(Util.URL_DEPARTMENTS, dep,0).subscribe(
                     resp => {
                      this._ps.refresToken(res);
                      if( resp.success == true ) {

                        //se guardan automaticamente las tareas
                        let url = `${ Util.URL_TASKS_BY_TYPE }/DEPARTAMENTOS`
                         this._ps.getObjectsAny(url,0).subscribe(
                           respTask => {
                            this._ps.refresToken(respTask);
                            if( respTask.success == true ) {
                               respTask.tasks.forEach(
                                task => {

                                let depTask: DepartmentTask = {
                                  department: resp.department._id,
                                  task: task._id,
                                  floor: res.floor._id,
                                  project: res.floor.project,
                                  status: 0,
                                }

                               this._ps.saveObject(Util.URL_DEPARTMENTS_TASKS, depTask,0).subscribe(
                                  respSaveTasks => {
                                    this._ps.refresToken(respSaveTasks);
                                    if( respSaveTasks.success == true ) {
                                      //se guardan automaticamente las sub tareas
                                      this._ps.getObjectsByFather(Util.URL_SUB_TASKS,"task",0, task._id,0).subscribe(
                                        respSubTasks => {
                                          this._ps.refresToken(respSubTasks);
                                          if( respSubTasks.success == true ) {
                                            respSubTasks.subTasks.forEach(
                                              subtask => {
                                              let depSubTask: DepartmentSubTask = {
                                                department: resp.department._id,
                                                subTask: subtask._id,
                                                task: task._id,
                                                floor: res.floor._id,
                                                project: res.floor.project,
                                                status: 0
                                              }
                                               this._ps.saveObject(Util.URL_DEPARTMENTS_SUB_TASKS, depSubTask,0).subscribe(
                                                respSaveTasks => {
                                                  this._ps.refresToken(respSaveTasks);
                                                  if( respSaveTasks.success == true ) {
                                                  }
                                                });
                                            });
                                          }
                                        });
                                    }
                                  });

                              });
                            }
                          }
                        );

                        this._msg.show(Util.SAVE_TITLE, Util.MSJ_SAVE_SUCCESS, Util.ACTION_SUCCESS );  

                      }
                    }
                  );
                }
                 
               } 
             }
        );
  
      };
      this.saving = false;

    }else{
        

     
        this.router.navigate(['/pages/projectsCommon',this.idProject]);
    }
  }

}
