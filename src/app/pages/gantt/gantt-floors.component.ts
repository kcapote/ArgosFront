import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Floors } from '../../interfaces/floors.interface';
import { Task } from '../../interfaces/task.interface';
import { Util } from '../../util/util';
import { DepartmentTask } from '../../interfaces/departmentTask.interface';
//import { GraphicFloor } from '../../interfaces/graphicFloor.interface';

@Component({
  selector: 'app-gantt-floors',
  templateUrl: './gantt-floors.component.html',
  styles: []
})
export class GanttFloorsComponent implements OnInit {
  
  idProject: string; 
  collectionDepartmentTasks: DepartmentTask[] = [];
  collectionTask: Task[] = [];
  collectionGraphicFloor: any[] = [];

  constructor(private _ps: ProviderService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    activatedRoute.params.subscribe(
      async p => {
            if(p['id']){
            this.idProject = p['id'];
           await this._ps.getObjectsByFather(Util.URL_DEPARTMENTS_TASKS,'project',0, this.idProject).toPromise().then(
                    res=> { 
                      this._ps.refresToken(res);
                      this.collectionDepartmentTasks = res.departmentTasks;
                      
                     
                      
                      let graphicFloor:any = {};
                      console.log(graphicFloor);
                      
                      this.collectionDepartmentTasks.forEach(departmentTask => {
                        graphicFloor.task = departmentTask.task;
                        let floors: Floors[] = [];
                        this.collectionDepartmentTasks.forEach(departmentTask2 => {
                          if(departmentTask2.task === departmentTask.task){
                            floors.push(departmentTask2.floor);
                          }
                        });
                        graphicFloor.floors = floors;
                        this.collectionGraphicFloor.push(graphicFloor);
                      });

                      console.log( this.collectionGraphicFloor);

                    }                    
              ).catch(
                error=> { 
                  console.log(error);
                 }
              );

              await _ps.getObjects(Util.URL_TASKS).toPromise().then(
                res => {
                  this._ps.refresToken(res);  
                  this.collectionTask = res.tasks;
                }
              ).catch(
                error => {
                  console.log(error);
                  
                }
              );

            } 
        }
      );

 

  }


  

  ngOnInit() {
  }

}
