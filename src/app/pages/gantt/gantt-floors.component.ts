import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Floors } from '../../interfaces/floors.interface';
import { Task } from '../../interfaces/task.interface';
import { Util } from '../../util/util';

@Component({
  selector: 'app-gantt-floors',
  templateUrl: './gantt-floors.component.html',
  styles: []
})
export class GanttFloorsComponent implements OnInit {
  
  idProject: string;
  collectionFloors: Floors[] = [];
  collectionTask: Task[] = [];

  constructor(private _ps: ProviderService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    activatedRoute.params.subscribe(
       p => {
            if(p['id']){
              this.idProject = p['id'];
              this._ps.getObjectsByFather(Util.URL_FLOORS,'project',0, this.idProject).toPromise().then(
                    res=> { 
                      this.collectionFloors = res.floors;
                    }                    
              ).catch(
                error=> { 
                  console.log(error);
                 }
              );
            } 
        }
      );

      _ps.getObjects(Util.URL_TASKS).toPromise().then(
        res => {
            this.collectionTask = res.tasks;
        }
      ).catch(
        error => {
          console.log(error);
          
        }
      )

  
    console.log("como estas");
  
  }

  ngOnInit() {
  }

}
