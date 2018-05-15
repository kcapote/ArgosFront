import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { Project } from '../../interfaces/project.interface';
import { Util } from '../../util/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})

export class HomeComponent implements OnInit {

  collection: Project[] = [];

  constructor(private _ps: ProviderService,
              private router: Router) { 
      
      _ps.getObjects(Util.URL_POJECTS).subscribe(
         res => {
           this.collection = res.projects;
         }   
      );

  }

  ngOnInit() {
  }


  viewGantt(idx: number){
    
    this.router.navigate(['/gantt',this.collection[idx]._id])

  }

}
