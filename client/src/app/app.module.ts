
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppRoutingModule} from './app.routing';
import {NavbarModule} from './shared/navbar/navbar.module';
import {FooterModule} from './shared/footer/footer.module';
import {SidebarModule} from './sidebar/sidebar.module';
import {MaterialModule} from './material/material.module';
import {ComponentModule} from "./components/component.module";
import {NgxLoadingModule} from 'ngx-loading';

import {AppComponent} from './app.component';

import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {ListusersComponent} from './pages/users/listusers.component';
import {NoimageuserPipe} from './pipes/noimageuser.pipe';

import { FormusersComponent } from './pages/users/formusers.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { LoginComponent } from './pages/login/login.component';
import { ListrolsComponent } from './pages/rols/listrols.component';
import { FormrolsComponent } from './pages/rols/formrols.component';
import { ListcategoryProdComponent } from './pages/category-prod/listcategory-prod.component';
import { FormcategoryProdComponent } from './pages/category-prod/formcategory-prod.component';
import { ListcategoryCustomerComponent } from './pages/category-customer/listcategory-customer.component';
import { FormcategoryCustomerComponent } from './pages/category-customer/formcategory-customer.component';
import { ListlanguagesComponent } from './pages/languages/listlanguages.component';
import { FormlanguageComponent } from './pages/languages/formlanguage.component';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        NavbarModule,
        FooterModule,
        SidebarModule,
        MaterialModule,
        ComponentModule,
        NgxLoadingModule.forRoot({}),
        AppRoutingModule,
        MatTooltipModule
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        ListusersComponent,
        NoimageuserPipe,
        FormusersComponent,
        LoginComponent,
        ListrolsComponent,
        FormrolsComponent,
        ListcategoryProdComponent,
        FormcategoryProdComponent,
        ListcategoryCustomerComponent,
        FormcategoryCustomerComponent,
        ListlanguagesComponent,
        FormlanguageComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
