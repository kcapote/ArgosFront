import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MsgBoxService {

  readonly  infoAction: string = "INFO";
  readonly  questionAction:string = "QUESTION";  
  readonly  successAction:string = "SUCCESS";
  readonly  deleteAction: string = "DELETEE";
  readonly  updateAccion: string = "UPDATE";


  typeModal = "";

  public hideModal: string ="modal-hide";
  public notify = new EventEmitter<any>();
  title: string;
  message: string;


  constructor() {    
   }

  hide() {
    this.hideModal = "modal-hide";
    this.title = null;
    this.message = null;
  }

  // show(title:string, message: string, type?: string) {
  //   type?this.typeModal = type: this.typeModal = this.infoAction; 
  //   this.hideModal = "";
  //   this.title = title;
  //   this.message = message;
  // }

  show(title:string, message: string, type?: string): Observable <any>  {
    type?this.typeModal = type: this.typeModal = this.infoAction; 
    this.hideModal = "";
    this.title = title;
    this.message = message;
    return this.notify;
  }
  

  sendResponse() {
       let output = {
          type: this.typeModal,
          response: "OK"

       } 

      this.notify.emit(output);
    this.hide();
  }


}
