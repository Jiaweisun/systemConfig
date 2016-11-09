import { Component,EventEmitter, OnInit, OnDestroy,Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import {SystemConfigService} from '../services/systemConfig.service';
import { PropertiesCondition } from '../entity/PropertiesCondition';
import {SystemFilesService} from '../services/systemFiles.service';
import { SystemService} from '../services/system.service';
import { SystemConfig} from '../entity/SystemConfig';
import { SystemFile } from '../entity/SystemFiles';
import { System } from '../entity/system';
// import { Result } from '../entity/Result';


@Component({
  selector: 'system-config-detail',
  templateUrl: 'app/html/system-config-detail.component.html',
  styleUrls: ['app/css/systemConfig.component.css'],
  providers: [ SystemConfigService]
}) 


export class PropertiesComponent implements OnInit, OnDestroy {	
	@Output() close = new EventEmitter(); 
	system: System =new System('','');
  	systemFile: SystemFile = new SystemFile('','',''); 
	systemConfigs: SystemConfig[] = [];
	propertiesCondition:PropertiesCondition = new PropertiesCondition('','','','text');
	sub: any;
	error: any;
	profile: any;
	sysName:string = '';
	fileName:any = '';
  	navigated = false;

	constructor( private router: Router, private systemConfigService:SystemConfigService,
				 private systemFileService: SystemFilesService,
			     private systemService: SystemService, private route: ActivatedRoute) {  }

   ngOnInit() {

     this.sub = this.route.params.subscribe(params => {
      if (params['system_id'] !== undefined && params['file_id'] !== undefined && params['p'] !== undefined) {
        let id = +params['system_id'];
        let file_id = +params['file_id'];
        this.profile = +params['p'];
        this.navigated = true;        
        this.listPropertites(id,file_id);      
      } else {
        this.navigated = false;        
      }
    });   
  }

	ngOnDestroy() {
	  this.sub.unsubscribe();
	}

	// list properties
	listPropertites(sys_id:number , file_id:number){
		 this.systemService.getSystem(sys_id)
	        .subscribe( systems => { 	        	
	        	if(systems.length==1){
	        		this.system = systems[0];
	        		this.systemFileService.getSystemFile(file_id)
				        .subscribe( files => {
				        	if(files.length==1){
				        		this.systemFile = files[0];
								 if(this.profile == '0') {
								 	this.propertiesCondition = new PropertiesCondition(this.system.name,'dev',this.systemFile.name,'text');
								 }
								 if(this.profile == '1') {
								 	this.propertiesCondition = new PropertiesCondition(this.system.name,'qa',this.systemFile.name,'text');
								 }
								 if(this.profile == '2') {
								 	this.propertiesCondition = new PropertiesCondition(this.system.name,'prod',this.systemFile.name,'text');
								 }
						    	this.systemConfigService.listProperties(this.propertiesCondition)
						        	.subscribe( results => {if(results!=null){this.systemConfigs = results}},
						           	err => { alert(err)},
						            ()=> console.log(' results are null.'));
				        	}
				        }, err => { console.log(err)})
	        	} 
	        },err => { console.log(err)})
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
}