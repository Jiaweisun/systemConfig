import { Component,EventEmitter, Input, OnInit, OnDestroy,Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import {SystemConfigService} from '../services/systemConfig.service';
import {SystemFilesService} from '../services/systemFiles.service';
import { SystemService} from '../services/system.service';
import { System } from '../entity/system';
import { SystemFile } from '../entity/SystemFiles';
import { SystemConfig} from '../entity/SystemConfig';

@Component({
  selector: 'properties-text',
  templateUrl: 'app/html/properties-text.component.html',
  styleUrls: ['app/css/systemConfig.component.css'],
  providers: [SystemService, SystemConfigService,SystemFilesService]
})

export class PropertiesTextComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter(); 
  systemFiles: SystemFile[] = [];
  system: System =new System('','');
  systemFile: SystemFile = new SystemFile('','',''); 
  systemConfig: SystemConfig = new SystemConfig(1,'','','','','',1);
  systemConfigs: SystemConfig[] = [];
  error: any;
  sub: any;
  navigated = false;

  constructor( private router: Router, 
    private systemConfigService:SystemConfigService, private systemFileService: SystemFilesService,
     private systemService: SystemService,  private route: ActivatedRoute) {  }

   ngOnInit() {
     this.sub = this.route.params.subscribe(params => {
      if (params['system_id'] !== undefined && params['file_id'] !== undefined) {   
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

   updateToSave(res: string) {
      if(res === ""||res === null|| res === undefined) {
        alert('初始化内容不能为空');
       return
     }
        let edge:string [] = res.split('\u000A'); 
        let comment: string = "";

        for(let i=0; i<edge.length; i++){
          let column:string  = edge[i];
          if(column.startsWith('//') || column.startsWith('#')) {
             comment = column.substr(2);
          }else {
            let c:string[] = column.split('=');
            if((c[0]==null || c[0] =='')||(c[1] ==null || c[1] =='')) {
               continue;
            }else {
               this.systemConfig = new SystemConfig(this.system.id,comment,c[0],c[1],c[1],c[1],1);
               this.systemConfigs.push(this.systemConfig);            
            }           
         }          
        }
        this.saveList();
  }



  //保存所有列表
  saveList() {
    for (var i = 0; i < this.systemConfigs.length; ++i) {
      if(this.systemConfigs[i].id == undefined) {
        this.save(this.systemConfigs[i]);              
      }else{
        this.updateConfig(this.systemConfigs[i]);
      }
    }
    let link = ['/files/'+this.system.id];
    //let link = ['/config/'+this.system.id+"/"+this.systemFile.id];
   this.router.navigate(link);  
  }

//对新数据保存
  save(systemConfig: SystemConfig) {
    systemConfig['file_id']=this.systemFile.id;
    this.systemConfigService.addSystemConfig(systemConfig)
         .subscribe(systemConfigs=>{this.systemConfig= systemConfigs[0]}
                   , err=>{console.log(err)}
                    ,()=>console.log(' none'));   
  }

//对已有systemConfig数据更新
  updateConfig(systemConfig: SystemConfig) {
     this.systemConfigService.updateSystemConfig(systemConfig)
         .subscribe(systemConfigs=>{this.systemConfig= systemConfigs[0]}
                     , err=>{console.log(err)}
                     ,()=>console.log(' none'));
  }
}

