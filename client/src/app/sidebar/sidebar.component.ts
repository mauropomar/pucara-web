import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  // { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
  { path: '/home/languages/1', title: 'Idiomas', icon: 'language', class: '' },
  { path: '/home/windows/1', title: 'Ventanas', icon: 'desktop_windows', class: '' },
  { path: '/home/menus/1', title: 'Menú', icon: 'menu', class: '' },
  { path: '/home/ums/1', title: 'Unidad Medida', icon: 'ac_unit', class: '' },
  { path: '/home/users/1', title: 'Usuarios', icon: 'perm_identity', class: '' },
  { path: '/home/rols', title: 'Roles', icon: 'people_outline', class: '' },
  { path: '/home/brands/1', title: 'Marcas', icon: 'outlined_flag', class: '' },
  { path: '/home/categorycustomers/1', title: 'Categoría Clientes', icon: 'contact_mail', class: '' },
  { path: '/home/customers/1', title: 'Clientes', icon: 'assignment_ind', class: '' },
  { path: '/home/categoryprods/1', title: 'Categoría Productos', icon: 'list_alt', class: '' },
  { path: '/home/products/1', title: 'Productos', icon: 'local_bar', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
