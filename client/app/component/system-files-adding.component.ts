import { Component,EventEmitter, Input, OnInit, OnDestroy,Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Rx';

import { SystemService} from '../services/system.service';
import { System } from '../entity/system';
import { SystemFile } from '../entity/SystemFiles';
import {SystemFilesService} from '../services/systemFiles.service';


@Component({
  selector: 'adding-system-files',
  templateUrl: 'app/html/system-files-adding.component.html',
 styleUrls: ['app/css/systemConfig.component.css'],
  providers: [SystemFilesService]
})

export class SystemFilesAddingComponent implements OnInit {
  @Input() systemFile: SystemFile;
  @Output() close = new EventEmitter();
  error: any;
  sub:any;
  id:number;
  navigated = false;

  constructor( 
    private router: Router,  
    private systemFileService: SystemFilesService, 
    private route: ActivatedRoute
    ) {  }

   ngOnInit() {
      this.systemFile = new SystemFile('', '','');
     this.sub = this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        this.id = +params['id'];       
        this.navigated = true;        
      } else {
        this.navigated = false;        
      }
    });
  }

  goBack(savedSystemFile: SystemFile = null) {
   this.close.emit(savedSystemFile);
    if (this.navigated) { window.history.back(); }
  }

  save(systemFile:SystemFile){
     if(this.systemFile.name === ""||this.systemFile.name === null||this.systemFile.type ===""||this.systemFile.type ===null) {
       return
     }
     this.systemFileService.addSystemFile(systemFile,this.id).
        subscribe(
          systemFiles=>{
            this.systemFile= systemFiles[0];                    
          },err => { console.log(err); this.router.navigate(['/files/'+this.id]);}
          ,()=>console.log(' file none'));     
  }

  cancel() {
     let link = ['/files/'+this.id];

     this.router.navigate(link);  
  }
}