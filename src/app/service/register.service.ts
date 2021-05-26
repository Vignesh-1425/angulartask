import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {
	constructor(private httpClient: HttpClient) { }

	action(data): Observable<any> {
		return this.httpClient.post(environment.apiurl+'register/action', data);
	}
	
	getDataByID(data): Observable<any> {
		return this.httpClient.post(environment.apiurl+'register/getData', data);
	}
	
	fileupload(data): Observable<any> {
		return this.httpClient.post(environment.apiurl+'register/fileupload', data);
	}
	
	delete(data): Observable<any> {
		return this.httpClient.post(environment.apiurl+'register/delete', data);
	}
}