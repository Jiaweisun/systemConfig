import { Component,EventEmitter, Input, OnInit, OnDestroy,Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import {SystemConfigService} from '../services/systemConfig.service';
import {SystemFilesService} from '../services/systemFiles.service';
import { SystemService} from '../services/system.service';
import { System } from '../entity/system';
import { SystemFile } from '../entity/SystemFiles';
import { SystemConfig} from '../entity/SystemConfig';
import { PropertiesCondition } from '../entity/PropertiesCondition';

@Component({
  selector: 'system-config',
  templateUrl: 'app/html/system-config.component.html',
  styleUrls: ['app/css/systemConfig.component.css'],
  providers: [SystemService, SystemConfigService,SystemFilesService]
})

export class SystemConfigComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter();  
  systemConfigs: SystemConfig[] = [];
  system: System =new System('','');
  systemFile: SystemFile = new SystemFile('','','');
  systemConfig: SystemConfig = new SystemConfig(1,'','','','','',1);
  propertiesCondition:PropertiesCondition = new PropertiesCondition();
  propertiesDetails:string;
  error: any;
  sub: any;
  system_id: number;
  file_id: number;
  devChecked: any = 'yes';
  qaChecked: any = 'yes';
  prodChecked: any ='yes';
  navigated = false;

  constructor( private router: Router, private systemConfigService:SystemConfigService, private systemFileService: SystemFilesService, private systemService: SystemService, private route: ActivatedRoute) {  }

   ngOnInit() {
     this.sub = this.route.params.subscribe(params => {
      if (params['system_id'] !== undefined && params['file_id'] !== undefined) {
        this.system_id = +params['system_id'];
        this.file_id = +params['file_id'];
        this.navigated = true;
        //this.getSystemConfig(id);
        this.getSystemById(this.system_id);
        this.getFileById(this.file_id);
        this.getscBYsfid(this.system_id,this.file_id);
        
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
 
 //根据系统ID,获取文件配置信息
 getSystemConfig(id: number) {
    this.systemConfigService.getScBySysId(id)
        .subscribe( systemConfigs => {if(systemConfigs.length>=1){this.systemConfigs = systemConfigs}}, 
                    err => { console.log(err)},
                    ()=> console.log('systemConfigs info is null.'));
 }

//根据系统ID和文件ID获取配置信息
getscBYsfid(id:number,file_id:number) { //, format:string,  ,format
  this.systemConfigService.getSCBysf(id,file_id)
          .subscribe( systemConfigs => {if(systemConfigs.length>=1){this.systemConfigs = systemConfigs}}, 
                    err => { console.log(err)},
                    ()=> console.log('systemConfigs info is null.'));
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

//新增一行
  addNewColumn() {   
    this.systemConfigs.push(new SystemConfig(this.system.id,'','','','','',0)); 
  }

//新增一页
  addNewPage() {
    let link = ['/pt/'+this.system_id+'/'+this.file_id];
     this.router.navigate(link); 
  }

//保存所有列表
  saveList() {
    for (var i = 0; i < this.systemConfigs.length; ++i) {
      if(this.systemConfigs[i].id == undefined) {
        this.save(this.systemConfigs[i]);              
      }else{
        this.update(this.systemConfigs[i]);
      }
    }
   let link = ['/files/'+this.system.id];
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

//对已有数据更新
  update(systemConfig: SystemConfig) {
     this.systemConfigService.updateSystemConfig(systemConfig)
         .subscribe(systemConfigs=>{this.systemConfig= systemConfigs[0]}
                     , err=>{console.log(err)}
                     ,()=>console.log(' none'));
  }

//删除当前列
  deleteCurrent(systemConfig: SystemConfig) {
    if(systemConfig.id != undefined) {
       this.systemConfigService.deleteSystemConfig(systemConfig.id)
        .subscribe( systemConfigs => {if(systemConfigs.length==1){this.systemConfig = systemConfigs[0]}}, //Bind to view
                    err => { console.log(err)},
                    ()=> console.log(' systemConfigs info is null.'));
    }    
    this.systemConfigs.length--;
  }
}



