import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveTicketsComponent } from './active-tickets/active-tickets.component';
import { ClosedTicketsComponent } from './closed-tickets/closed-tickets.component';

@NgModule({
    declarations: [ActiveTicketsComponent, ClosedTicketsComponent],
    imports: [CommonModule],
    exports: [ActiveTicketsComponent, ClosedTicketsComponent]
})
export class TicketsModule { }
