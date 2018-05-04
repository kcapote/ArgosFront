import { Component, OnInit, Input } from '@angular/core';
import {  Router } from '@angular/router';
import { Project } from '../../interfaces/project.interface';
import { ProviderService } from '../../services/provider.service';
import { Util } from '../../util/util';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styles: []
})


export class ProjectComponent implements OnInit {
  

  collection: Project[] = [];

  constructor(private _sp:ProviderService,
    private router: Router) {
      this._sp.getObjects(Util.URL_POJECTS).subscribe(
        res => {
          console.log(res);
          
           this.collection = res.projects;
         
        }

      );
      

    } 


  ngOnInit() {
  }

  edit(id: string) {
    
    this.router.navigate(['/editProjects',id])

  }
 

}
