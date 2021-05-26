import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { RegisterService } from '../../service/register.service';
import { environment } from '../../../environments/environment';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
	selector: 'app-register-list',
	templateUrl: './register-list.component.html'
})

export class RegisterListComponent implements AfterViewInit, OnDestroy, OnInit {
	@ViewChild(DataTableDirective, {static: false})
	dtElement: DataTableDirective;
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();
  
	register: any[];
  
	constructor(
		private http: HttpClient, 
		public router: Router,
		public registerService: RegisterService,
		private _flashMessagesService: FlashMessagesService
	) {}
	
	ngOnInit(): void { 
		this.datatable()
	}
	
	ngAfterViewInit(): void {
		this.dtTrigger.next();
	}

	ngOnDestroy(): void {
		this.dtTrigger.unsubscribe();
	}

	rerender(): void {
		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.destroy();
			this.dtTrigger.next();
		});
	}
	
	delete(id) {
		this.registerService.delete({id : id}).subscribe(
			result => {
				if(result.success){
					this._flashMessagesService.show('Product is deleted successfully.', { cssClass: 'alert-success', timeout: 3000 });
					this.rerender();
					this.datatable();
				}else{
					this._flashMessagesService.show('Try Later.', { cssClass: 'alert-danger', timeout: 3000 });
				}
			}
		);
	}
	datatable(){
		this.dtOptions = {
			pagingType: 'full_numbers',
			pageLength: 10
		};
		
		this.registerService.getDataByID({}).subscribe(
			result => {
				this.register = result.data;
			}
		);
	}
}
