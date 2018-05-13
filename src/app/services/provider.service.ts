import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Util } from '../util/util';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class ProviderService {

  constructor(public http: HttpClient) { }



  public getObjects(url: string, pagination: number = 0 ,term?: string): Observable<any> {
        let urlTemp;
         
        if(term) {
          urlTemp = `${url}/search/${ term }/?pagination=${ pagination }&${ Util.TOKEN }`;
        } else {
          urlTemp = `${url}/?pagination=${ pagination }&${ Util.TOKEN }`;
        }
        
        return this.http.get( urlTemp );                
  }


  public getObjectsByFather(url: string, father: string , pagination: number = 0 ,id: string): Observable<any> {
    let urlTemp;    
    urlTemp = `${ url }/${ father }/${ id }?pagination=${ pagination }&${ Util.TOKEN }`;
    
    return this.http.get( urlTemp );                
  }

  public getObject(url: string, id: string): Observable<any> {
    let urlTemp = `${url}/${ id }?${ Util.TOKEN }`;
    return this.http.get( urlTemp );
  }

  public saveObject(url: string, obj: any): Observable<any> {
    
    let headers: HttpHeaders = new  HttpHeaders();
    headers.append('Content-Type', 'aplication/json');
    let urlTemp = `${url}?${ Util.TOKEN }`;
  
    return this.http.post( urlTemp, obj, {headers});
   
  }

  public updateObject(url: string, id: string ,obj: any ): Observable<any> {
      
    let headers: HttpHeaders = new  HttpHeaders();
    headers.append('Content-Type', 'aplication/json');
    let urlTemp = `${ url }/${ id }?${ Util.TOKEN }`;
  
    return this.http.put(urlTemp,obj, {headers});

  } 

  public deleteObject(url:string, id:string ): Observable<any>{
    let urlTemp = `${ url }/${ id }?${ Util.TOKEN }`;
    
    return this.http.delete(urlTemp);
  }

}
