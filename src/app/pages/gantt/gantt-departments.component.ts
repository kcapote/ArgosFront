import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { SubTask } from '../../interfaces/subTask.interface';
import { ProviderService } from '../../services/provider.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-gantt',
  templateUrl: './gantt-departments.component.html',
  styles: []
})

export class GanttDepartmentsComponent implements OnInit {
  
  collectionSubtask: SubTask [] = [];


  constructor(private _ps: ProviderService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { 
      
    
    activatedRoute.params.subscribe(
    async (res) => {
         await console.log("hola")   
      }
    )

    console.log("como estas");
    

  } 

  ngOnInit(){
     
  }



}
