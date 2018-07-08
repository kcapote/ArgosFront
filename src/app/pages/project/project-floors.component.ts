import { Component, OnInit } from '@angular/core';
import { Floors } from '../../interfaces/floors.interface';
import { Validators } from '@angular/forms';
import { ActivatedRoute,  Router } from '@angular/router';
import { ValidTypesFloors } from '../../enums/valid-types-floors';
import { ProviderService } from '../../services/provider.service';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { Util } from '../../util/util';
import { Department } from '../../interfaces/department.interface';
import { DepartmentTask } from '../../interfaces/departmentTask.interface';
import { DepartmentSubTask } from '../../interfaces/departmentSubTask.interface';
import { LoaderService } from '../../components/loader/loader.service';


@Component({
  selector: 'app-project-floors',
  templateUrl: './project-floors.component.html',
  styles: []
})
export class ProjectFloorsComponent implements OnInit {

  idProject: string;
  collection: Floors[] = [];
  numFloors: number;
  numDepts: number;
  saving: boolean = false;
  existFloors = false;
  collectionDepts: Department[] =[];
  local: string = ValidTypesFloors.LOCAL;

  constructor(private activedRoute: ActivatedRoute,
              private _ps: ProviderService,
              private _msg: MsgBoxService,
              private router: Router,
              private loader: LoaderService) { 
                
    activedRoute.params.subscribe(
        p => {
          if(p['id']){
            this.idProject = p['id'];
          }
        }
    );


    this._ps.getObjectsByFather(Util.URL_FLOORS,'project',0, this.idProject).subscribe(
      res => {
        this._ps.refresToken(res);
        this.collection = res.floors;
        this.existFloors = this.collection.length>0? true: false;
        
      }

    )


  }
  

  ngOnInit() {
    this.loader.show();
  }

  ngAfterViewChecked() {
    this.loader.hide();
  }



  buildFloors(){
    
    this.collection = [];
    
    for (let index = 0; index < this.numFloors; index++) {
      let item: Floors={
        number: (index+1),
        project: this.idProject,
        quantityDepartment: this.numDepts,
        type: ValidTypesFloors.RESIDENCIA
      }

      this.collection.push(item);
                              
    }

  }

  loadDepartmens() {
    if(this.collection.length>0) {
      this.collection.forEach(element => {
        this._ps.getObjectsByFather(Util.URL_DEPARTMENTS,'floor',0 ,element._id).subscribe(
          res => {
            this._ps.refresToken(res);
            this.collectionDepts.push(res.departments);
          }
        )      
                
      });
    }
  }

  updateType(idx: number) {   
    this.collection[idx].type = this.collection[idx].type === ValidTypesFloors.RESIDENCIA?ValidTypesFloors.LOCAL: ValidTypesFloors.RESIDENCIA; 
  }



  save() {
    this.loader.show();
    if(!this.existFloors){
      
         
      this.saving = true;
      if(this.collection.length<1) {
        return;
      }

      console.log(this.collection);
      

      this._ps.saveObject(Util.URL_PROJECT_ESTRUCTURE+'/floors', this.collection,0 ).subscribe(
        res => {
      
        });

      this.saving = false;
                         
      this._msg.show(Util.SAVE_TITLE, Util.MSJ_SAVE_SUCCESS, Util.ACTION_SUCCESS ).subscribe(
        res => {
          if(res.type === Util.ACTION_SUCCESS && res.response === Util.OK_RESPONSE ){
            this.collection = [];
            this.router.navigate(['/pages/projectsCommon',this.idProject]);
          }
        }
      );  
    }else{
        this.router.navigate(['/pages/projectsCommon',this.idProject]);
    }
  }

  

}
