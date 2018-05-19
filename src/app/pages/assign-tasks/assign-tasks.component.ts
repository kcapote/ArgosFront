import { Component, OnInit } from '@angular/core';
import { Util } from '../../util/util';
import { ValidTypesTasks } from '../../enums/valid-types-tasks.enum';

@Component({
  selector: 'app-assign-tasks',
  templateUrl: './assign-tasks.component.html',
  styles: []
})
export class AssignTasksComponent implements OnInit {
  
  urlProjects: string = Util.URL_POJECTS; 
  urlEmployees: string = Util.URL_EMPLOYEE;
  enumType = Object.keys(ValidTypesTasks).map(
    r => {
      return ValidTypesTasks[r]
    }
  ) ;

  constructor() { }


  ngOnInit() {
  }

}
