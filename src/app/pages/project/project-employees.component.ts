import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, EventEmitter, OnChanges } from '@angular/core';
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
import { element } from 'protractor';
import { exit } from 'process';

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
  }

  updateSel(value, idx: number) {
    this.collection[idx].sel = !this.collection[idx].sel;
  }


  resfreshSelected() {
    this.collection.forEach( e => {
      const result = this.selCollection.find(f => {
        let exist = false;
        if(f.recordActive){
          exist = f.employee._id === e._id;
        }
        return exist;
      });
      if(result){
        e.sel = true;
      }
    });
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
    const selectEmployees = this.collection.filter(element => element.sel);
    const employeesBD = this.selCollection;

    // se identifican los registros a elminar
    let employeesDelete = employeesBD.filter(employee => employee.recordActive);
    employeesDelete = employeesDelete.filter(function(item) {
      for (let i = 0; i < selectEmployees.length; i++) {
        if (String(item.employee._id) === String(selectEmployees[i]._id))
          return false;
      }
      return true;
    });

    // se identifican los registros a actualizar
    let employeesUpdate = employeesBD.filter(employee => !employee.recordActive);
    employeesUpdate = employeesUpdate.filter(function(item) {
      for (let i = 0; i < selectEmployees.length; i++) {
        if (String(item.employee._id) === String(selectEmployees[i]._id))
          return true;
      }
      return false;
    })

    // se identifican los registros a guardar
    let employeesNews: ProjectEmployees[] = [];
    selectEmployees.forEach(element => {
      let exist = employeesBD.find(employee => employee.employee._id === element._id)
      if(!exist){
        let fec: Date = new Date() ;
        employeesNews.push({
          employee: element._id,
          project: this.idProject,
          startDate: fec.toString(),
          recordActive: ValidTypesStatus.ACTIVE
        });
      }
    });

    console.log("BD: ", this.selCollection)
    console.log("SELECT: ", selectEmployees)
    console.log("DELTE: ", employeesDelete)
    console.log("UPDATE: ", employeesUpdate)
    console.log("SAVE: ", employeesNews)

    employeesDelete.forEach(employee => {
      for (let i = 0; i < this.collection.length; i++) {
        if (String(employee.employee._id) === String(this.collection[i]._id))
          this.delete(employee);
      }
    });

    employeesUpdate.forEach(employee => {
      this.update(employee);
    });

    if(employeesNews.length > 0){
      this.save(employeesNews);
    }

    this._msg.show(Util.SAVE_TITLE, Util.MSJ_SAVE_SUCCESS, Util.ACTION_SUCCESS).subscribe(
      res => {
        window.location.reload();
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
