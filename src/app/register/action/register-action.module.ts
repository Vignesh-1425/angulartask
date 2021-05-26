import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { RegisterActionRoutingModule } from './register-action-routing.module';
import { RegisterActionComponent } from './register-action.component';

@NgModule({
	declarations: [
		RegisterActionComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FlashMessagesModule.forRoot(),
		RegisterActionRoutingModule
	]
})

export class RegisterActionModule { }
