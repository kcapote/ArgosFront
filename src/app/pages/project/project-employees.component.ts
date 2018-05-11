import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../interfaces/employee.interface';
import { Util } from '../../util/util';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-project-employees',
  templateUrl: './project-employees.component.html',
  styles: []
})
export class ProjectEmployeesComponent implements OnInit {
  idProject: string;
  title = "Empleados";  
  collection: Employee[] = []
  id: string;
  idxSel: number;
  term: string;
  model: string = Util.URL_EMPLOYEE;
  totalRecords: number;  

  constructor(private activatedRoute: ActivatedRoute,
              private _ps:ProviderService,
              private router: Router,
              private _msg: MsgBoxService) {
    activatedRoute.params.subscribe(
      p => {
        if(p['id']){
          this.idProject = p['id'];
        }
      }      
    );
    
    this._ps.getObjects(Util.URL_EMPLOYEE).subscribe(
        res => {
          this.collection = res.employees;
          this.totalRecords = res.totalRecords;         
        }
    );

  }

  ngOnInit() {
  }


}
