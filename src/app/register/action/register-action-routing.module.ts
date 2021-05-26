import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterActionComponent } from './register-action.component';

const routes: Routes = [
	{ path: '', component: RegisterActionComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class RegisterActionRoutingModule { }
