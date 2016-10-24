import { Component,EventEmitter, Input, OnInit, OnDestroy,Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import {SystemConfigService} from '../services/systemConfig.service';
import {SystemFilesService} from '../services/systemFiles.service';

import { SystemService} from '../services/system.service';
import { System } from '../entity/system';
import { SystemFile } from '../entity/systemFiles';
import { SystemConfig} from '../entity/systemConfig';

@Component({
  selector: 'system-config-xml',
  templateUrl: 'app/html/system-config-xml.component.html',
  styleUrls: ['app/css/systemConfig.component.css'],
  providers: [SystemService, SystemConfigService,SystemFilesService]
})

export class SystemXmlConfigComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter(); 
  systemFiles: SystemFile[] = [];
  system: System =new System('','');
  systemFile: SystemFile = new SystemFile('','',''); 
  error: any;
  sub: any;
  navigated = false;

  constructor( private router: Router, 
    private systemConfigService:SystemConfigService, private systemFileService: SystemFilesService,
     private systemService: SystemService,  private route: ActivatedRoute) {  }

   ngOnInit() {
     this.sub = this.route.params.subscribe(params => {
      if (params['system_id'] !== undefined && params['file_id'] !== undefined) {
        console.log('system_id::'+params['system_id']);
        let id = +params['system_id'];
        let file_id = +params['file_id'];
        this.navigated = true;        
        this.getSystemById(id);
        this.getFileById(file_id);
      } else {
        this.navigated = false;        
      }
    });
  }

//获取系统
  getSystemById(id: number) {
        this.systemService.getSystem(id)
        .subscribe( systems => {if(systems.length==1){this.system = systems[0]}},
                    err => { console.log(err)}
                   )
   }
//获取文件信息
   getFileById(file_id: number) {
        this.systemFileService.getSystemFile(file_id)
        .subscribe( files => {if(files.length==1){this.systemFile = files[0]}},
                    err => { console.log(err)}
                   )
   }

  ngOnDestroy() {
  this.sub.unsubscribe();
}
 
//返回上一页
  goBack(systemFile: SystemFile = null) {
     this.close.emit(systemFile);
    if (this.navigated) { window.history.back(); }
  }

//返回首页
  backToIndex(){
     let link = ['/dashboard'];
     this.router.navigate(link);  
  }


//对已有数据更新
  update(systemFile: SystemFile) {
     this.systemFileService.updateSystemFile(systemFile)
         .subscribe(systemFiles=>{this.systemFile= systemFiles[0]}
                     , err=>{console.log(err)}
                     ,()=>console.log(' update done'));
         this.goBack(systemFile);
  }
}

