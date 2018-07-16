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
  userTemp: any; 

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
      
      let user = JSON.parse(localStorage.getItem('user'));
      this._ps.getObject(Util.URL_USER,user._id).subscribe(
          res => { 
              this._ps.refresToken(res);                                           
              this.userTemp = res.users[0];
              if(user.role != this.userTemp.role){
                  localStorage.setItem('user','');
                  this.router.navigate(['login'])
              }
          }
      )


  }

  ngOnInit() {
  }

  save(employee: Employee) {
    this.item = employee;     
    this._msg.show(Util.UPDATE_TITLE, Util.MSJ_UPDATE_QUESTION, Util.ACTION_UPDATE).subscribe(
      res => {
          if( res.type == Util.ACTION_UPDATE && res.response == Util.OK_RESPONSE ) {
                      
            this._ps.updateObject(Util.URL_EMPLOYEE,this.idEmployee,this.item).subscribe(
              res => {
                this._ps.refresToken(res);                     
                if(res.success == true){
                     this._msg.show("",Util.MSJ_UPDATE_SUCCESS, Util.ACTION_SUCCESS);
                     this.router.navigate(['/pages/employees']);   
                }
              })           
          } 
      }
    );
  }
  
  back() {
    this.location.back()
  }


}
