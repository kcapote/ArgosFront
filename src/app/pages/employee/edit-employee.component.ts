import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProviderService } from '../../services/provider.service';
import { Util } from '../../util/util';
import { Employee } from '../../interfaces/employee.interface';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styles: []
})
export class EditEmployeeComponent implements OnInit {

  idEmployee: string;
  constructor(private location: Location,
              private _ps:ProviderService,
              private activatedRoute: ActivatedRoute) { 

      activatedRoute.params.subscribe(
          p => {
              if(p['id']){
                this.idEmployee = p['id'];
              }  
            
          }
      )


  }

  ngOnInit() {
  }

  save(employee: Employee) {
  
    this._ps.updateObject(Util.URL_EMPLOYEE, this.idEmployee,employee).subscribe(
        res => {
          console.log(res);         

        }    
    ) 

      

  }
  
  back() {
    this.location.back();

  }


}
