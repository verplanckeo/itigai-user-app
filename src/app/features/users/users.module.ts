import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';

import { LayoutComponent } from './layout/layout.component';
import { ListComponent } from './list/list.component';

@NgModule({
    imports: [
        CommonModule,
        UsersRoutingModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent
    ]
})
export class UsersModule { }