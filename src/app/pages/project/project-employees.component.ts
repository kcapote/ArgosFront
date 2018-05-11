import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-employees',
  templateUrl: './project-employees.component.html',
  styles: []
})
export class ProjectEmployeesComponent implements OnInit {
  idProject: string;

  constructor(activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(
      p => {
        if(p['id']){
          this.idProject = p['id'];
        }
      }      
    )  
  }

  ngOnInit() {
  }

}
