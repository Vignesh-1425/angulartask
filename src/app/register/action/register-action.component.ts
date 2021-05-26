import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FlashMessagesService } from 'angular2-flash-messages';
import { RegisterService } from '../../service/register.service';
import { environment } from '../../../environments/environment';

@Component({
	selector: 'app-register-action',
	templateUrl: './register-action.component.html'
})

export class RegisterActionComponent implements OnInit {
	registerForm: FormGroup;
	submitted = false;
	errors = null;
	fileData: File;
	image:any = '';
	actionid:any;
	
	constructor(
		public router: Router,
		private activatedroute: ActivatedRoute,
		public fb: FormBuilder,
		private _flashMessagesService: FlashMessagesService,
		public registerService: RegisterService
	) {
		this.actionid = this.activatedroute.snapshot.paramMap.get('id')!=null ? this.activatedroute.snapshot.paramMap.get('id') : '';
		
		this.registerForm = this.fb.group({
			name: ['', Validators.required],
			email: [''],
			phone: [''],
			password: [''],
			actionid: ['']
		})
		
		if(this.actionid!=''){
			this.registerService.getDataByID({id : this.actionid}).subscribe(
				result => {
					if(result.success){
						this.registerForm.setValue({
							name: result.success.name,
							email: result.success.email,
							phone: result.success.phone,
							password: result.success.password,
							actionid: result.success.id
						});
						
						this.image = environment.baseurl+'assets/product_image/'+result.success.image;
					}else{
						this._flashMessagesService.show('Register not found.', { cssClass: 'alert-danger', timeout: 3000 });
						setTimeout(() => {  
							this.router.navigate(['register']);
						}, 1000);
					}
				}
			);
		}
	}
	
	ngOnInit() { }
	
	onSubmit() {
		this.submitted = true;
		
		if (this.registerForm.valid) {
			this.registerService.action(this.registerForm.value).subscribe(
				result => {
					if(result.success){
						this.fileupload(result.success.id) 
					}
				},
				error => {
					this._flashMessagesService.show('Try Later.', { cssClass: 'alert-danger', timeout: 3000 });
					this.router.navigate(['register']);
				},
				() => {
					this._flashMessagesService.show('Register submitted successfully.', { cssClass: 'alert-success', timeout: 3000 });
					setTimeout(() => { 
						this.registerForm.reset(); 
						this.router.navigate(['register']);
					}, 1000);
				}
			);
		}
	}
	
	onFileChange(fileInput: any) {
		this.fileData = <File>fileInput.target.files[0];
	}
	
	fileupload(id) {
		const formData = new FormData();
		formData.append('image', this.fileData);
		
		this.registerService.fileupload(formData).subscribe(res => {
			const formData = new FormData();
			formData.append('image', res.success);
			formData.append('actionid', id);
			console.log(formData);
			this.registerService.action(formData).subscribe();
		}) 
	}
	
	get registerFormControl() {
		return this.registerForm.controls;
	}
}
