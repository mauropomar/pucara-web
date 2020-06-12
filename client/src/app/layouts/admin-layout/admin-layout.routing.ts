import {Routes} from '@angular/router';

import {HomeComponent} from '../../home/home.component';
import {UserComponent} from '../../user/user.component';
import {TablesComponent} from '../../tables/tables.component';
import {TypographyComponent} from '../../typography/typography.component';
import {IconsComponent} from '../../icons/icons.component';
import {MapsComponent} from '../../maps/maps.component';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {UpgradeComponent} from '../../upgrade/upgrade.component';
import {ListusersComponent} from "../../pages/users/listusers.component";
import {FormusersComponent} from "../../pages/users/formusers.component";
import {ListrolsComponent} from "../../pages/rols/listrols.component";
import {LoginComponent} from "../../pages/login/login.component";
import {FormrolsComponent} from "../../pages/rols/formrols.component";
import {ListcategoryProdComponent} from "../../pages/category-prod/listcategory-prod.component";
import {FormcategoryProdComponent} from "../../pages/category-prod/formcategory-prod.component";
import {FormcategoryCustomerComponent} from "../../pages/category-customer/formcategory-customer.component";
import {ListcategoryCustomerComponent} from "../../pages/category-customer/listcategory-customer.component";
import {ListlanguagesComponent} from "../../pages/languages/listlanguages.component";
import {FormlanguageComponent} from "../../pages/languages/formlanguage.component";
import {ListwindowsComponent} from "../../pages/windows/listwindows.component";
import {FormwindowComponent} from "../../pages/windows/formwindow.component";
import {ListbrandsComponent} from "../../pages/brands/listbrands.component";
import {FormbrandComponent} from "../../pages/brands/formbrand.component";


export const AdminLayoutRoutes: Routes = [
    {path: 'dashboard', component: HomeComponent},
    {path: 'brand/new', component: FormbrandComponent},
    {path: 'brand/:id', component: FormbrandComponent},
    {path: 'brands/:page', component: ListbrandsComponent},
    {path: 'window/new', component: FormwindowComponent},
    {path: 'window/:id', component: FormwindowComponent},
    {path: 'windows/:page', component: ListwindowsComponent},
    {path: 'language/new', component: FormlanguageComponent},
    {path: 'language/:id', component: FormlanguageComponent},
    {path: 'languages/:page', component: ListlanguagesComponent},
    {path: 'categorycustomer/new', component: FormcategoryCustomerComponent},
    {path: 'categorycustomer/:id', component: FormcategoryCustomerComponent},
    {path: 'categorycustomers/:page', component: ListcategoryCustomerComponent},
    {path: 'categoryprod/new', component: FormcategoryProdComponent},
    {path: 'categoryprod/:id', component: FormcategoryProdComponent},
    {path: 'categoryprods/:page', component: ListcategoryProdComponent},
    {path: 'rols', component: ListrolsComponent},
    {path: 'rol/new', component: FormrolsComponent},
    {path: 'rol/:id', component: FormrolsComponent},
    {path: 'users/:page', component: ListusersComponent},
    {path: 'user/new', component: FormusersComponent},
    {path: 'user/:id', component: FormusersComponent},
    {path: 'table', component: TablesComponent},
    {path: 'typography', component: TypographyComponent},
    {path: 'icons', component: IconsComponent},
    {path: 'maps', component: MapsComponent},
    {path: 'notifications', component: NotificationsComponent},
    {path: 'upgrade', component: UpgradeComponent},
];
