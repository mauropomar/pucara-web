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

export const AdminLayoutRoutes: Routes = [
    {path: 'dashboard', component: HomeComponent},
    {path: 'user', component: UserComponent},
    {path: 'users/:page', component: ListusersComponent, data: {title: 'Usuarios'}},
    {path: 'user/new', component: FormusersComponent, data: {title: 'Nuevo Usuario'}},
    {path: 'user/:id', component: FormusersComponent, data: {title: 'Editar Usuario'}},
    {path: 'table', component: TablesComponent},
    {path: 'typography', component: TypographyComponent},
    {path: 'icons', component: IconsComponent},
    {path: 'maps', component: MapsComponent},
    {path: 'notifications', component: NotificationsComponent},
    {path: 'upgrade', component: UpgradeComponent},
];
