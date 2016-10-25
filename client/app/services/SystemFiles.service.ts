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
     private listUrl = "http://localhost:3200/systemFiles/list";
     private getUrl = "http://localhost:3200/systemFiles/getById";
     private getBysidUrl = "http://localhost:3200/systemFiles/getFileBysId";
     private addUrl = "http://localhost:3200/systemFiles/add";   
     private deleteUrl ="http://localhost:3200/systemFiles/delete";
     private updateUrl = "http://localhost:3200/systemFiles/update";

     listSystemFile() : Observable<SystemFile[]>{        
         return this.http.get(this.listUrl)                        
                         .map((res:Response) => res.json())                        
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
     }

    getSystemFileBySysId(system_id: number): Observable<SystemFile[]>  { //observable -- map,   promise--then
         return this.http.get(this.getBysidUrl+"/"+system_id)                        
                .map((res:Response) => res.json())                                     
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
      }
     getSystemFile(id: number): Observable<SystemFile[]>  { 
         return this.http.get(this.getUrl+"/"+id)                        
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
        
        return this.http.post(this.addUrl, myJsonObject, options) 
                         .map((res:Response) => res.json()) 
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
      }

      deleteSystemFIle(id: number): Observable<SystemFile[]>{
         return this.http.delete(`${this.deleteUrl}/${id}`)
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
            let bs=bodyArray[0]+','+bodyArray[3]         
           newBody = JSON.parse(bs); 
          }            
        return this.http.post(this.updateUrl, newBody, options) 
                         .map((res:Response) => res.json()) 
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
      }
}
