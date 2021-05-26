import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})

export class TokenService {

	private issuer = {
		login: environment.apiurl+'auth/login',
		register: environment.apiurl+'auth/register'
	}

	constructor() { }

	handleData(token){
		localStorage.setItem('auth_token', token);
	}

	getToken(){
		return localStorage.getItem('auth_token');
	}

	isValidToken(){
		const token = this.getToken();

		if(token){
			const payload = this.payload(token);
			if(payload){
				return Object.values(this.issuer).indexOf(payload.iss) > -1 ? true : false;
			}
		} else {
			return false;
		}
	}

	payload(token) {
		const jwtPayload = token.split('.')[1];
		return jwtPayload!=undefined ? JSON.parse(atob(jwtPayload)) : '';
	}

	isLoggedIn() {
		return this.isValidToken();
	}

	removeToken(){
		localStorage.removeItem('auth_token');
	}

}