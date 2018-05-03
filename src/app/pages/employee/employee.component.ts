import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { Util } from '../../util/util';
import { Router } from '@angular/router';
import { Employee } from '../../interfaces/employee.interface';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styles: []
})
export class EmployeeComponent implements OnInit {
  
  title = "Empleados";  
  collection: Employee[] = []

  constructor(private _sp:ProviderService,
    private router: Router) {
      this._sp.getObjects(Util.URL_EMPLOYEE).subscribe(
        res => {
           this.collection = res.employees;
         
        }

      );
      

    } 

  ngOnInit() {
  }



  edit(id: string) {
    
    this.router.navigate(['/editEmployee',id])

  }

}
