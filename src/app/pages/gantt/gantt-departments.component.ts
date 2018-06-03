import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { SubTask } from '../../interfaces/subTask.interface';
import { ProviderService } from '../../services/provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Util } from '../../util/util';
import { DepartmentSubTask } from '../../interfaces/departmentSubTask.interface';
import { Department } from '../../interfaces/department.interface';
import { Location } from '@angular/common';


@Component({
  selector: 'app-gantt',
  templateUrl: './gantt-departments.component.html',
  styles: []
})

export class GanttDepartmentsComponent implements OnInit {
  
  collectionSubtask: SubTask [] = [];
  idProject: string;
  idFloor: string;
  idTask: string;
  nameProject: String;
  nameTask: String;
  numberFloor: String;
  collectionDepartmentSubTasks: DepartmentSubTask[] = [];
  collectionGraphiDepartments: any[] = [];

  constructor(private _ps: ProviderService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private location: Location) { 
      
    
    activatedRoute.params.subscribe(
    async (res) => {
        this.idProject = res['idProyect'];
        this.idFloor = res['idFloor']; 
        this.idTask = res['idTask'];
        this.nameProject = res['nameProject']; 
        this.nameTask = res['nameTask']; 
        this.numberFloor = res['numberFloor']; 

        let url = `${ Util.URL_SUB_TASKS }/task/${this.idTask}`
        // SE ARMA LA LISTA POR PISOS

        await _ps.getObjectsAny(url,0).toPromise().then(
          res => {
            this._ps.refresToken(res);  
            this.collectionSubtask = res.subTasks;
          }
        ).catch(
          error => {
            console.log(error);
            
          }
        );
        console.log(this.collectionSubtask);
        url = `${ Util.URL_DEPARTMENTS_SUB_TASKS }/floor/${this.idProject}/${this.idFloor}/${this.idTask}`
        await this._ps.getObjectsAny(url,0).toPromise().then(
          res=> { 
            this._ps.refresToken(res);
            this.collectionDepartmentSubTasks = res.departmentSubTasks;
            let graphicDepartment:any = {};
                    
            this.collectionSubtask.forEach(subTask => {
              
                graphicDepartment.subTask = subTask;
                let departments: Department[] = [];
                
                this.collectionDepartmentSubTasks.forEach(departmentSubTask => {
                  let exist=false;
                  if(departmentSubTask.subTask._id === subTask._id){
                    departments.forEach(element => {
                      if(element._id === departmentSubTask.department._id){
                        exist=true;
                      }
                    });
                    if(!exist){
                      departmentSubTask.department.status = departmentSubTask.status;
                      departments.push(departmentSubTask.department);
                    }
                  }
                });

                graphicDepartment.departments = departments;
                this.collectionGraphiDepartments.push(graphicDepartment);
                console.log(this.collectionGraphiDepartments);
                                  
                departments = [];
                graphicDepartment = {};

            });
          }                    
        ).catch(
          error=> { 
            console.log(error);
            }
        );







      }
    )

   
    

  } 

  ngOnInit(){
     
  }

  back() {
    this.location.back()
  }

  detailByDepartment(idTask:String, idFloor: string) {

    //this.router.navigate(['/pages/ganttDepartment', this.idProject, this.collectionGraphicFloor[Number(idTask)].floors[idFloor]._id, this.collectionGraphicFloor[Number(idTask)].task._id])

  }

}
