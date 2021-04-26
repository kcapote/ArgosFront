import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../interfaces/employee.interface';
import { Util } from '../../util/util';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { ProviderService } from '../../services/provider.service';
import { Project } from '../../interfaces/project.interface';
import { ProjectEmployees } from '../../interfaces/project-employees.interface';
import { ValidTypesStatus } from '../../enums/valid-types-status.enum';
import { Validators } from '@angular/forms';
import { LoaderService } from '../../components/loader/loader.service';

@Component({
  selector: 'app-project-employees',
  templateUrl: './project-employees.component.html',
  styles: []
})
export class ProjectEmployeesComponent implements OnInit, AfterViewInit {
  idProject: string;
  title = "Empleados";  
  collection: Employee[] = []
  id: string;
  idxSel: number;
  term: string;
  model: string = Util.URL_EMPLOYEE;
  totalRecords: number;  
  project: Project;
  selCollection: ProjectEmployees[] = []; 
  notify: EventEmitter<boolean>;
  @ViewChild('p') pag: ElementRef;
  userTemp: any;  

  constructor(private activatedRoute: ActivatedRoute,
              private _ps:ProviderService,
              private router: Router,
              private _msg: MsgBoxService,
              private loader: LoaderService) { 

    this.activatedRoute.params.subscribe(params =>{
      if(params['id']){
          this.idProject = params['id'];
          this.initData();
        }
      }
    );
  }

  async initData(){
    try{
      this._ps.loading = true;
      

      let user = JSON.parse(localStorage.getItem('user'));
      const responseUser = await this._ps.getObject(Util.URL_USER,user._id).toPromise();
      this._ps.refresToken(responseUser);                                           
      this.userTemp = responseUser.users[0];
      if(user.role != this.userTemp.role){
          localStorage.setItem('user','');
          this.router.navigate(['login'])
      }

      //Obtengo el nombre del proyecto
      const responseProject = await this._ps.getObject(Util.URL_POJECTS,this.idProject,0).toPromise();
      this._ps.refresToken(responseProject);
      this.project = responseProject.projects[0];
      
      
      //cargo la lista de empleados
      const responseEmployee =  await this._ps.getObjectsAny(Util.URL_EMPLOYEE+"",0).toPromise();
      this._ps.refresToken(responseEmployee);
      this.collection = responseEmployee.employees;
      this.totalRecords = responseEmployee.totalRecords; 
      
      this._ps.loading = false;

    }catch(error){
      this._ps.loading = false;
      console.log(error);
    }   


    
  }

  ngOnInit() {
      this.loader.show();
      //Cargo los empleados del proyecto
      this._ps.getObjectsByFather(Util.URL_PROJECT_EMPLOYEES,"project",0,this.idProject,0).subscribe(
        res => {
          this._ps.refresToken(res);  
          this.selCollection = res.employeeProjects;
            // this.selCollection.forEach(
            //    r => {
            //      r.load = true;
            //    }        
            // );            
            console.log(res);
              
            this.resfreshSelected();

        }
      )
  }



  ngAfterViewInit() {
    this.resfreshSelected();
  
    this.notify = this.pag['change'];
  
      this.notify.subscribe(
        res => {
         this.resfreshSelected();          
        }
      )
          
  }

  updateSel(value, idx: number) {
    
    let idTemp = this.collection[idx]._id;
    
    let existOnDb = this.selCollection.find(
                      sw => {
                        return sw.load == true  
                      }
                    );

    if(value){
      //Si existe en bd pero esta inactivo
      if(existOnDb) {
         this.selCollection.map(
            m => {
              if( m.employee == this.collection[idx]._id ){
                m.recordActive = ValidTypesStatus.ACTIVE;
              }
            }
         ); 

      }else { // si no existe en bd y se agrega nuevo
        let fec: Date = new Date() ;
        let temp: ProjectEmployees = {
            employee: this.collection[idx]._id,
            project: this.idProject,
            startDate: fec.toString(),
            recordActive: ValidTypesStatus.ACTIVE  
        } 
        this.selCollection.push(temp);

      }

    }else { // si se elimina el empleado del proyecto
      if(existOnDb){
        this.selCollection.map(
          m => {
            if( m.employee == this.collection[idx]._id ){
              m.recordActive = ValidTypesStatus.DELETED;
              m.endDate = (new Date()).toDateString();
            }
          }
       );
      }else {
        this.selCollection = Util.removeFromArray( this.collection[idx]._id, this.selCollection);

      }

    }

  }


  resfreshSelected() {
    this.collection.forEach(
        e => {
            if(this.selCollection.find( 
                f => {
                  return f.employee === e._id && f.recordActive == ValidTypesStatus.ACTIVE  ;
                }
              )){
                e.sel = true;
              }

        }
    ) 
  
  }


  isActiveEmployeeProject(idEmployee: string) {

   let d =  this.selCollection.find(
      f => {
        if(f.employee == idEmployee) {
          return (f.recordActive === ValidTypesStatus.ACTIVE);  
        }
      }
    );
    

    return d.recordActive == ValidTypesStatus.ACTIVE? true: false;

  }


  search() {
    this.loader.show();
    if(this.term.length>0){
        this._ps.getObjects(Util.URL_EMPLOYEE,0 ,this.term ).subscribe(
            res => {
                this.collection = res.employees;
                this.totalRecords = res.totalRecords;
                this.resfreshSelected();
            }   
        )       
     }else{
         this._ps.getObjects(Util.URL_EMPLOYEE).subscribe(
             res => {
                this.collection = res.employees;
                this.totalRecords = res.totalRecords;
                this.resfreshSelected();
             }
         );
     } 
  }   
  
  
  saveAll () {
    this.selCollection.forEach(
      e => {
        if(e.load){
          this.update(e);
        }else{
          this.save(e);  
        }        
      }
    )
    this._msg.show(Util.SAVE_TITLE, Util.MSJ_SAVE_SUCCESS, Util.ACTION_SUCCESS).subscribe(
      res => {
          this.router.navigate(['/pages/projects']);
      }
    )
  }



  save(pe: ProjectEmployees) {
    this._ps.saveObject(Util.URL_PROJECT_EMPLOYEES, pe,0 ).subscribe(
      res => {}
    )

  }

  update(pe: ProjectEmployees) {
    this._ps.updateObject(Util.URL_PROJECT_EMPLOYEES,pe._id,pe,0).subscribe(
      res => {}
    )
  }


//http://localhost:4200/projectEmployees/5af78c5cc5dec70fb46f4784

}
