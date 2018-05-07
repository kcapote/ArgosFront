import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Util } from '../../util/util';
import { ProviderService } from '../../services/provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Project } from '../../interfaces/project.interface';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';

@Component({
  selector: 'app-form-project',
  templateUrl: './form-project.component.html',
  styles: []
})
export class FormProjectComponent implements OnInit {

  @Input() title:string = "Crear Proyecto";
  idProject: string;
  form: FormGroup;
  url_employee:string = Util.URL_EMPLOYEE;
  item: Project;
  

  constructor(private location: Location,
              private _ps: ProviderService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private _msg: MsgBoxService ) { 
    

      activatedRoute.params.subscribe(
        p  => {
            if(p['id']){
                this.idProject = p['id'];  

                _ps.getObject(Util.URL_POJECTS,this.idProject).subscribe(
                    res => {
                        this.item = res.projects[0];
                        this.item.startDate = this.item.startDate.toString().substr(0,10);
                        this.item.endDate = this.item.endDate?this.item.endDate.toString().substr(0,10):null,
                        this.item._id = this.idProject;
                        this.form.setValue(this.item);  
                    }
                )
            }        
        }
      );


      this._msg.notify.subscribe(
        res => {
            
            if( res.type == Util.ACTION_UPDATE && res.response == Util.OK_RESPONSE ) {
                        
              this._ps.updateObject(Util.URL_POJECTS,this.idProject,this.item).subscribe(
                res => {                    
                  if(res.success == true){
                       this._msg.show("",Util.MSJ_UPDATE_SUCCESS, Util.ACTION_SUCCESS);
                       router.navigate(['/projects']);   
                  }
                })           
            }
            
            if( res.type == Util.ACTION_SUCCESS && res.response == Util.OK_RESPONSE ) {
              router.navigate(['/projects']);  
    
            }
            

        }
      );
            
            


  }



  ngOnInit() {
      this.form = new FormGroup({
      _id: new FormControl(''),
      name: new FormControl('', Validators.required),
      adress: new FormControl('', Validators.required),
      builder: new FormControl('', Validators.required),
      supervisor1: new FormControl('', Validators.required),
      supervisor2: new FormControl('', Validators.required),
      status: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('')

    })
  }


  save() {
      this.item = this.form.value;

      
      
      if(this.idProject){
        this.item._id = this.idProject;
        this._msg.show(Util.UPDATE_TITLE, Util.MSJ_UPDATE_QUESTION, Util.ACTION_UPDATE);

        // this._ps.updateObject(Util.URL_POJECTS,this.idProject,this.item).subscribe(
        //   res => {
        //     console.log(res);
            
        //   }
        // )
      }else{
        console.log(this.item);
        this._ps.saveObject(Util.URL_POJECTS,this.item).subscribe(
          res => {
            if( res.success == true ) {
              this._msg.show(Util.SAVE_TITLE, Util.MSJ_SAVE_SUCCESS, Util.ACTION_SUCCESS );      
            }  
            
          }
        ) 
      }    
        

  }

  back() {
    this.location.back();

  }

}
