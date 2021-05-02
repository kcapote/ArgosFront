import { Component, OnInit } from '@angular/core';
import { ProviderService, GanttService } from '../../services';
import { Router, ActivatedRoute } from '@angular/router';
import { Floors } from '../../interfaces/floors.interface';
import { Util } from '../../util/util';
import { CommonService } from '../../interfaces/common-services.interface';
import { Location } from '@angular/common';
import { LoaderService } from '../../components/loader/loader.service';

@Component({
  selector: 'app-gantt-floors',
  templateUrl: './gantt-floors.component.html',
  styles: []
})
export class GanttFloorsComponent implements OnInit {
  
  idProject: string;
  nombreProyecto: String; 
  loadingFloors: boolean = false;
  loadindUndergrounds: boolean = false;
  loadingFloorsSC: boolean = false;
  loadingEmplacement: boolean = false;

  constructor(private _ps: ProviderService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private location: Location,
              private loader: LoaderService,
              public _gs: GanttService) { 

    activatedRoute.params.subscribe(
      async p => {
        if(p['id']){
          this.idProject = p['id'];
          this.nombreProyecto = p['name'];
          if(this._gs.idProject !== p['id']){
            this._gs.cleanCollection();
            this.loadData(true);
            this._gs.idProject = p['id'];
          }else{
            this.loadData(false);
          }
          
        }
      }
    );

 

  }



  loadData(force = false) {

      // SE ARMA LA LISTA POR PISOS
      if( force || this._gs.collectionGraphicFloor.length === 0 ) this.loadFloors();
                
      // SE ARMA LA LISTA POR SUBTERRANEOS
      if(force || this._gs.collectionGraphicUnderground.length === 0) this.loadUndergrounds();  
  
      // SE ARMA LA LISTA POR PISOS SC
      if(force || this._gs.collectionGraphicFloorSC)this.loadFloorsSC();
  
      // SE ARMA LA LISTA POR EMPLAZAMIENTOS
      if(force || this._gs.collectionGraphicEmplacement.length === 0) this.loadLocations();
    
  }

  async loadFloors(){

    try{

      this.loadingFloors = true;
      
      let url = `${ Util.URL_TASKS_BY_TYPE }/DEPARTAMENTOS`;
      const responseTaskDepartment = await this._ps.getObjectsAny(url,0).toPromise();
      this._ps.refresToken(responseTaskDepartment);  
      this._gs.collectionTaskDepartment = responseTaskDepartment.tasks;

      const responseDepartmentTasks = await this._ps.getObjectsByFather(Util.URL_DEPARTMENTS_TASKS,'project',0, this.idProject).toPromise();
      this._ps.refresToken(responseDepartmentTasks);
      this._gs.collectionDepartmentTasks = responseDepartmentTasks.departmentTasks;
      console.log(this._gs.collectionDepartmentTasks);
      let graphicFloor:any = {};


      
      //this.collectionTaskDepartment.forEach(task => {
      for (let i = 0; i < this._gs.collectionTaskDepartment.length; i++) {  
        const task = this._gs.collectionTaskDepartment[i]
        graphicFloor.task = task;
        let floors: Floors[] = [];
        
        for (let index = 0; index < this._gs.collectionDepartmentTasks.length; index++) {

          const departmentTask2 = this._gs.collectionDepartmentTasks[index];
          let exist=false;
          if(departmentTask2.task._id === task._id){

            floors.forEach(element => {
              if(element._id === departmentTask2.floor._id){
                exist=true;
              }
            });

            if(!exist){
              url = `${ Util.URL_DEPARTMENTS_TASKS }/taskstatus/${this.idProject}/${departmentTask2.floor._id}/${departmentTask2.task._id}`;
              
              const response = await this._ps.getObjectsAny(url,0).toPromise();
              this._ps.refresToken(response);
              departmentTask2.floor.status = response.statusTask;
              floors.push(departmentTask2.floor);

            }
          }
          
        }

        let floorTemp:any = {};
        for(let i=0;i<(floors.length-1);i++){
          for(let j=0;j<((floors.length-1)-i);j++){
              if(floors[j].number>floors[j+1].number){
                floorTemp=floors[j];
                floors[j]=floors[j+1];
                floors[j+1]=floorTemp;
              }
          }
        }

        graphicFloor.floors = floors;
        if(graphicFloor.floors.length > 0){
          this._gs.collectionGraphicFloor.push(graphicFloor); 
        }
        floors = [];
        graphicFloor = {};
      };

      this.loadingFloors = false;

    }catch(err) {
      this.loadingFloors = false;
      console.log(err);
    }

  }

  async loadUndergrounds(){

    try{

      this.loadindUndergrounds = true;

      let url = `${ Util.URL_TASKS_BY_TYPE }/SUBTERRANEOS`;
      const responseTaskUnderground = await this._ps.getObjectsAny(url,0).toPromise();
      this._ps.refresToken(responseTaskUnderground);  
      this._gs.collectionTaskUnderground = responseTaskUnderground.tasks;

      url = `${ Util.URL_COMMON_SERVICES_TASKS }/project/${this.idProject}/SUBTERRANEOS`;
      const responseCommonServiceTask = await this._ps.getObjectsAny(url,0).toPromise();
      this._ps.refresToken(responseCommonServiceTask);
      this._gs.collectionCommonServiceTask = responseCommonServiceTask.commonServiceTasks;
      let graphicUnderground:any = {};

      this._gs.collectionTaskUnderground.forEach(task => {
          
        graphicUnderground.task = task;
        let undergrounds: CommonService[] = [];
        
        this._gs.collectionCommonServiceTask.forEach(commonServiceTask => {
          let exist=false;
          if(commonServiceTask.task._id === task._id){
            undergrounds.forEach(element => {
              if(element._id === commonServiceTask._id){
                exist=true;
              }
            });
            if(!exist){
              commonServiceTask.commonService.number = "Sub "+commonServiceTask.commonService.number;
              commonServiceTask.commonService.status = commonServiceTask.status;
              undergrounds.push(commonServiceTask.commonService);
            }
          }
        });

        let underGroundsTemp:any = {};
        for(let i=0;i<(undergrounds.length-1);i++){
          for(let j=0;j<((undergrounds.length-1)-i);j++){
              if(undergrounds[j].number>undergrounds[j+1].number){
                underGroundsTemp=undergrounds[j];
                undergrounds[j]=undergrounds[j+1];
                undergrounds[j+1]=underGroundsTemp;
              }
          }
        }
        graphicUnderground.commonServices = undergrounds;
        if(graphicUnderground.commonServices.length > 0){
          this._gs.collectionGraphicUnderground.push(graphicUnderground); 
        }                
        undergrounds = [];
        graphicUnderground = {};

      });

      this.loadindUndergrounds = false;

    }catch(err){
      this.loadindUndergrounds = false;
      console.log(err);
    }

  }
  
  async loadFloorsSC(){

    try{

      this.loadingFloorsSC = true;

      let url = `${ Util.URL_TASKS_BY_TYPE }/PISOS S.C`;
      const responseTaskFloorSC = await this._ps.getObjectsAny(url,0).toPromise();
      this._ps.refresToken(responseTaskFloorSC);  
      this._gs.collectionTaskFloorSC = responseTaskFloorSC.tasks;

      this._gs.collectionCommonServiceTask = [];
      url = `${ Util.URL_COMMON_SERVICES_TASKS }/project/${this.idProject}/PISOS S.C`;
      const responseCommonServiceTask = await this._ps.getObjectsAny(url,0).toPromise();
      this._ps.refresToken(responseCommonServiceTask);
      this._gs.collectionCommonServiceTask = responseCommonServiceTask.commonServiceTasks;
      let graphicFlorrSC:any = {};

      this._gs.collectionTaskFloorSC.forEach(task => {
          
        graphicFlorrSC.task = task;
        let floorSCs: CommonService[] = [];
        
        this._gs.collectionCommonServiceTask.forEach(commonServiceTask => {
          let exist=false;
          if(commonServiceTask.task._id === task._id){
              floorSCs.forEach(element => {
              if(element._id === commonServiceTask._id){
                exist=true;
              }
            });
            if(!exist){
              commonServiceTask.commonService.status = commonServiceTask.status;
              floorSCs.push(commonServiceTask.commonService);
            }
          }
        });

        let floorSCTemp:any = {};
        for(let i=0;i<(floorSCs.length-1);i++){
          for(let j=0;j<((floorSCs.length-1)-i);j++){
              if(floorSCs[j].number>floorSCs[j+1].number){
                floorSCTemp=floorSCs[j];
                floorSCs[j]=floorSCs[j+1];
                floorSCs[j+1]=floorSCTemp;
              }
          }
        }

        graphicFlorrSC.commonServices = floorSCs;
        if(graphicFlorrSC.commonServices.length > 0){
          this._gs.collectionGraphicFloorSC.push(graphicFlorrSC); 
        }                   
        floorSCs = [];
        graphicFlorrSC = {};

        this.loadingFloorsSC = false;

      });

    } catch(err) {
      this.loadingFloorsSC = false;
      console.log(err);
    }

  }

  async loadLocations(){
    
    try{

      this.loadingEmplacement = true;

      let url = `${ Util.URL_TASKS_BY_TYPE }/EMPLAZAMIENTOS`;
      const responseTaskEmplacement = await this._ps.getObjectsAny(url,0).toPromise();
      this._ps.refresToken(responseTaskEmplacement);  
      this._gs.collectionTaskEmplacement = responseTaskEmplacement.tasks;

      this._gs.collectionCommonServiceTask = [];
      url = `${ Util.URL_COMMON_SERVICES_TASKS }/project/${this.idProject}/EMPLAZAMIENTOS`;
      const responseCommonServiceTask = await this._ps.getObjectsAny(url,0).toPromise();
      this._ps.refresToken(responseCommonServiceTask);
      this._gs.collectionCommonServiceTask = responseCommonServiceTask.commonServiceTasks;
      let graphicEmplacement:any = {};


      this._gs.collectionTaskEmplacement.forEach(task => {
          
        graphicEmplacement.task = task;
        let emplacements: CommonService[] = [];
        
        this._gs.collectionCommonServiceTask.forEach(commonServiceTask => {
          let exist=false;
          if(commonServiceTask.task._id === task._id){
              emplacements.forEach(element => {
              if(element._id === commonServiceTask._id){
                exist=true;
              }
            });
            if(!exist){
              commonServiceTask.commonService.status = commonServiceTask.status;
              emplacements.push(commonServiceTask.commonService);
            }
          }
        });

        let emplacementsTemp:any = {};
        for(let i=0;i<(emplacements.length-1);i++){
          for(let j=0;j<((emplacements.length-1)-i);j++){
              if(emplacements[j].number>emplacements[j+1].number){
                emplacementsTemp=emplacements[j];
                emplacements[j]=emplacements[j+1];
                emplacements[j+1]=emplacementsTemp;
              }
          }
        }

        graphicEmplacement.commonServices = emplacements;
          
        if(graphicEmplacement.commonServices.length > 0){
          this._gs.collectionGraphicEmplacement.push(graphicEmplacement); 
        }                 
        emplacements = [];
        graphicEmplacement = {};

      });

      this.loadingEmplacement = false;

    }catch(err){
      this.loadingEmplacement = false;
      console.log(err);
    }

  }

  ngOnInit() {
    this.loader.show();
  }

  ngAfterViewChecked() {
    this.loader.hide();
  }

  back() {
    this.location.back()
  }

  detailByFloor(idTask:String, idFloor: string) {

    this.router.navigate(['/pages/ganttDepartment', this.idProject, 
                          this._gs.collectionGraphicFloor[Number(idTask)].floors[idFloor]._id, 
                          this._gs.collectionGraphicFloor[Number(idTask)].task._id, this.nombreProyecto, 
                          this._gs.collectionGraphicFloor[Number(idTask)].task.name, 
                          this._gs.collectionGraphicFloor[Number(idTask)].floors[idFloor].number])

  }

  detailByCommonService(idTask:String, idFloor: string, type: string) {

    if(type === 'FloorSC'){
      this.router.navigate(['/pages/ganttCommonService', this.idProject, 
                            this._gs.collectionGraphicFloorSC[Number(idTask)].commonServices[idFloor]._id, 
                            this._gs.collectionGraphicFloorSC[Number(idTask)].task._id, this.nombreProyecto, 
                            this._gs.collectionGraphicFloorSC[Number(idTask)].task.name, 
                            this._gs.collectionGraphicFloorSC[Number(idTask)].commonServices[idFloor].number, type])
    }
    if(type === 'Underground'){
      this.router.navigate(['/pages/ganttCommonService', this.idProject, 
                            this._gs.collectionGraphicUnderground[Number(idTask)].commonServices[idFloor]._id, 
                            this._gs.collectionGraphicUnderground[Number(idTask)].task._id, this.nombreProyecto, 
                            this._gs.collectionGraphicUnderground[Number(idTask)].task.name, 
                            this._gs.collectionGraphicUnderground[Number(idTask)].commonServices[idFloor].number, type])
    }
    if(type === 'Emplacement'){
      this.router.navigate(['/pages/ganttCommonService', this.idProject, 
                            this._gs.collectionGraphicEmplacement[Number(idTask)].commonServices[idFloor]._id, 
                            this._gs.collectionGraphicEmplacement[Number(idTask)].task._id, 
                            this.nombreProyecto, this._gs.collectionGraphicEmplacement[Number(idTask)].task.name, 
                            this._gs.collectionGraphicEmplacement[Number(idTask)].commonServices[idFloor].number, type])
    }

  }

}
