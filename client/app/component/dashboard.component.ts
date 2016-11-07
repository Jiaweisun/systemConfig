import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTER_DIRECTIVES } from '@angular/router';
// import {ConfirmOptions, Position} from 'angular2-bootstrap-confirm';
import {Positioning} from 'angular2-bootstrap-confirm/position';


import { System } from '../entity/system';
import { SystemService } from '../services/system.service';


@Component({
  selector: 'dashboard',
  templateUrl: '/app/html/dashboard.component.html',
  styleUrls: ['app/css/systemConfig.component.css'],
  providers: [SystemService],//, ConfirmOptions, {provide: Position, useClass: Positioning}],
  directives: [ROUTER_DIRECTIVES]
})

export class DashboardComponent implements OnInit {
  systems: System[] = [];
  system:System;
  fileUrl: String = '/files';

  // title: string = 'hi title';
  // message: string ='hi message description';
  // confirmClicked: boolean = false;
  // cancelClicked: boolean = false;
  // isOPen: boolean= false;


  constructor( private router: Router, private systemService: SystemService) {
}

 loadSystems(){
    this.systemService.listSystem()
        .subscribe(
         systems => this.systems = systems, //Bind to view
         err => { console.log(err)},
         ()=> console.log('done'));
    }  
  ngOnInit() {
     this.loadSystems();
  }
  addSys (sys: System) {
    this.systems.push(sys)
  }
  addSystem (){
     let link = ['/addSystem'];
     this.router.navigate(link);  
  }
  deleteCurrent(id:number) {
   alert("确定删除吗？");
    this.systemService.deleteSystem(id)
        .subscribe(
         systems => {if(systems.length == 1){this.system = systems[0]}}, //Bind to view
         err => { console.log(err)},
         ()=> console.log('done'));
        this.systems.length--;    
  }

}
