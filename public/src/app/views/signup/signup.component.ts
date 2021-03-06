import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//services
import { players_service } from '../../services/players/players.service';
import { validator_service } from '../../services/validator/validator.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss'],
	providers: [ players_service, validator_service ]
})
export class SignupComponent implements OnInit {
	user_information: any = {
		name: '',
		email: '',
		rocket_name: '',
		avatar: 'default.jpg'
	};
	info_name: String = '';
	info_email: String = '';
	info_rocket_name: String = '';
	button_text: String = 'Create new Account';

	constructor( private router: Router, private players_service: players_service, private validator_service: validator_service ){}
	ngOnInit(){}

	input_verification(){
		this.button_text = 'Loading';

		let open_door = true;
		this.info_name = this.info_email = this.info_rocket_name = '';

		if( this.validator_service.email_test( this.user_information.email ) == false ){
			open_door = false;
			this.info_email = 'Your email is incorrect';
		}
		if( this.user_information.email == ''){
			open_door = false;
			this.info_email = 'Your email is required';
		}
		if( this.user_information.name == ''){
			open_door = false;
			this.info_name = 'Your Given name is required';
		}
		if( this.user_information.rocket_name == ''){
			open_door = false;
			this.info_rocket_name = 'Your Rocketchat name is required';
		}

		if( open_door == true ){
			this.signup();
		}else{
			this.button_text = 'Create new Account';
		}
	}

	signup(){
		this.players_service.signup_with_credentials( this.user_information )
			.subscribe( user_details => {
					if( user_details ){
						this.button_text = 'Success';
						alert("Thanks you to signup, Please validate your account via rocketchat.")
						let timer = setTimeout(() => {  
							this.router.navigate(['landing']);
							clearTimeout(timer);
						}, 1000);
					}
				}, err => {
					this.info_rocket_name = err.error.message;
					this.button_text = 'Create new Account';
				});
	}
}
