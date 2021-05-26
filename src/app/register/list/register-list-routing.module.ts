import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterListComponent } from './register-list.component';

const routes: Routes = [
	{ path: '', component: RegisterListComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class RegisterListRoutingModule { }
