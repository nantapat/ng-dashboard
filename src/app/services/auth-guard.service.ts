import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.auth.isAuthenticated()){
      return true;
    }else{
      this.auth.getAuthState().subscribe(user => {
        if(this.auth.isAuthenticated()){
          this.auth.returnUrl = state.url;
          this.auth.successNavigate();
          return true;
        }else{
          localStorage.clear();
          this.router.navigate(['/login']);
          return false;
        }
      }, error =>{
        console.log(error);
        return false;
      })
    }
  }
}
