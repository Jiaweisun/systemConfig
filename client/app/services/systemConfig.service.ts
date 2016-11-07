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
     private baseUrl = "http://localhost:3200/systemConfig";    
     private profileUrl = "http://localhost:3200/v1/api/properties";

     listSystemConfig() : Observable<SystemConfig[]>{
         // ...using get request
         return this.http.get(this.baseUrl+"/list")                       
                         .map((res:Response) => res.json())                        
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
     }

     getSystemConfig(id: number): Observable<SystemConfig[]>  { //observable -- map,   promise--then
         return this.http.get(this.baseUrl+"/get/"+id)                        
                .map((res:Response) => res.json())                                     
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
      }

     getFileBySysId(system_id: number): Observable<SystemConfig[]>  { //observable -- map,   promise--then
         return this.http.get(this.baseUrl+"/getFileBySysId/"+system_id)                        
                .map((res:Response) => res.json())                                     
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
      }

      getScBySysId(system_id: number): Observable<SystemConfig[]>  { //observable -- map,   promise--then
         return this.http.get(this.baseUrl+"/getBySysId/"+system_id)                        
                .map((res:Response) => res.json())                                     
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
      }


      getSCBysf(system_id: number, file_id: number): Observable<SystemConfig[]>{//, format:string, +"/"+format
        return this.http.get(this.baseUrl+"/getBySFId/"+system_id+"/"+file_id)                        
                .map((res:Response) => res.json())                                     
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }

      addSystemConfig(body:Object): Observable<SystemConfig[]>{
        let bodyString = JSON.stringify(body); 
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers }); 

          
        return this.http.post(this.baseUrl+"/add", body, options) 
                         .map((res:Response) => res.json()) 
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
      }

      updateSystemConfig(body:Object) :Observable<SystemConfig[]>{
        let bodyString = JSON.stringify(body); 
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers }); 

          return this.http.post(this.baseUrl+"/update",body,options)
                     .map((res:Response) => res.json()) 
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
      }

      deleteSystemConfig(id: number): Observable<SystemConfig[]>{
         return this.http.delete(`${this.baseUrl}/delete/${id}`)
                         .map(res=>res.json())
                         .catch(this.handleError);
      }

     listProperties(body:Object): Observable<SystemConfig[]>{
        let bodyString = JSON.stringify(body); 
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers }); 

        console.log('bodyString: '+bodyString);
        return this.http.post(this.profileUrl, body, options)                
                         .map(res=>res.json())  
                         .catch(this.handleError); 
      }

    private handleError (error: any) {
        let errMsg = 'server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }      
}

