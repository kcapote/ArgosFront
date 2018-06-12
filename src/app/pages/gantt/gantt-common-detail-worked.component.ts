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
  idTask: string;
  idSubTask: string;
  type: string;
  viewCS:Boolean;
  numberFloor: string;
  totalHours: number;
  collectionEmployeeSubTasks: EmployeeSubTask[] = [];

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
          
          console.log(this.idProject);
          console.log(this.idFloor );
          console.log(this.idTask );
          console.log(this.idSubTask);
          console.log(this.type);
        

          if(this.type === "0"){
            this.viewCS = false;
          }else{
            this.viewCS = true;
          }


          let typeCS = "";
          if(this.type==="FloorSC"){
            typeCS = "PISOS S.C";
            this.numberFloor = "Pisos SC ";
          }
          if(this.type==="Underground"){
            typeCS = "SUBTERRANEOS";
            this.numberFloor = "Subterraneo ";
          }
          if(this.type==="Emplacement"){
            typeCS = "EMPLAZAMIENTOS";
            this.numberFloor = "Emplazamiento ";
          }


        let url = `${ Util.URL_EMPLOYEE_SUBTASK }/commonService/${this.idProject}/${this.idFloor}/${this.idTask}/${this.idSubTask}`
        await _ps.getObjectsAny(url,0).toPromise().then(
          res => {
            this._ps.refresToken(res);  

            this.collectionEmployeeSubTasks = res.employeeSubTasks;
            this.numberFloor += String(this.collectionEmployeeSubTasks[0].commonService.number);
            this.totalHours = 0;
            this.collectionEmployeeSubTasks.forEach(element => {
              this.totalHours += element.hoursWorked;
            });
            console.log(this.collectionEmployeeSubTasks);

          }
        ).catch(
          error => {
            console.log(error);
            
          }
        );


        }
      )

      
    }

  ngOnInit() {
  }

  back() {
    this.location.back()
  }


}
