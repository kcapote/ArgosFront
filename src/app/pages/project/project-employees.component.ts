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

      //cargo la lista de empleados proyecto
      const responseEmployeeProyect =  await this._ps.getObjectsByFather(Util.URL_PROJECT_EMPLOYEES,"project",0,this.idProject,0).toPromise();
      this._ps.refresToken(responseEmployeeProyect);  
      this.selCollection = responseEmployeeProyect.employeeProjects;
      this._ps.loading = false;

      this.resfreshSelected();
    }catch(error){
      this._ps.loading = false;
      console.log(error);
    }   


    
  }

  ngOnInit() {
      this.loader.show();
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
    
    let existOnDb = this.selCollection.find(sw => {
       return sw.load == true  
    });

    if(value){
      //Si existe en bd pero esta inactivo
      if(existOnDb) {
        this.selCollection.map( m => {
            if( m.employee == this.collection[idx]._id ){
              m.recordActive = ValidTypesStatus.ACTIVE;
            }
        }); 
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
        this.selCollection.map(m => {
          if( m.employee == this.collection[idx]._id ){
            m.recordActive = ValidTypesStatus.DELETED;
            m.endDate = (new Date()).toDateString();
          }
        });
      }else {
        this.selCollection = Util.removeFromArray( this.collection[idx]._id, this.selCollection);
      }
    }
  }


  resfreshSelected() {
    this.collection.forEach( e => {
      if(this.selCollection.find(f => {
          return f.employee === e._id && f.recordActive === ValidTypesStatus.ACTIVE  ;
        })
      ){
        e.sel = true;
      }
    });
    console.log(this.collection)
  }


  isActiveEmployeeProject(idEmployee: string) {
   let d =  this.selCollection.find(f => {
      if(f.employee == idEmployee) {
        return (f.recordActive === ValidTypesStatus.ACTIVE);  
      }
    });
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
    let listSave: ProjectEmployees[] = [];
    let listExist: ProjectEmployees[] = [];
    
    this.selCollection.forEach( e => {
        if(e.recordActive === 1){
          listSave.push(e)  
        }
        listExist.push(e)      
    })

    const employees = listSave.filter(function(item) {
      for (let i = 0; i < listExist.length; i++) {
        if (String(item.employee) === String(listExist[i].employee._id))
          return false;
      }
      return true;
    });

    const employeesUpdateTemp = listExist.filter(employee => employee.recordActive === 1);
    let employeesUpdate = listExist.filter(employee => !employee.recordActive);
    employeesUpdate = employeesUpdate.filter(function(item) {
      for (let i = 0; i < employeesUpdateTemp.length; i++) {
        if (String(item.employee._id) === String(employeesUpdateTemp[i].employee))
          return true;
      }
      return false;
    });

    let employeesDelete = listExist.filter(function(item) {
      for (let i = 0; i < listSave.length; i++) {
        if (String(item.employee._id) === String(listSave[i].employee))
          return false;
      }
      return true;
    }).filter(employee => employee.recordActive !== 1).filter(employee => employee.recordActive);

    if(employees.length > 0){
      this.save(employees);
    }

    employeesDelete.forEach(employee => {
      this.delete(employee);
    });

    employeesUpdate.forEach(employee => {
      this.update(employee);
    });

    this._msg.show(Util.SAVE_TITLE, Util.MSJ_SAVE_SUCCESS, Util.ACTION_SUCCESS).subscribe(
      res => {
          this.router.navigate(['/pages/projects']);
      }
    )

  }

  save(pe: ProjectEmployees[]) {
    this._ps.saveObject(Util.URL_PROJECT_EMPLOYEES, pe,0 ).subscribe(
      res => {}
    )
  }

  delete(pe: ProjectEmployees) {
    this._ps.deleteObject(Util.URL_PROJECT_EMPLOYEES, pe._id, 0).subscribe(
      res => {}
    )
  }

  update(pe: ProjectEmployees) {
    this._ps.updateObject(Util.URL_PROJECT_EMPLOYEES, pe._id, pe, 0).subscribe(
      res => {}
    )
  }

}
