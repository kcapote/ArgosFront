import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidTypesTasks } from '../../enums/valid-types-tasks.enum';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Department } from '../../interfaces/department.interface';
import { ProviderService } from '../../services/provider.service';
import { Util } from '../../util/util';
import { CommonService } from '../../interfaces/common-services.interface';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';

@Component({
  selector: 'app-project-common',
  templateUrl: './project-common.component.html',
  styles: []
})
export class ProjectCommonComponent implements OnInit {
  idProject: string;
  form: FormGroup = new FormGroup({});  


  enumType =  Object.keys(ValidTypesTasks).map(
    r => {
        return ValidTypesTasks[r];       
    }
  ); 


  constructor(private activatedRoute: ActivatedRoute,
              private _ps: ProviderService,
              private router: Router,
              private _msg: MsgBoxService) {
       
    this.enumType.splice(0,1);
    
    this.enumType.forEach(element => {
       this.form.setControl(element, new FormControl('', [Validators.required,Validators.min(1) ]) );       
    });
    

    this.activatedRoute.params.subscribe(
      p => {
        if(p['id']){
          this.idProject = p['id'];
        }
      }
    );

    // this.form = new FormGroup();
    

  }

  ngOnInit() {
    
  }




  save() {
      
     Object.keys(this.form.value).forEach(
        res => {
          console.log(ValidTypesTasks[res]);
          
          for(let i=0; i <  this.form.controls[res].value; i++){
            let d: any = {
              project: this.idProject,
              number: i+1,
              type: res,
              status: 0    
            }
            this._ps.saveObject(Util.URL_COMMON_SERVICES,d).subscribe(
              result => { 

              }
            )  
          }
        }
     );

     this._msg.show(Util.SAVE_TITLE, Util.MSJ_SAVE_SUCCESS,Util.ACTION_SUCCESS).subscribe(
       res => {
          this.router.navigate(['/projectEmployees',this.idProject]);   
       }
     )
     
     
     
  }


}// end Class



