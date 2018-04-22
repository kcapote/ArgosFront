import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Task } from '../../interfaces/task.interface';
import { ProviderService } from '../../services/provider.service';
import { Util } from '../../util/util';

@Component({ 
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styles: []
})
export class NewTaskComponent implements OnInit {

  constructor(private location: Location,
              private _ps:ProviderService) { }

  ngOnInit() {
  }


  save(task:Task) {
  
    this._ps.saveObject(Util.URL_TASKS,task).subscribe(
        res => {
          console.log(res);         

        }    
    ) 

      

  }
  
  back() {
    this.location.back();

  }

}
