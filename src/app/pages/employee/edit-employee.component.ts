import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProviderService } from '../../services/provider.service';
import { Util } from '../../util/util';
import { Employee } from '../../interfaces/employee.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';


@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styles: []
})
export class EditEmployeeComponent implements OnInit {

  idEmployee: string;
  item: Employee; 

  constructor(private location: Location,
              private _ps:ProviderService,
              private activatedRoute: ActivatedRoute,
              private _msg: MsgBoxService,
              private router: Router ) { 

      activatedRoute.params.subscribe(
          p => {
              if(p['id']){
                this.idEmployee = p['id'];
              }  
            
          }
      );
      
      this._msg.notify.subscribe(
        res => {
            if( res.type == Util.ACTION_UPDATE && res.response == Util.OK_RESPONSE ) {
                        
              this._ps.updateObject(Util.URL_EMPLOYEE,this.idEmployee,this.item).subscribe(
                res => {
                  this._ps.refresToken(res);                     
                  if(res.success == true){
                       this._msg.show("",Util.MSJ_UPDATE_SUCCESS, Util.ACTION_SUCCESS);
                       router.navigate(['/employees']);   
                  }
                })           
            } 
        }
      );


  }

  ngOnInit() {
  }

  save(employee: Employee) {
    this.item = employee;     
    this._msg.show(Util.UPDATE_TITLE, Util.MSJ_UPDATE_QUESTION, Util.ACTION_UPDATE);



      

  }
  
  back() {
    this.location.back();

  }


}
