import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { SubTask } from '../../interfaces/subTask.interface';
import { ProviderService } from '../../services/provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Util } from '../../util/util';


@Component({
  selector: 'app-gantt',
  templateUrl: './gantt-departments.component.html',
  styles: []
})

export class GanttDepartmentsComponent implements OnInit {
  
  collectionSubtask: SubTask [] = [];
  idProject: string;
  idFloor: string;

  constructor(private _ps: ProviderService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { 
      
    
    activatedRoute.params.subscribe(
    async (res) => {
        this.idProject = res['idProyect'];
        this.idFloor = res['idFloor']; 

        let url = `${ Util.URL_TASKS_BY_TYPE }/DEPARTAMENTOS`
        // SE ARMA LA LISTA POR PISOS

        await _ps.getObjectsAny(url,0).toPromise().then(
          res => {
            this._ps.refresToken(res);  
            this.collectionSubtask = res.tasks;
          }
        ).catch(
          error => {
            console.log(error);
            
          }
        );
        
        
        console.log(this.idProject);
        console.log(this.idFloor);


      }
    )

   
    

  } 

  ngOnInit(){
     
  }



}
