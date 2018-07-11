import { Component, OnInit } from '@angular/core';
import { Util } from '../../util/util';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeSubTask } from '../../interfaces/employee-subtask';
import { ProviderService } from '../../services/provider.service';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';

@Component({
  selector: 'app-employee-subtask',
  templateUrl: './employee-subtask.component.html',
  styles: []
})
export class EmployeeSubtaskComponent implements OnInit {

  urlProjects: string = Util.URL_POJECTS; 
  urlEmployees: string = Util.URL_EMPLOYEE+"/all";

  form: FormGroup;
  idProject: any;
  idEmployee:any;
  

  collection: EmployeeSubTask[] = [];
  item: EmployeeSubTask;


  constructor(private _ps: ProviderService,
              private _msg: MsgBoxService ) { }

  ngOnInit() {

    this.form = new FormGroup(
      {
        project: new FormControl(''),
        employee: new FormControl('', Validators.required)
      })

  }

  updateId(){
    this.idProject = this.form.get('project').value['_id'];
  }
  
  updateIdEmployee(){
    this.idEmployee = this.form.get('employee').value['_id'];
  } 

  query(){
    console.log(this.idProject+"-"+String(this.idProject).length);
    
    let url = Util.URL_EMPLOYEE_SUBTASK+'/employee/'+this.idProject+'/'+this.idEmployee;
    if(this.idProject===0 || String(this.idProject).length===9){
      url = Util.URL_EMPLOYEE_SUBTASK+'/employee/'+this.idEmployee;
    }
    this._ps.getObjectsAny(url).subscribe(
      res => {   
        console.log('********************');
        console.log(res);
        console.log('********************');
                
        this._ps.refresToken(res);
        this.collection = res.employeeSubTasks;
  
        if(this.collection.length == 0 ) {
          this._msg.show('','El empleado no tiene horas asignadas al proyecto',Util.ACTION_INFO).subscribe();
        }
      }   
   );

  }



}
