import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import "dhtmlx-gantt";
import {} from "@types/dhtmlxgantt";

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styles: [
    `
    :host{
        display: block;
        height: 600px;
        position: relative;
        width: 100%;
    }
  `]
})

export class GanttComponent implements OnInit {
  
  @ViewChild("gantt_here") ganttContainer: ElementRef;



  constructor() { }

  ngOnInit(){
      gantt.init(this.ganttContainer.nativeElement);
  }



}
