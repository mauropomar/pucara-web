import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppRoutingModule} from './app.routing';
import {NavbarModule} from './shared/navbar/navbar.module';
import {FooterModule} from './shared/footer/footer.module';
import {SidebarModule} from './sidebar/sidebar.module';
import {MaterialModule} from './material/material.module';

import {AppComponent} from './app.component';

import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {ListusersComponent} from './pages/users/listusers.component';
import {NoimageuserPipe} from './pipes/noimageuser.pipe';
import {FavbuttonComponent} from './components/genericos/favbutton/favbutton.component';
import { FormusersComponent } from './pages/users/formusers.component';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        RouterModule,
        HttpClientModule,
        NavbarModule,
        FooterModule,
        SidebarModule,
        MaterialModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        ListusersComponent,
        NoimageuserPipe,
        FavbuttonComponent,
        FormusersComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
