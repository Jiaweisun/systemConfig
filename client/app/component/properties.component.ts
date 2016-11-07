import { Component,EventEmitter, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import {SystemConfigService} from '../services/systemConfig.service';
import { PropertiesCondition } from '../entity/PropertiesCondition';


@Component({
	selector: 'system-config-detail',
  templateUrl: 'app/html/system-config-detail.component.html',
  styleUrls: ['app/css/systemConfig.component.css'],
  providers: [ SystemConfigService]
}) 


export class PropertiesComponent implements OnInit, OnDestroy {
	sub: any;
	propertiesDetails:string;
	propertiesCondition:PropertiesCondition = new PropertiesCondition('','','','text');


	constructor( private router: Router, private systemConfigService:SystemConfigService, private route: ActivatedRoute) {  }

	ngOnInit() {
		//通过参数传过来
		 // this.propertiesCondition = new PropertiesCondition(this.system.name,'dev',this.systemFile.name,'text');
   
	  this.listPropertites(this.propertiesCondition);
	}
	ngOnDestroy() {
	  this.sub.unsubscribe();
	}

	// list properties
	listPropertites(condition: PropertiesCondition){

		// this.systemConfigService.listProperties(condition).subscribe(results => this.propertiesDetails = results);
	}




}