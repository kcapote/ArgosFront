import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Floors } from '../../interfaces/floors.interface';
import { Task } from '../../interfaces/task.interface';
import { Util } from '../../util/util';
import { DepartmentTask } from '../../interfaces/departmentTask.interface';
import { CommonService } from '../../interfaces/common-services.interface';
//import { GraphicFloor } from '../../interfaces/graphicFloor.interface';
import { CommonServiceTask } from '../../interfaces/commonServiceTask.interface';

@Component({
  selector: 'app-gantt-floors',
  templateUrl: './gantt-floors.component.html',
  styles: []
})
export class GanttFloorsComponent implements OnInit {
  
  idProject: string;
  nombreProyecto: String; 
  collectionDepartmentTasks: DepartmentTask[] = [];
  collectionCommonServiceTask: CommonServiceTask[] = [];
  collectionTaskDepartment: Task[] = [];
  collectionTaskUnderground: Task[] = [];
  collectionGraphicFloor: any[] = [];
  collectionGraphicUnderground: any[] = [];

  constructor(private _ps: ProviderService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    activatedRoute.params.subscribe(
      async p => {
            if(p['id']){
            this.idProject = p['id'];
            this.nombreProyecto = p['name'];
            let url = `${ Util.URL_TASKS_BY_TYPE }/DEPARTAMENTOS`
            
            // SE ARMA LA LISTA POR PISOS

            await _ps.getObjectsAny(url,0).toPromise().then(
              res => {
                this._ps.refresToken(res);  
                this.collectionTaskDepartment = res.tasks;
              }
            ).catch(
              error => {
                console.log(error);
                
              }
            );
           await this._ps.getObjectsByFather(Util.URL_DEPARTMENTS_TASKS,'project',0, this.idProject).toPromise().then(
            res=> { 
              this._ps.refresToken(res);
              this.collectionDepartmentTasks = res.departmentTasks;
              let graphicFloor:any = {};
                      
              this.collectionTaskDepartment.forEach(task => {
                
                  graphicFloor.task = task;
                  let floors: Floors[] = [];
                  
                  this.collectionDepartmentTasks.forEach(departmentTask2 => {
                    let exist=false;
                    if(departmentTask2.task._id === task._id){
                      floors.forEach(element => {
                        if(element._id === departmentTask2.floor._id){
                          exist=true;
                        }
                      });
                      if(!exist){
                      floors.push(departmentTask2.floor);
                      }
                    }
                  });

                  graphicFloor.floors = floors;
                  this.collectionGraphicFloor.push(graphicFloor);
                  floors = [];
                  graphicFloor = {};

              });
            }                    
          ).catch(
            error=> { 
              console.log(error);
              }
          );

          // SE ARMA LA LISTA POR SUBTERRANEOS

          url = `${ Util.URL_TASKS_BY_TYPE }/SUBTERRANEOS`
          await _ps.getObjectsAny(url,0).toPromise().then(
            res => {
              this._ps.refresToken(res);  
              this.collectionTaskUnderground = res.tasks;
            }
          ).catch(
            error => {
              console.log(error);
              
            }
          );
          console.log("AVANCE SUBTERRANEOS");
          console.log(this.collectionTaskUnderground);
          url = `${ Util.URL_COMMON_SERVICES_TASKS }/project/${this.idProject}/SUBTERRANEOS`;
          await _ps.getObjectsAny(url,0).toPromise().then(
            res=> { 
              this._ps.refresToken(res);
              this.collectionCommonServiceTask = res.commonServiceTasks;
              console.log("*****************************");
              console.log(res);
              console.log(this.collectionCommonServiceTask);
              console.log("*****************************");
              let graphicUnderground:any = {};
                      
              this.collectionTaskUnderground.forEach(task => {
                
                  graphicUnderground.task = task;
                  let undergrounds: CommonService[] = [];
                  
                  this.collectionCommonServiceTask.forEach(commonServiceTask => {
                    let exist=false;
                    if(commonServiceTask.task._id === task._id){
                      undergrounds.forEach(element => {
                        if(element._id === commonServiceTask._id){
                          exist=true;
                        }
                      });
                      if(!exist){
                        undergrounds.push(commonServiceTask.commonService);
                      }
                    }
                  });

                  graphicUnderground.commonServices = undergrounds;
                  this.collectionGraphicUnderground.push(graphicUnderground);                  
                  undergrounds = [];
                  graphicUnderground = {};

              });
            }                    
          ).catch(
            error=> { 
              console.log(error);
              }
          );


        }
      }
    );

 

  }


  

  ngOnInit() {
  }

  detailByFloor(id: string) {
    
    this.router.navigate(['/pages/editProjects',id])

  }

}
