import { Component, OnInit } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { ProviderService } from '../../services/provider.service';
import { Util } from '../../util/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styles: []
})
export class TasksComponent implements OnInit {

  title = "Faenas";  
  collection: Task[] = []

  constructor(private _sp:ProviderService,
                      private router: Router) { 

    this._sp.getObjects(Util.URL_TASKS).subscribe(
        res => {
           this.collection = res.tasks;
         
        }

    );

  }

  ngOnInit() {
  }


  edit(id: string) {
    
    this.router.navigate(['/editTask',id])

  }




}
