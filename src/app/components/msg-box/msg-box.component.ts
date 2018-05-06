import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MsgBoxService } from './msg-box.service';

@Component({
  selector: 'msg-box',
  templateUrl: './msg-box.component.html',
  styles: []
})
export class MsgBoxComponent implements OnInit {
  


  
  
  constructor(public _msg: MsgBoxService ) {


   }
  


  ngOnInit() {
  }

}
