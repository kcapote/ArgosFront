import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Util } from '../../util/util';
import { EmployeeSubTask } from '../../interfaces/employee-subtask';

@Component({
  selector: 'app-gantt-common-detail-worked',
  templateUrl: './gantt-common-detail-worked.component.html',
  styles: []
})
export class GanttCommonDetailWorkedComponent implements OnInit {


  idProject: string;
  idFloor: string;
  idDepartment: string;
  idTask: string;
  idSubTask: string;
  type: string;
  viewCS:Boolean;
  numberFloor: string;
  totalHours: number;
  collectionEmployeeSubTasks: EmployeeSubTask[] = [];
  status = Number;

  constructor(private _ps: ProviderService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location) { 

      activatedRoute.params.subscribe(
        async (res) => {

          this.idProject = res['idProyect'];
          this.idFloor = res['idFloor']; 
          this.idTask = res['idTask'];
          this.idSubTask = res['idSubTask']; 
          this.type = res['type'];
          this.idDepartment = res['idDepartment'];
          let typeCS = "";
          if(this.type==="FloorSC"){
            this.numberFloor = "Pisos SC ";
            typeCS = "PISOS";
          }
          if(this.type==="Underground"){
            this.numberFloor = "Subterraneo ";
            typeCS = "SUBTERRANEOS";
          }
          if(this.type==="Emplacement"){
            this.numberFloor = "Emplazamiento ";
            typeCS = "EMPLAZAMIENTOS";
          }
          if(this.type==="0"){
            this.numberFloor = "Departamento ";
            typeCS = "DEPARTAMENTOS";
          }

          if(this.type === "0"){
            this.viewCS = false;
            let url = `${ Util.URL_EMPLOYEE_SUBTASK }/department/${this.idProject}/${this.idFloor}/${this.idDepartment}/${this.idTask}/${this.idSubTask}`
            await _ps.getObjectsAny(url,0).toPromise().then(
              res => {
                this._ps.refresToken(res);  
                this.collectionEmployeeSubTasks = res.employeeSubTasks;
                this.totalHours = 0;
                if(this.collectionEmployeeSubTasks.length>0){
                  let numberFloor = '';
                  if(this.collectionEmployeeSubTasks[0].floor.number<10){
                    numberFloor+= this.collectionEmployeeSubTasks[0].floor.number+'0';
                  }                  
                  this.numberFloor += numberFloor+String(this.collectionEmployeeSubTasks[0].department.number);
                }
                this.collectionEmployeeSubTasks.forEach(element => {
                  this.totalHours += element.hoursWorked;
                });
              }
            ).catch(
              error => {
                console.log(error);
              }
            );

            url = `${ Util.URL_DEPARTMENTS_SUB_TASKS }/task/${this.idProject}/${this.idTask}/${this.idSubTask}`
            await this._ps.getObjectsAny(url,0).toPromise().then(
              res=> { 
                this._ps.refresToken(res);
                this.status = res.departmentSubTasks[0].status;
              }                    
            ).catch(
              error=> { 
                console.log(error);
                }
            );

          }else{
            this.viewCS = true;
            let url = `${ Util.URL_EMPLOYEE_SUBTASK }/commonService/${this.idProject}/${this.idFloor}/${this.idTask}/${this.idSubTask}`
            await _ps.getObjectsAny(url,0).toPromise().then(
              res => {
                this._ps.refresToken(res);  

                this.collectionEmployeeSubTasks = res.employeeSubTasks;
                
                this.totalHours = 0;
                if(this.collectionEmployeeSubTasks.length>0){
                  this.numberFloor += String(this.collectionEmployeeSubTasks[0].commonService.number);
                }
                this.collectionEmployeeSubTasks.forEach(element => {
                  this.totalHours += element.hoursWorked;
                });
              }
            ).catch(
              error => {
                console.log(error);
              }
            );

            url = `${ Util.URL_COMMON_SERVICES_SUB_TASKS }/subtask/${this.idProject}/${this.idSubTask}/${typeCS}`
            await this._ps.getObjectsAny(url,0).toPromise().then(
              res=> { 
                this._ps.refresToken(res);
                console.log(res); 
                this.status = res.commonServiceSubTasks[0].status;
              }                    
            ).catch(
              error=> { 
                console.log(error);
                }
            );


          }
        }
      )

      
    }

  ngOnInit() {
  }

  back() {
    this.location.back()
  }


}
