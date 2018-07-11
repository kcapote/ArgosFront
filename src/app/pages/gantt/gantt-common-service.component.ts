import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Util } from '../../util/util';
import { SubTask } from '../../interfaces/subTask.interface';
import { CommonServiceSubTask } from '../../interfaces/commonServiceSubTask.interface';
import { CommonService } from '../../interfaces/common-services.interface';

@Component({
  selector: 'app-gantt-common-service',
  templateUrl: './gantt-common-service.component.html',
  styleUrls: []
})
export class GanttCommonServiceComponent implements OnInit {


  idProject: string;
  idFloor: string;
  idTask: string;
  nameProject: String;
  nameTask: String;
  numberFloor: String;
  type: String;
  collectionSubtask: SubTask [] = [];
  collectionCommonServiceSubTasks: CommonServiceSubTask[] = [];
  collectionGraphicCommonService: any[] = [];

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
          this.type = res['type']; 
  
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

          let typeCS = "";
          if(this.type==="FloorSC"){
            typeCS = "PISOS S.C";
            this.numberFloor = "Pisos SC "+ this.numberFloor;
          }
          if(this.type==="Underground"){
            typeCS = "SUBTERRANEOS";
            this.numberFloor = "Subterraneo "+ this.numberFloor;
          }
          if(this.type==="Emplacement"){
            typeCS = "EMPLAZAMIENTOS";
            this.numberFloor = "Emplazamiento "+ this.numberFloor;
          }

          url = `${ Util.URL_COMMON_SERVICES_SUB_TASKS }/task/${this.idProject}/${this.idTask}/${typeCS}/${this.idFloor}`
          await this._ps.getObjectsAny(url,0).toPromise().then(
            res=> { 
              this._ps.refresToken(res);
              this.collectionCommonServiceSubTasks = res.commonServiceSubTasks;
              let graphicCommonService:any = {};
                      
              this.collectionSubtask.forEach(subTask => {
                
                  graphicCommonService.subTask = subTask;
                  let commonServices: CommonService[] = [];
                  
                  this.collectionCommonServiceSubTasks.forEach(commonServiceSubTask => {
                    let exist=false;
                    if(commonServiceSubTask.subTask._id === subTask._id){
                      commonServices.forEach(element => {
                        if(element._id === commonServiceSubTask.commonService._id){
                          exist=true;
                        }
                      });
                      if(!exist){
                        commonServiceSubTask.commonService.status = commonServiceSubTask.status;
                        if(typeCS==="SUBTERRANEOS"){
                          commonServiceSubTask.commonService.number = "Sub "+commonServiceSubTask.commonService.number;
                        }
                        commonServices.push(commonServiceSubTask.commonService);
                      }
                    }
                  });

                  
                  let commonServicesTemp:any = {};
                  for(let i=0;i<(commonServices.length-1);i++){
                    for(let j=0;j<((commonServices.length-1)-i);j++){
                        if(Number(String(commonServices[j].number).substring(String(commonServices[j].number).length-2))>Number(String(commonServices[j+1].number).substring(String(commonServices[j+1].number).length-2))){
                          commonServicesTemp=commonServices[j];
                          commonServices[j]=commonServices[j+1];
                          commonServices[j+1]=commonServicesTemp;
                        }
                    }
                  }

                  graphicCommonService.commonServices = commonServices;
                  this.collectionGraphicCommonService.push(graphicCommonService);                                    
                  commonServices = [];
                  graphicCommonService = {};

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


  ngOnInit() {
  }

  back() {
    this.location.back()
  }

  detailByCommonService(idSubTask:String) {

    this.router.navigate(['/pages/ganttDetailCommonServices', this.idProject, this.idFloor, this.idTask, idSubTask, this.type])

  }

}
