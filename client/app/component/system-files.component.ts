import { Component,EventEmitter, Input, OnInit, OnDestroy,Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import {SystemConfigService} from '../services/systemConfig.service';
import {SystemFilesService} from '../services/systemFiles.service';
import { SystemService} from '../services/system.service';
import { System } from '../entity/system';
import { SystemConfig} from '../entity/SystemConfig';
import { SystemFile } from '../entity/SystemFiles';


@Component({
  selector: 'system-config',
  templateUrl: 'app/html/system-files.component.html',
  styleUrls: ['app/css/systemConfig.component.css'],
  providers: [SystemService, SystemFilesService]
})

export class SystemFileComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter();
  system: System =new System('','');
  systemFiles: SystemFile[] = [];
  systemFile: SystemFile = new SystemFile('','','');
  error: any;
  sub: any;
  navigated = false;
  title= "----文件配置列表";

  constructor( private router: Router, private systemFileService:SystemFilesService,private systemConfigService:SystemConfigService, private systemService: SystemService, private route: ActivatedRoute) {  }

   ngOnInit() {
     this.sub = this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.getSystemFile(id);
        this.getSystemById(id)
      } else {
        this.navigated = false;        
      }
    });
  }

 getSystemFile(system_id: number) {
    this.systemFileService.getSystemFileBySysId(system_id)
        .subscribe( systemFiles => {if(systemFiles.length>=1){this.systemFiles = systemFiles}}, 
                    err => { console.log(err)},
                    ()=> console.log('systemConfigs info is null.'));
 }

  getSystemById(id: number) {
        this.systemService.getSystem(id)
        .subscribe( systems => {if(systems.length==1){this.system = systems[0]}},
                    err => { console.log(err)}
                   )

   }

  ngOnDestroy() {
  this.sub.unsubscribe();
}
 

  goBack(savedSystemConfig: SystemConfig = null) {
     this.close.emit(savedSystemConfig);
    if (this.navigated) { window.history.back(); }
  }

  back(){
     let link = ['/dashboard'];
     this.router.navigate(link);  
  }

  save(systemConfig: SystemConfig) {   
    this.systemFileService.addSystemFile(systemConfig,this.system.id)
         .subscribe(systemFiles=>{this.systemFile= systemFiles[0]}
                   , err=>{console.log(err)}
                    ,()=>console.log(' none'));
   
  }
  add(system:System){   
    let link = ['/addSystemFile/'+system.id];
    this.router.navigate(link);
  }

  editCurrent(system:System, systemFile:SystemFile) {
    let link = [];
    if(systemFile.type == "xml"||systemFile.type == "text/xml") {
      link = ['/xml/'+system.id+'/'+systemFile.id];
    }
    if(systemFile.type == "properties"||systemFile.type == "propertites") {
      link = ['/config/'+system.id+"/"+systemFile.id];
    }      
    this.router.navigate(link);  
  }

  deleteCurrent(system:System, systemFile:SystemFile) {
     console.log('fid:'+systemFile.id+", type: "+systemFile.type);
    if(systemFile.type == "xml"||systemFile.type == "text/xml") {     
     //delete file 
     this.systemFileService.deleteSystemFile(systemFile.id).subscribe(
       systemFiles => {if(systemFiles.length==1){this.systemFile = systemFiles[0]}}
                   , err=>{console.log(err)}
                    ,()=>console.log(' none'));
    }
    if(systemFile.type == "properties" || systemFile.type == "propertites") {
      this.systemFileService.deletePropertiesFile(systemFile.id).subscribe(
       systemFiles => {if(systemFiles.length==1){this.systemFile = systemFiles[0]}}
                   , err=>{console.log(err)}
                    ,()=>console.log(' none'));
    }   
    this.systemFiles.length--;
  }

}

