import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { DataTablesModule } from "angular-datatables";
import { FlashMessagesModule } from 'angular2-flash-messages';
import { RegisterListRoutingModule } from './register-list-routing.module';
import { RegisterListComponent } from './register-list.component';

@NgModule({
	declarations: [
		RegisterListComponent
	],
	imports: [
		CommonModule,
		DataTablesModule,
		FlashMessagesModule.forRoot(),
		RegisterListRoutingModule
	]
})

export class RegisterListModule { }
