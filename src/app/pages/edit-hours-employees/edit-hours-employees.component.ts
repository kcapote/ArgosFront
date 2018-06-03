import { Component, OnInit } from '@angular/core';
import { Util } from '../../util/util';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { ProviderService } from '../../services/provider.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-hours-employees',
  templateUrl: './edit-hours-employees.component.html',
  styles: []
})
export class EditHoursEmployeesComponent implements OnInit {
  
  urlEmployyeeSub = Util.URL_EMPLOYEE_SUBTASK;
  urlProjects = Util.URL_POJECTS;
  collection:any [] = [];
  project: any = {};

  constructor(
    private _msg: MsgBoxService,
    private _ps: ProviderService ) {


   }

  ngOnInit() {
    

  }


  delete (idx: number){


  } 

  saveOne (idx: number) {

  }

  saveAll () {


  }


  loadData() {
   
    let urlTemp = `${ Util.URL_EMPLOYEE_SUBTASK }/project/${ this.project['_id'] }` ;
    console.log(urlTemp);
    
    this._ps.getObjectsAny(urlTemp,0).subscribe(
      res => {
        console.log(res);
        this.collection = res['employeeSubTasks'];
      }
    )    

  } 
}
