import { Component,EventEmitter, Input, OnInit, OnDestroy,Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Rx';

import { SystemService} from '../services/system.service';
import { System } from '../entity/system';

// import { DashboardComponent } from './dashboard.component'

@Component({
  selector: 'adding-system',
  templateUrl: 'app/html/system-adding.component.html',
  styleUrls: ['app/css/systemConfig.component.css'],
  providers: [SystemService]
})

export class SystemAddingComponent implements OnInit {//, OnDestroy
  @Input() system: System;
  @Output() close = new EventEmitter();
  error: any;
  // sub: any;
  navigated = false;

  constructor( 
    private router: Router,  
    private systemService: SystemService, 
    private route: ActivatedRoute
    ) {  }

  ngOnInit() {
      this.system = new System('', '');
  }

  goBack(savedSystem: System = null) {
   this.close.emit(savedSystem);
    if (this.navigated) { window.history.back(); }
  }

  save(){
     // let systemOperation:Observable<System[]>;
     if(this.system.title === ""||this.system.title === null||this.system.name ===""||this.system.name ===null) {
       return
     }
     this.systemService.addSystem(this.system).
        subscribe(
        systems => { 
          this.system = systems[0];

        }, 
        err => { console.log(err) ;
        this.router.navigate(['/dashboard']);});
  }

  cancel() {
     let link = ['/dashboard'];
     this.router.navigate(link);  
  }
}

