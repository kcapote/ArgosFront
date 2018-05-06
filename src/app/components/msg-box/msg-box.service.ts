import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class MsgBoxService {

  readonly  infoAction: string = "INFO";
  readonly  questionAction:string = "QUESTION";  
  readonly  successAction:string = "SUCCESS";

  typeModal = "";

  public hideModal: string ="modal-hide";
  public notify = new EventEmitter<any>();
  title: string;
  message: string;


  constructor() {
    console.log("msg box service listo");
    

   }

  hide() {
    this.hideModal = "modal-hide";
    this.title = null;
    this.message = null;
  }

  show(title:string, message: string, type?: string) {
    type?this.typeModal = type: this.typeModal = this.infoAction; 
    this.hideModal = "";
    this.title = title;
    this.message = message;
  }


  sendResponse() {
       let response = {
          type: this.typeModal,
          resp: "OK"

       } 

      this.notify.emit(response);
    this.hide();
  }


}
