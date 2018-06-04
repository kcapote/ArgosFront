import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Floors } from '../../interfaces/floors.interface';
import { Task } from '../../interfaces/task.interface';
import { Util } from '../../util/util';
import { DepartmentTask } from '../../interfaces/departmentTask.interface';
import { CommonService } from '../../interfaces/common-services.interface';
import { Location } from '@angular/common';
import { CommonServiceTask } from '../../interfaces/commonServiceTask.interface';
import { Project } from '../../interfaces/project.interface';

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
  collectionTaskFloorSC: Task[] = [];
  collectionTaskEmplacement: Task[] = [];
  collectionGraphicFloor: any[] = [];
  collectionGraphicUnderground: any[] = [];
  collectionGraphicFloorSC: any[] = [];
  collectionGraphicEmplacement: any[] = [];


  constructor(private _ps: ProviderService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private location: Location) {

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

          url = `${ Util.URL_COMMON_SERVICES_TASKS }/project/${this.idProject}/SUBTERRANEOS`;
          await _ps.getObjectsAny(url,0).toPromise().then(
            res=> { 
              this._ps.refresToken(res);
              this.collectionCommonServiceTask = res.commonServiceTasks;
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


          // SE ARMA LA LISTA POR PISOS SC

          url = `${ Util.URL_TASKS_BY_TYPE }/PISOS S.C`
          await _ps.getObjectsAny(url,0).toPromise().then(
            res => {
              this._ps.refresToken(res);  
              this.collectionTaskFloorSC = res.tasks;
            }
          ).catch(
            error => {
              console.log(error);
              
            }
          );

          this.collectionCommonServiceTask = [];
          url = `${ Util.URL_COMMON_SERVICES_TASKS }/project/${this.idProject}/PISOS S.C`;
          await _ps.getObjectsAny(url,0).toPromise().then(
            res=> { 
              this._ps.refresToken(res);
              this.collectionCommonServiceTask = res.commonServiceTasks;
              let graphicFlorrSC:any = {};
                      
              this.collectionTaskFloorSC.forEach(task => {
                
                  graphicFlorrSC.task = task;
                  let floorSCs: CommonService[] = [];
                  
                  this.collectionCommonServiceTask.forEach(commonServiceTask => {
                    let exist=false;
                    if(commonServiceTask.task._id === task._id){
                        floorSCs.forEach(element => {
                        if(element._id === commonServiceTask._id){
                          exist=true;
                        }
                      });
                      if(!exist){
                        floorSCs.push(commonServiceTask.commonService);
                      }
                    }
                  });

                  graphicFlorrSC.commonServices = floorSCs;
                  this.collectionGraphicFloorSC.push(graphicFlorrSC);                  
                  floorSCs = [];
                  graphicFlorrSC = {};

              });
            }                    
          ).catch(
            error=> { 
              console.log(error);
              }
          );

        // SE ARMA LA LISTA POR EMPLAZAMIENTOS

          url = `${ Util.URL_TASKS_BY_TYPE }/EMPLAZAMIENTOS`
          await _ps.getObjectsAny(url,0).toPromise().then(
            res => {
              this._ps.refresToken(res);  
              this.collectionTaskEmplacement = res.tasks;
            }
          ).catch(
            error => {
              console.log(error);
              
            }
          );

          this.collectionCommonServiceTask = [];
          url = `${ Util.URL_COMMON_SERVICES_TASKS }/project/${this.idProject}/EMPLAZAMIENTOS`;
          await _ps.getObjectsAny(url,0).toPromise().then(
            res=> { 
              this._ps.refresToken(res);
              this.collectionCommonServiceTask = res.commonServiceTasks;
              let graphicEmplacement:any = {};
                      
              this.collectionTaskEmplacement.forEach(task => {
                
                  graphicEmplacement.task = task;
                  let emplacements: CommonService[] = [];
                  
                  this.collectionCommonServiceTask.forEach(commonServiceTask => {
                    let exist=false;
                    if(commonServiceTask.task._id === task._id){
                        emplacements.forEach(element => {
                        if(element._id === commonServiceTask._id){
                          exist=true;
                        }
                      });
                      if(!exist){
                        emplacements.push(commonServiceTask.commonService);
                      }
                    }
                  });

                  graphicEmplacement.commonServices = emplacements;
                  this.collectionGraphicEmplacement.push(graphicEmplacement);                  
                  emplacements = [];
                  graphicEmplacement = {};

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

  back() {
    this.location.back()
  }

  detailByFloor(idTask:String, idFloor: string) {

    this.router.navigate(['/pages/ganttDepartment', this.idProject, this.collectionGraphicFloor[Number(idTask)].floors[idFloor]._id, this.collectionGraphicFloor[Number(idTask)].task._id, this.nombreProyecto, this.collectionGraphicFloor[Number(idTask)].task.name, this.collectionGraphicFloor[Number(idTask)].floors[idFloor].number])

  }

  detailByCommonService(idTask:String, idFloor: string, type: string) {

    if(type === 'FloorSC'){
      this.router.navigate(['/pages/ganttCommonService', this.idProject, this.collectionGraphicFloorSC[Number(idTask)].commonServices[idFloor]._id, this.collectionGraphicFloorSC[Number(idTask)].task._id, this.nombreProyecto, this.collectionGraphicFloorSC[Number(idTask)].task.name, this.collectionGraphicFloorSC[Number(idTask)].commonServices[idFloor].number, type])
    }
    if(type === 'Underground'){
      this.router.navigate(['/pages/ganttCommonService', this.idProject, this.collectionGraphicUnderground[Number(idTask)].commonServices[idFloor]._id, this.collectionGraphicUnderground[Number(idTask)].task._id, this.nombreProyecto, this.collectionGraphicUnderground[Number(idTask)].task.name, this.collectionGraphicUnderground[Number(idTask)].commonServices[idFloor].number, type])
    }
    if(type === 'Emplacement'){
      this.router.navigate(['/pages/ganttCommonService', this.idProject, this.collectionGraphicEmplacement[Number(idTask)].commonServices[idFloor]._id, this.collectionGraphicEmplacement[Number(idTask)].task._id, this.nombreProyecto, this.collectionGraphicEmplacement[Number(idTask)].task.name, this.collectionGraphicEmplacement[Number(idTask)].commonServices[idFloor].number, type])
    }

  }

}
