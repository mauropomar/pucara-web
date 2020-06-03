import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {EcoFabSpeedDialModule} from '@ecodev/fab-speed-dial';

@NgModule({
    imports: [ RouterModule, CommonModule, EcoFabSpeedDialModule ],
    declarations: [  ],
    exports: [ EcoFabSpeedDialModule ]
})

export class ComponentsModule {}