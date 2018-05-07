import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProviderService } from '../../services/provider.service';
import { Util } from '../../util/util';
import { Employee } from '../../interfaces/employee.interface';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styles: []
})
export class NewEmployeeComponent implements OnInit {

  constructor(private location: Location,
              private _ps:ProviderService,
              private _msg: MsgBoxService,
              private router: Router) { 

      this._msg.notify.subscribe(
        res => {
          if( res.type == Util.ACTION_SUCCESS && res.response == Util.OK_RESPONSE ) {
            router.navigate(['/employees']);  
  
          }
      });            

    }

  ngOnInit() {

  }


  save(employee: Employee) {
  
    this._ps.saveObject(Util.URL_EMPLOYEE,employee).subscribe(
        res => {
          if( res.success == true ) {
            this._msg.show(Util.SAVE_TITLE, Util.MSJ_SAVE_SUCCESS, Util.ACTION_SUCCESS );      
          }          

        }    
    ) 

      

  }
  
  back() {
    this.location.back();

  }

}
