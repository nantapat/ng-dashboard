import { Component, OnInit } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';
import { AuthService } from '../../services/auth.service'
declare var $:any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  displayName: string ;
  photoURL: string;
  role: string;
  private user;
  constructor(private auth: AuthService) { 
    this.auth.getAuthState().subscribe(user =>{
      this.user = user;
      this.role = this.user.claims.role;
      this.displayName = this.user.displayName || this.user.claims.displayName || this.user.name || this.user.claims.email || ''
      this.photoURL = this.user.photoURL || this.user.claims.photoURL
    });
  }

  ngOnInit() {
    $.getScript('../../assets/js/sidebar-moving-tab.js');
    this.menuItems = ROUTES.filter(menuItem => menuItem);

    
  }
  
}
