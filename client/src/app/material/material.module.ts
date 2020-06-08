import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from '@angular/material/tooltip';
import {EcoFabSpeedDialModule} from "@ecodev/fab-speed-dial";


const modules = [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCheckboxModule,
    EcoFabSpeedDialModule
];

@NgModule({
    imports: modules,
    exports: modules,
})
export class MaterialModule {
}
