import { Component, OnInit } from '@angular/core';
import {LocationStrategy, PlatformLocation, Location} from '@angular/common';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  location: Location;
  
  constructor(location: Location, public router: Router) {
    this.location = location;
  }

  ngOnInit() {
    $.getScript('/assets/js/material-dashboard.js');
    $.getScript('/assets/js/initMenu.js');
    
    if (this.location.path() =='/home') {
      this.router.navigate(['/home/dashboard']);
    }
  }

  isMaps(path){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice( 1 );

    if(path == titlee){
      return false;
    }
    else {
      return true;
    }
  }

}
