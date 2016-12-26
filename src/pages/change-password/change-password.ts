import {Component,OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import { ValuesService } from '../../services/ValuesService';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Response } from '@angular/http';

/*
  Generated class for the ChangePassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html'
})
export class ChangePasswordPage {
	public user: any={
      OldPassword: '',
      Newpassword: '',
      confirmPassword: ''
    };
		public loading :any= this.loadingCtrl.create({
      content: "Please wait...",      
      dismissOnPageChange: true
    });
public OldPassword:string;
public Newpassword :string;
public confirmPassword :string;
   constructor(public nav: NavController,private valuesService:ValuesService,public toastCtrl: ToastController,
		public loadingCtrl: LoadingController) {
	
  }

  ionViewDidLoad() {
    console.log('Hello ChangePasswordPage Page');
  }
 save(model: any, isValid: boolean,event:Event) {
    // call API to save customer
     event.preventDefault();
									
		if(isValid)
		{
			let ChangePasswordBindingModel=
			{
				OldPassword:model.OldPassword,
				NewPassword:model.Newpassword,
				ConfirmPassword:model.confirmPassword
			};
			console.log(ChangePasswordBindingModel);
			this.loading.present();
			this.valuesService.PostChangePassword(ChangePasswordBindingModel)
            .subscribe(
                data => {			
                         this.loading.dismiss();
												 
                },
								  err => { 
									console.log(err);
									this.loading.dismiss();	
									let toast = this.toastCtrl.create({
																					message: err,
																					duration: 3000,
																					cssClass:'toast-container'
																				}); 
																				toast.present();
});
										 
		}
  }
}
