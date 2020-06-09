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


export const AdminLayoutRoutes: Routes = [
    {path: 'dashboard', component: HomeComponent},
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
