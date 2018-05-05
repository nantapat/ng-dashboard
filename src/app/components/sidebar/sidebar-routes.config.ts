import {  RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard',  icon: 'dashboard', roles:['admin'],class: '', submenu:[]},
    { path: '/user-profile', title: 'User Profile',  icon:'person', roles:[], class: '', submenu:[]},
    { path: 'table-list', title: 'Table List',  icon:'content_paste', roles:[], class: '', submenu:[]},
    { path: 'component', title: 'Components',  icon:'apps', class: '', roles:[], submenu:[
        { path: 'material-example', title: 'material-example',  icon:'notifications', roles:[], class: '', submenu:[]},
        { path: 'notifications', title: 'Notifications',  icon:'notifications', roles:[], class: '', submenu:[]},
        { path: 'icons', title: 'Icons',  icon:'bubble_chart', roles:[], class: '', submenu:[]},
        { path: 'typography', title: 'Typography',  icon:'library_books', roles:[], class: '', submenu:[]},
    ]},
    { path: 'maps', title: 'Maps',  icon:'location_on', roles:[], class: '', submenu:[]},
    { path: '/../logout', title: 'Logout',  icon:'lock', roles:[], class: '', submenu:[]}
];
