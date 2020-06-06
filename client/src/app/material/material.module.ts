import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";
import {EcoFabSpeedDialModule} from "@ecodev/fab-speed-dial";


const modules = [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    EcoFabSpeedDialModule
];

@NgModule({
    imports: modules,
    exports: modules,
})
export class MaterialModule {
}
