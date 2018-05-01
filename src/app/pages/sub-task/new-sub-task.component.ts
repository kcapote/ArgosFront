import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SubTask } from '../../interfaces/subTask.interface';
import { ProviderService } from '../../services/provider.service';
import { Location } from '@angular/common';
import { Util } from '../../util/util';
@Component({
  selector: 'app-new-sub-task',
  templateUrl: './new-sub-task.component.html',
  styles: []
})
export class NewSubTaskComponent implements OnInit {



  constructor(private location: Location,
              private _ps:ProviderService) { }


  ngOnInit() {

  }



  save(subTask:SubTask) {

    this._ps.saveObject(Util.URL_SUB_TASKS,subTask).subscribe(
        res => {        
          console.log(res);
          
          
        }    
    ) 

      

  }
  
  back() {
    this.location.back();

  }
}
