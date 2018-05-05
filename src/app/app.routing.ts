import { NgModule } from '@angular/core';
import { CommonModule, PathLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
// import { NotFoundComponent } from './pages/not-found/not-found.component';

import { 
  AuthGuardService as AuthGuard 
} from './services/auth-guard.service';

const routes: Routes =[
      // { path: '',          redirectTo: 'home', pathMatch: 'full' },
      { 
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
      },
      { path: 'login',     component: LoginComponent },
      { path: 'logout',     component: LoginComponent },
      { path: 'signup',    component: SignupComponent },
      // { path: '**', component: HomeComponent,},
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    // { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }

