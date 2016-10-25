/* * * ./app/comments/services/comment.service.ts * * */
// Imports
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import  {SystemConfig} from '../entity/SystemConfig';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SystemConfigService {
     // Resolve HTTP using the constructor
     constructor (private http: Http) {}
     private listUrl = "http://localhost:3200/systemConfig/list";
     private getUrl = "http://localhost:3200/systemConfig/get";
     private addUrl = "http://localhost:3200/systemConfig/add";
     private getBysfUrl = "http://localhost:3200/systemConfig/getBySFId";
     private getBySysIdUrl = "http://localhost:3200/systemConfig/getBySysId";
     private getFileBySysIdUrl = "http://localhost:3200/systemConfig/getFileBySysId";
     private deleteUrl ="http://localhost:3200/systemConfig/delete";
     private updateUrl = "http://localhost:3200/systemConfig/update";

     listSystemConfig() : Observable<SystemConfig[]>{
         // ...using get request
         return this.http.get(this.listUrl)
                        // ...and calling .json() on the response to return data
                         .map((res:Response) => res.json())
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
     }

     getSystemConfig(id: number): Observable<SystemConfig[]>  { //observable -- map,   promise--then
         return this.http.get(this.getUrl+"/"+id)                        
                .map((res:Response) => res.json())
                // .do(user =>console.log(user+'....from service'+id))                       
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
      }

     getFileBySysId(system_id: number): Observable<SystemConfig[]>  { //observable -- map,   promise--then
         return this.http.get(this.getFileBySysIdUrl+"/"+system_id)                        
                .map((res:Response) => res.json())
                // .do(user =>console.log(user+'....from service'+id))                       
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
      }

      getScBySysId(system_id: number): Observable<SystemConfig[]>  { //observable -- map,   promise--then
         return this.http.get(this.getBySysIdUrl+"/"+system_id)                        
                .map((res:Response) => res.json())
                // .do(user =>console.log(user+'....from service'+id))                       
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
      }


      getSCBysf(system_id: number, file_id: number): Observable<SystemConfig[]>{//, format:string, +"/"+format
        return this.http.get(this.getBysfUrl+"/"+system_id+"/"+file_id)                        
                .map((res:Response) => res.json())
                // .do(user =>console.log(user+'....from service'+id))                       
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }

      addSystemConfig(body:Object): Observable<SystemConfig[]>{
        let bodyString = JSON.stringify(body); 
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers }); 

          
        return this.http.post(this.addUrl, body, options) 
                         .map((res:Response) => res.json()) 
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
      }

      updateSystemConfig(body:Object) :Observable<SystemConfig[]>{
        let bodyString = JSON.stringify(body); 
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers }); 

          return this.http.post(this.updateUrl,body,options)
                     .map((res:Response) => res.json()) 
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
      }

      deleteSystemConfig(id: number): Observable<SystemConfig[]>{
         return this.http.delete(`${this.deleteUrl}/${id}`) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
      }
}
