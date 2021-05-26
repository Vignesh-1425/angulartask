import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		children: [
			{ path: '',  loadChildren: () => import('src/app/register/list/register-list.module').then(m => m.RegisterListModule) },
		]
	},
	{
		path: '',
		children: [
			
			{ path: 'register', loadChildren: () => import('src/app/register/list/register-list.module').then(m => m.RegisterListModule) },
			{ path: 'register/action', canActivate: [], loadChildren: () => import('src/app/register/action/register-action.module').then(m => m.RegisterActionModule) },
			{ path: 'register/action/:id',  loadChildren: () => import('src/app/register/action/register-action.module').then(m => m.RegisterActionModule) },
							
		]
	},
	{ path: '**', redirectTo: '/' }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class LayoutRoutingModule { }
