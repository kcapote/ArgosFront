import { Component, OnInit } from '@angular/core';
import { SubTask } from '../../interfaces/subTask.interface';
import { Router } from '@angular/router';
import { ProviderService } from '../../services/provider.service';
import { Util } from '../../util/util';

@Component({
  selector: 'app-sub-task',
  templateUrl: './sub-task.component.html',
  styles: []
})
export class SubTaskComponent implements OnInit {
  title: string = "Tareas";
  collection: SubTask;

  constructor(private router: Router,
              private _ps: ProviderService  ) { 
      
      _ps.getObjects(Util.URL_SUB_TASKS).subscribe(
          res => {
   
            this.collection = res.subTasks;

          }

      );          





  }

  ngOnInit() {
  }

  
  edit(id: string) {
    
    this.router.navigate(['/editSubTask',id])

  }

  //988830997


}
