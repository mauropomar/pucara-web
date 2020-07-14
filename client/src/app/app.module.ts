
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { MaterialModule } from './material/material.module';
import { ComponentModule } from "./components/component.module";
import { NgxLoadingModule } from 'ngx-loading';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ListusersComponent } from './pages/users/listusers.component';
import { NoimageuserPipe } from './pipes/noimageuser.pipe';

import { FormusersComponent } from './pages/users/formusers.component';
import { MatTooltipModule } from "@angular/material/tooltip";
import { LoginComponent } from './pages/login/login.component';
import { ListrolsComponent } from './pages/rols/listrols.component';
import { FormrolsComponent } from './pages/rols/formrols.component';
import { ListcategoryProdComponent } from './pages/category-prod/listcategory-prod.component';
import { FormcategoryProdComponent } from './pages/category-prod/formcategory-prod.component';
import { ListcategoryCustomerComponent } from './pages/category-customer/listcategory-customer.component';
import { FormcategoryCustomerComponent } from './pages/category-customer/formcategory-customer.component';
import { ListlanguagesComponent } from './pages/languages/listlanguages.component';
import { FormlanguageComponent } from './pages/languages/formlanguage.component';
import { ListwindowsComponent } from './pages/windows/listwindows.component';
import { FormwindowComponent } from './pages/windows/formwindow.component';
import { ListbrandsComponent } from './pages/brands/listbrands.component';
import { FormbrandComponent } from './pages/brands/formbrand.component';
import { ListumComponent } from './pages/ums/listum.component';
import { FormumComponent } from './pages/ums/formum.component';
import { ListmenuComponent } from './pages/menu/listmenu.component';
import { FormmenuComponent } from './pages/menu/formmenu.component';
import { ListcustomerComponent } from './pages/customer/listcustomer.component';
import { FormcustomerComponent } from './pages/customer/formcustomer.component';
import { ListproductsComponent } from './pages/products/listproducts.component';
import { FormproductComponent } from './pages/products/formproduct.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';

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
        MatTooltipModule,
        BsDatepickerModule.forRoot(),
        InfiniteScrollModule,
        NgxSpinnerModule
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
        FormlanguageComponent,
        ListwindowsComponent,
        FormwindowComponent,
        ListbrandsComponent,
        FormbrandComponent,
        ListumComponent,
        FormumComponent,
        ListmenuComponent,
        FormmenuComponent,
        ListcustomerComponent,
        FormcustomerComponent,
        ListproductsComponent,
        FormproductComponent,
        CatalogueComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
