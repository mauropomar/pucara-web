
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FavbuttonComponent} from '../components/genericos/favbutton/favbutton.component';
import {ComborolesComponent} from './genericos/comboroles/comboroles.component';

import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../material/material.module";
import { ConfirmdeleteComponent } from './genericos/confirmdelete/confirmdelete.component';
import { CombolanguagesComponent } from './genericos/combolanguages/combolanguages.component';



@NgModule({
    declarations: [FavbuttonComponent, ComborolesComponent, ConfirmdeleteComponent, CombolanguagesComponent],
    exports: [
        ComborolesComponent,
        CombolanguagesComponent,
        FavbuttonComponent,
        ConfirmdeleteComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule

    ]
})
export class ComponentModule {
}
