import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { Util } from '../../util/util';
import { log } from 'util';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styles: []
})
export class DoughnutChartComponent implements OnInit {

  public doughnutChartLabels:string[] = [];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';

  constructor(private _ps: ProviderService) { 

    this._ps.getObjectsAny(Util.URL_EMPLOYEE_SUBTASK+"/find/top10").subscribe(
      res=> {
        
        if(res){
          let col:any[] = res.donuts;
          this.doughnutChartData = [];
          for(let i =0; i< col.length; i++) {
            this.doughnutChartLabels.push(col[i].proName);
            this.doughnutChartData.push(col[i].total );  
          } 
         
           
          
        }
      }
  );
  

  }

  ngOnInit() {
   


  }

  public chartClicked(e:any):void {

  }
 
  public chartHovered(e:any):void {

  }
}
