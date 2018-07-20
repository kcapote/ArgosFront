import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { Project } from '../../interfaces/project.interface';
import { Util } from '../../util/util';
import { Router } from '@angular/router';
import { LoaderService } from '../../components/loader/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})

export class HomeComponent implements OnInit, AfterViewInit {

  collection: Project[] = [];
  labelChart;
  dataChart;

  constructor(private _ps: ProviderService,
              private router: Router,
              private loader: LoaderService) { 
      
       this._ps.getObjects(Util.URL_POJECTS).subscribe(
         res => {           
           this._ps.refresToken(res);
           this.collection = res.projects;
         }   
      );
      


  }

  ngOnInit() {
    this.loader.show();
  }

  
  ngAfterViewInit(){
    
  }

  viewGantt(idx: number){
    
    this.router.navigate(['/pages/gantt',this.collection[idx]._id, this.collection[idx].name])

  }





}
