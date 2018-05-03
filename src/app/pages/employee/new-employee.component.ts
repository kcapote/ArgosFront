import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProviderService } from '../../services/provider.service';
import { Util } from '../../util/util';
import { Employee } from '../../interfaces/employee.interface';


@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styles: []
})
export class NewEmployeeComponent implements OnInit {

  constructor(private location: Location,
              private _ps:ProviderService) { }

  ngOnInit() {

  }


  save(employee: Employee) {
  
    this._ps.saveObject(Util.URL_EMPLOYEE,employee).subscribe(
        res => {
          console.log(res);         

        }    
    ) 

      

  }
  
  back() {
    this.location.back();

  }

}
