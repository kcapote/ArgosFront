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
  fromDate: string; 
  toDate: string;

  constructor(
    private _msg: MsgBoxService,
    private _ps: ProviderService ) {


   }

  ngOnInit() {
    

  }


  delete (idx: number){


  } 

  saveOne (idx: number) {
    
    console.log(this.collection[idx]);
    
    // this._msg.show(Util.UPDATE_TITLE,Util.MSJ_UPDATE_QUESTION,Util.ACTION_UPDATE).subscribe(
    //   res => {
    //     if(res.response == Util.OK_RESPONSE){
    //         let a = this.collection[idx];
            

    //     }
    //   }
    // )

  }

  saveAll () {


  }


  loadData() {
   
    console.log(this.fromDate);
    let urlTemp;
    
    if(this.fromDate && this.toDate){
      urlTemp = `${ Util.URL_EMPLOYEE_SUBTASK }/employee/calendar/project/${ this.project['_id']}/${ this.fromDate }/${ this.toDate }`
    } else {
      urlTemp = `${ Util.URL_EMPLOYEE_SUBTASK }/project/${ this.project['_id'] }` ;
    }
    
    this._ps.getObjectsAny(urlTemp,0).subscribe(
      res => {
        console.log(res);
        this.collection = res['employeeSubTasks'];
      }
    )    

  } 
}
