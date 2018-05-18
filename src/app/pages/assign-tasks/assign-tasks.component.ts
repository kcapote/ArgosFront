import { Component, OnInit } from '@angular/core';
import { Util } from '../../util/util';

@Component({
  selector: 'app-assign-tasks',
  templateUrl: './assign-tasks.component.html',
  styles: []
})
export class AssignTasksComponent implements OnInit {
  
  urlProjects: string = Util.URL_POJECTS; 

  constructor() { }


  ngOnInit() {
  }

}
