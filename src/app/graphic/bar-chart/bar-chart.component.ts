import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { Util } from '../../util/util';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styles: []
})
export class BarChartComponent implements OnInit {


  public barChartOptions:any = {
    scaleShowVerticalLines: true,
    responsive: true
  };
  
  public barChartLabels:string[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    // {data: [65], label: 'Proyecto 1'},
    // {data: [75], label: 'Proyecto 2'},
    // {data: [85], label: 'Proyecto 3'},
    // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  constructor(private _ps: ProviderService) { 

 


  }

  ngOnInit() {

    this._ps.getObjectsAny(Util.URL_POJECTS+"/find/top10").subscribe(
      res=>{
        //console.log(res);
        if(res.projects){
           this.barChartData = [];
           res.projects.forEach( e => {
             this.barChartData.push(
                {data:[e.status], label: e.name }

             );
           });
            
        }
        
           
         //console.log(this.barChartLabels);
         
      } 
       
   );
  }



  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 
  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }

}
