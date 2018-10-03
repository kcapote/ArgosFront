import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Util } from '../../util/util';
import { ProviderService } from '../../services/provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Project } from '../../interfaces/project.interface';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { LoaderService } from '../../components/loader/loader.service';
import { Employee } from '../../interfaces/employee.interface';

@Component({
  selector: 'app-form-project',
  templateUrl: './form-project.component.html',
  styles: []
})
export class FormProjectComponent implements OnInit, AfterViewInit {

  title:string = "Crear Proyecto";
  idProject: string;
  form: FormGroup;
  url_employee:string = Util.URL_EMPLOYEE+"/all";
  item: Project;
  userTemp: any;
  employees1: Employee[] = [];
  employees2: Employee[] = [];


  constructor(private location: Location,
              private _ps: ProviderService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private _msg: MsgBoxService,
              private loader: LoaderService) {
                
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
        );

        this._ps.getObjectsAny(this.url_employee).subscribe(
          res=>{
            this.employees1 = res['employees'];
                          
          }, err => {
            console.log(err);
            this.employees1 = null;   
          }    
    
        );


        this._ps.getObjectsAny(this.url_employee).subscribe(
          res=>{
            this.employees2 = res['employees'];
                          
          }, err => {
            console.log(err);
            this.employees2 = null;   
          }    
    
        );

        this.readParams();
        
 

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

    });
      // this.loader.show();
      


  }

  ngAfterViewInit() {
    
    
  }

  // ngAfterViewChecked() {
  //   this.loader.hide();
  // }


  



  save() {
      this.loader.show();
      this.item = this.form.value;
      
      if(this.idProject){
        this.item._id = this.idProject;
        this._msg.show(Util.UPDATE_TITLE, Util.MSJ_UPDATE_QUESTION, Util.ACTION_UPDATE).subscribe(
            res => {
              if( res.type == Util.ACTION_UPDATE && res.response == Util.OK_RESPONSE ) {
                this._ps.updateObject(Util.URL_POJECTS,this.idProject,this.item).subscribe(
                  res => {                    
                    this._ps.refresToken(res);
                    if(res.success == true){                        
                         this._msg.show("",Util.MSJ_UPDATE_SUCCESS, Util.ACTION_SUCCESS).subscribe(
                           res => this.router.navigate(['/pages/projectsFloors',this.idProject])
                          );
                    }
                  })           
              }
            }
          
        )

      }else{
 
        this._ps.saveObject(Util.URL_POJECTS,this.item).subscribe(
          res => {
            this._ps.refresToken(res);
            if( res.success == true ) {              
              this.idProject = res.project._id;      
              this._msg.show(Util.SAVE_TITLE, Util.MSJ_SAVE_SUCCESS, Util.ACTION_SUCCESS ).subscribe(
                  res => this.router.navigate(['/pages/projectsFloors',this.idProject])   

              ); 
            }  
            
          }
        ) 
      }    
        

  }

  back() {
    this.location.back();

  }


  readParams(){
    this.activatedRoute.params.subscribe(
      p  => {
          if(p['id']){
              this.idProject = p['id'];  
              this.title = "Editar Proyecto";  
              this._ps.getObject(Util.URL_POJECTS,this.idProject,0).subscribe(
                  res => {
                      this._ps.refresToken(res);
                      this.item = res.projects[0];
                      //console.log('*********',res);
                      
                      delete this.item['__v'];                        
                      delete this.item['recordActive'];                        
                      this.item.startDate = this.item.startDate.toString().substr(0,10);
                      this.item.endDate = this.item.endDate?this.item.endDate.toString().substr(0,10):null,
                      this.item._id = this.idProject;
                      // this.item.supervisor1 = res.projects[0].supervisor1;
                      // this.item.supervisor2 = res.projects[0].supervisor2;
                      this.item.supervisor1 = res.projects[0].supervisor1._id;
                      this.item.supervisor2 = res.projects[0].supervisor2._id;
                      this.form.setValue(this.item);  
                      console.log('el form',this.form.value);
                      

                  },err => {
                    console.log('Error',err);
                    
                  }
              )
          }        
      }
    );

  }


}
