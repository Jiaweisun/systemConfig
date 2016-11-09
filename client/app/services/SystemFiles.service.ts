/* * * ./app/comments/services/comment.service.ts * * */
// Imports
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import  {SystemFile} from '../entity/SystemFiles';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SystemFilesService {     
     constructor (private http: Http) {}
     private baseUrl = "http://localhost:3200/systemFiles";

     listSystemFile() : Observable<SystemFile[]>{        
         return this.http.get(this.baseUrl+"/list")                        
                         .map((res:Response) => res.json())                        
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
     }

    getSystemFileBySysId(system_id: number): Observable<SystemFile[]>  { //observable -- map,   promise--then
         return this.http.get(this.baseUrl+"/getFileBysId/"+system_id)                        
                .map((res:Response) => res.json())                                     
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
      }
     getSystemFile(id: number): Observable<SystemFile[]>  { 
         return this.http.get(this.baseUrl+"/getById/"+id)                        
                .map((res:Response) => res.json())                      
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
      }

      addSystemFile(body:Object, system_id:number): Observable<SystemFile[]>{        

        let bodyString = JSON.stringify(body); 
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers });

        let sysString = '{"system_id":'+system_id+',';
        let bString = sysString+bodyString.substring(1);
        var myJsonObject = JSON.parse(bString);     
        
        return this.http.post(this.baseUrl+"/add", myJsonObject, options) 
                         .map((res:Response) => res.json()) 
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
      }

      deleteSystemFile(id: number): Observable<SystemFile[]>{
         return this.http.delete(`${this.baseUrl}/delete/${id}`)
                         .map((res:Response) => res.json()) 
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
      }

      deletePropertiesFile(id: number): Observable<SystemFile[]>{
         return this.http.delete(`${this.baseUrl}/deleteFile/${id}`)
                         .map((res:Response) => res.json()) 
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
      }

      updateSystemFile(body:Object) :Observable<SystemFile[]> {       
       
        let bodyString = JSON.stringify(body);         
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers }); 
          var newBody='';          
          if(bodyString!= "" && bodyString != null) {          
            var bodyArray = bodyString.split(',');     
            let bs=bodyArray[0]+','+bodyArray[3]+'}';                 
           newBody = JSON.parse(bs); 
          }            
        return this.http.post(this.baseUrl+"/update", newBody, options) 
                         .map((res:Response) => res.json()) 
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
      }

}
