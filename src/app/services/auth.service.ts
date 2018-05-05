import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Router } from "@angular/router";
import { environment } from 'environments/environment';
import {Globals} from '../../globals'
declare var $: any;
function notify(message,icon,type){
  $.notify({
    icon: icon,
    message: message
  },{
      type: type,
      timer: 2000,
      placement: {
          from: "top",
          align: "center"
      }
  });
}
@Injectable()
export class AuthService {
  private authState: Observable<firebase.User>
  private currentUser: firebase.User = null;
  public defaultPath = '/dashboard';
  public returnUrl;

  constructor(private afAuth: AngularFireAuth,private afs:AngularFirestore, private router:Router,private http: HttpClient,private globals: Globals) { 
    this.authState = this.afAuth.authState;
    this.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.currentUser.getIdToken()
          .then(token => JSON.parse(atob(token.split(".")[1])))
          .then(claims=>{
            this.currentUser['claims'] = claims;
          })
      } else {
        this.currentUser = null;
      }
    });
    
  }
  successNavigate(){
    if (this.returnUrl == '/login' || this.returnUrl == '' || this.returnUrl == '/' || !this.returnUrl){
      this.router.navigate([ this.defaultPath ])
    }else{
      this.router.navigateByUrl(this.returnUrl);
    }
  }
  login(email: string, password: string, returnUrl: string) {
    this.returnUrl= returnUrl;
    this.globals.loginLoad=true;
    this.globals.loginTextStatus="Sign in with username.";
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(value =>{
        this.globals.loginLoad=false;
        this.globals.loginTextStatus="";
        this.successNavigate();
      })
      .catch(err => {
          notify(err.message,"error",'danger');
      });

  }

  loginWithFirebaseSSO(email: string, password: string, returnUrl: string){
    this.returnUrl= returnUrl;
    this.globals.loginLoad=true;
    this.globals.loginTextStatus="Generate access token.";
    this.http.post(environment.ssoDomain, {
        email: email,
        password: password
      })
      .subscribe(
        res => {
          this.globals.loginTextStatus="Sign in with token.";
          this.afAuth.auth
            .signInWithCustomToken(res['token'])
            .then(value => {
              var splitted = res['token'].split(".");
              notify("Logged in","lock_open",'success');
              this.globals.loginLoad=false;
              this.globals.loginTextStatus="";
              this.successNavigate();
            })
            .catch(err => {
              this.globals.loginLoad=false;
              this.globals.loginTextStatus="";
              notify(err.message,"error",'danger');
            });
        },    
        err => {
          this.globals.loginLoad=false;
          this.globals.loginTextStatus="";
          notify(err.message,"error",'danger');
        }
    );
  }

  getAuthState() {
    return this.authState;
  }
  
  logout() {
    localStorage.clear();
    this.afAuth.auth
      .signOut();
  }
  
  isAuthenticated(): boolean{
    return this.currentUser !== null && this.currentUser.uid !== undefined;
  }
}
