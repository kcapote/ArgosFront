import { Component, OnInit, Input } from '@angular/core';
import {  Router } from '@angular/router';
import { Project } from '../../interfaces/project.interface';
import { ProviderService } from '../../services/provider.service';
import { Util } from '../../util/util';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { URL_POJECTS } from '../../services/config';
import { LoaderService } from '../../components/loader/loader.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styles: []
})


export class ProjectComponent implements OnInit {
  
  title: string = "Proyectos";
  collection: Project[] = [];
  id: string;
  idxSel: number;
  term: string;
  model: string = URL_POJECTS;
  totalRecords: number;
  userTemp: any;

  constructor(private _ps:ProviderService,
              private router: Router,
              private _msg: MsgBoxService,
              private loader: LoaderService) { 
                  
    let user = JSON.parse(localStorage.getItem('user'));
    this.userTemp = user;

     this._ps.getObjects(Util.URL_POJECTS).subscribe(
        res => {
                       
           this._ps.refresToken(res);
           this.collection = res.projects;
           this.totalRecords = res.totalRecords;   
        }
      );

    

    } 


    ngOnInit() {
        this.loader.show();
    }

    ngAfterViewChecked() {
        this.loader.hide();
    }

  edit(id: string) {
    
    this.router.navigate(['/pages/editProjects',id])

  }
 
  delete(idx:number ){
    this.id = this.collection[idx]._id;
    this.idxSel = idx;
    this.loader.show();
    this._msg.show(Util.DELETE_TITLE ,Util.MSJ_DELETE_QUESTION, Util.ACTION_DELETE).subscribe(
        res => {
            if(res.type == Util.ACTION_DELETE && res.response == Util.OK_RESPONSE ){
                this._ps.deleteObject(Util.URL_POJECTS,this.id).subscribe(
                    res => {                        
                        this._ps.refresToken(res);
                        if(res.success == true) {
                            this._msg.show("", Util.MSJ_DELETE_SUCCESS, Util.ACTION_SUCCESS);                                            
                            this.collection.splice(this.idxSel,1); 
                        }
                    }
                )
            }
        }
    );

  }
 

  search() {
    if(this.term.length>0){
       this._ps.getObjects(URL_POJECTS,0 ,this.term ).subscribe(
           res => {
               console.log('+++++',res);
               
               this._ps.refresToken(res);
               this.collection = res.projects;
               this.totalRecords = res.totalRecords;
           }   
       )       
   }else{
       this._ps.getObjects(URL_POJECTS).subscribe(
           res => {
              this._ps.refresToken(res);
              this.collection = res.projects;
              this.totalRecords = res.totalRecords;
           }
       );
   } 
 }   

}
