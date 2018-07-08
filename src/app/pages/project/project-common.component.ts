import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidTypesTasks } from '../../enums/valid-types-tasks.enum';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Department } from '../../interfaces/department.interface';
import { ProviderService } from '../../services/provider.service';
import { Util } from '../../util/util';
import { CommonService } from '../../interfaces/common-services.interface';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { IfStmt } from '@angular/compiler';
import { CommonServiceTask } from '../../interfaces/commonServiceTask.interface';
import { CommonServiceSubTask } from '../../interfaces/commonServiceSubTask.interface';
import { LoaderService } from '../../components/loader/loader.service';

@Component({
  selector: 'app-project-common',
  templateUrl: './project-common.component.html',
  styles: []
})
export class ProjectCommonComponent implements OnInit {
  idProject: string;
  form: FormGroup = new FormGroup({});  
  existRecords: boolean= false;

  enumType =  Object.keys(ValidTypesTasks).map(
    r => {
        return ValidTypesTasks[r];       
    }
  ); 


  constructor(private activatedRoute: ActivatedRoute,
              private _ps: ProviderService,
              private router: Router,
              private _msg: MsgBoxService,
              private loader: LoaderService) { 
                
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

    let sub = 0;
    let emp = 0;
    let piso = 0;

    this._ps.getObjectsByFather(Util.URL_COMMON_SERVICES,'project',0,this.idProject,0).subscribe(
      res => {
        this._ps.refresToken(res);
        console.log(res);
        
        this.existRecords = res.totalRecords > 0 ? true: false;
        
        sub = this.countOcurrences(res.commonServices, ValidTypesTasks.SUBTERRANEOS);         
        emp = this.countOcurrences(res.commonServices, ValidTypesTasks.EMPLAZAMIENTOS);         
        piso = this.countOcurrences(res.commonServices, ValidTypesTasks.PISOS); 
        this.form.get(ValidTypesTasks.SUBTERRANEOS).setValue(sub);   
        this.form.get(ValidTypesTasks.EMPLAZAMIENTOS).setValue(emp);
        this.form.controls[ValidTypesTasks.PISOS].setValue(piso);  
        
      }        
    )
    
    
    // this.form = new FormGroup();
    

  }


  ngOnInit() {
    this.loader.show();
  }

  ngAfterViewChecked() {
    this.loader.hide();
  }



  countOcurrences(c: CommonService[], task: string): number 
  {
    let counter:number  = 0;
    c.forEach(
      r=>{
        if(r.type == task){
          console.log('en el if ', task);
          
          counter = counter+1;
        }
      }  

    );
    
    return counter;
  }


  save() {
    this.loader.show();
    if(!this.existRecords){ 
      let commonList: any[] = [];
       Object.keys(this.form.value).forEach(
           res => {
            console.log(res);
            console.log(this.form.controls[res].value);
            
            for(let i=0; i <  this.form.controls[res].value; i++){
              let commonElement: any = {
                project: this.idProject,
                number: i+1,
                type: res,
                status: 0    
              }
              commonList.push(commonElement);
            }
          });

          this._ps.saveObject(Util.URL_PROJECT_ESTRUCTURE+'/commonServices', commonList,0 ).subscribe(
            res => {
          
            });
                    
       this._msg.show(Util.SAVE_TITLE, Util.MSJ_SAVE_SUCCESS,Util.ACTION_SUCCESS).subscribe(
         res => {
           commonList = [];
           this.form.controls[res] = null;
           this.router.navigate(['/pages/projectEmployees',this.idProject]);   
         }
       )
    }else {
      this.router.navigate(['/pages/projectEmployees',this.idProject]);
    }   
     
     
  }


}// end Class



