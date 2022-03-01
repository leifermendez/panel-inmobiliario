import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettlementRoutingModule } from './settlement-routing.module';
import { ListComponent } from './pages/list/list.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [ListComponent],
    imports: [
        CommonModule,
        SettlementRoutingModule,
        SharedModule
    ]
})
export class SettlementModule { }
