import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth.service'
import * as firebase from 'firebase/app';
import {Location} from '@angular/common';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute  } from "@angular/router";
import {Globals} from '../../../globals'
declare var $: any;

function notify(message, icon, type){
  $.notify({
  	icon: icon,
  	message: message

  },{
      type: type,
      timer: 500,
      delay: 2000,
      mouse_over: "pause",
      placement: {
          from: "top",
          align: "center"
      }
  });
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  private user;
  private returnUrl;
  username: string = "";
  password: string = "";
  loading: boolean = false;
  constructor(public globals: Globals,private location: Location, private auth: AuthService, public router:Router,private route: ActivatedRoute) {
  }
  
  ngOnInit() {
    this.auth.getAuthState().subscribe(user =>{
      this.user = user
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || this.auth.defaultPath;
    
    if (this.location.path() =='/logout') {
      this.logout();
    }
  }
  
  isAuthenticated(): boolean{
    return this.auth.isAuthenticated();
  }

  login(){
   // this.auth.loginWithFirebaseSSO(this.username,this.password, this.returnUrl);
    this.auth.login(this.username,this.password, this.returnUrl);
    return false
  }

  
  alreadyLogin(){
    if(this.isAuthenticated()){
      notify("Welcome back :)", "lock_open", "success")
      this.router.navigateByUrl(this.returnUrl);
    }else{
      notify("Unpredictable error, please login again.", "error", "danger")
      this.logout()
    }
    return false
  }
  
  logout(){
    this.auth.logout();
    notify("You are logged out!", "lock", "success")
    this.router.navigate(['login'])
    return false
  }
}
