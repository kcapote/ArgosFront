import { FormControl } from "@angular/forms";


export class Util {
    //public static URL_SERVER = 'http://180.124.152.20:3001';
    public static URL_SERVER = 'http://localhost:3001';
    public static TOKEN = "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVG9la2VuIjp7Il9pZCI6IjVhZDk0NThlZWJhYmRlMDNiNDU4Yjk3MSIsIm5hbWUiOiJLZXJieXQiLCJsYXN0TmFtZSI6IkNhcG90ZSIsImVtYWlsIjoia2VyYnl0LmNhcG90ZUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiIsIl9fdiI6MCwicm9sZSI6IkFETUlOX1JPTEUifSwiaWF0IjoxNTI0MzQ1NzQxLCJleHAiOjE1NTU4ODE3NDF9.A4GejRK_F5lAsOpqNUhzimk-tVS7lgRvX8O7Vpju6fg"    
    public static  URL_TASKS  = `${ Util.URL_SERVER }/task` ;
    public static  URL_TASKS_BY_TYPE  = `${ Util.URL_SERVER }/task/type` ;
    public static  URL_SUB_TASKS  = `${ Util.URL_SERVER }/subtask` ;
    public static  URL_POSITIONS  = `${ Util.URL_SERVER }/position` ;
    public static  URL_EMPLOYEE  = `${ Util.URL_SERVER }/employee` ;
    public static  URL_POJECTS  = `${ Util.URL_SERVER }/project` ;
    public static  URL_FLOORS  = `${ Util.URL_SERVER }/floor` ;
    public static  URL_DEPARTMENTS  = `${ Util.URL_SERVER }/department`;
    public static  URL_COMMON_SERVICES  = `${ Util.URL_SERVER }/commonservice` ;
    public static  URL_PROJECT_EMPLOYEES  = `${ Util.URL_SERVER }/employeeproject` ;
    public static  URL_DEPARTMENTS_TASKS  = `${ Util.URL_SERVER }/departmenttask`;
    public static  URL_DEPARTMENTS_SUB_TASKS  = `${ Util.URL_SERVER }/departmentsubtask`;
    public static  URL_COMMON_SERVICES_TASKS  = `${ Util.URL_SERVER }/commonservicetask`;
    public static  URL_COMMON_SERVICES_SUB_TASKS  = `${ Util.URL_SERVER }/commonservicesubtask`;
    public static  URL_LOGIN  = `${ Util.URL_SERVER }/security/login/`;
    public static  URL_LOGON  = `${ Util.URL_SERVER }/security/logon`;
    public static  URL_USER  = `${ Util.URL_SERVER }/user`;
    public static  URL_EMPLOYEE_SUBTASK  = `${ Util.URL_SERVER }/employeesubtask`;


    
    

    
    //Constantes MsgBox
    public static SAVE_TITLE = "Guardar";
    public static DELETE_TITLE = "Eliminar";
    public static UPDATE_TITLE = "Editar";
    public static MSJ_SAVE_SUCCESS = "El registro ha sido guardado exitosamente";
    public static MSJ_UPDATE_SUCCESS = "El registro ha sido actualizado exitosamente";
    public static MSJ_DELETE_SUCCESS = "El regsitro ha sido eliminado exitosamente";
    public static MSJ_UPDATE_QUESTION = "¿Está seguro que desea actualizar el registro?";
    public static MSJ_DELETE_QUESTION = "¿Está seguro que desea eliminar el registro?";
    public static ERROR = "ERROR";
    public static OK_RESPONSE = "OK";
     
    

    //Tipos MsgBox
    public static  ACTION_INFO: string = "INFO";
    public static  ACTION_QUESTION: string = "QUESTION";  
    public static  ACTION_SUCCESS: string = "SUCCESS";
    public static  ACTION_DELETE: string = "DELETEE";
    public static  ACTION_UPDATE: string = "UPDATE";

    
    //Mensajes Validaciones 
    public static  REQUIRED_FIELD: string = "El campo es obligatorio";
    public static  NUMERIC_FIELD: string = "El campo debe ser numerico";
    public static  RUT_INVALID: string = "El rut no es válido";
    public static  PORCENTAJE_FIELD: string = "El campo acepta valor entre 0 - 100";




    
    private static serie = [2, 3, 4, 5, 6, 7];
    
    private static isValidRUT(rut: string):boolean {

        rut  = rut.replace(/\.|\-/g,""); 
        
        if(rut.length<2) {
           return false;     
        }

        let temp = this.calulateDV(rut.substr(0,rut.length-1),0)
        let ultDigit = rut.substr(rut.length-1,rut.length)
        let m = Number(temp) % 11;
        let dvCalc = (11 - m);            
        let dv:any = 0;
        if(dvCalc == 11) {
            dv = 0;
        } else if(dvCalc == 10){
            dv = "K";    
        }else {
            dv = dvCalc;
        }    
        return String(dv).toLocaleLowerCase() === ultDigit ? true: false; 
        
    }    


    private static calulateDV(rut: string, i: number){
        
        let idx = (i+1)<=5? (i+1):0;  
        
        if(rut.length>1){
            let ult = rut.substr(rut.length-1,rut.length);
            let value = Number(ult) * Util.serie[i];
            let rutCut = rut.substr(0,rut.length-1);  
            return value + this.calulateDV(rutCut,idx);
        }else{
            return Number(rut) * Util.serie[i];  
        }    


    }


    public static rutValid( control:FormControl ):{[s:string]:boolean} {
       
        let rut: string = control.value;

        if(!Util.isValidRUT(rut)){
             return {
                     rutValid: false
                    }
         }

        return null;
    }


    public static formatRut(rut: string) {

        rut  = rut.replace(/\.|\-/g,""); 

        if( rut.length < 3){
            return rut;  
        }
        
        let l = rut.length;

        return  this.getFormatRut(rut.substr(0,l-1)) + "-" + rut.substr(l-1,l) ;
    }

    private static getFormatRut(str: string): string {
       
        let l = str.length;        
        if(str.length <= 3){
          return str; 
        }else{
          return  this.getFormatRut(str.substr(0,l-3) )  +"."+ this.getFormatRut(str.substr(l-3,l) )  ;
        }
    
    }
       
    
    public static removeFromArray( elem: any, arr: any[]): any[] {
        
        for(let i = 0; i < arr.length; i++) {
            if(arr[i] === elem ){
                arr.splice(i,1);                    
            }

        }
        
        return arr;

    }



    
}

