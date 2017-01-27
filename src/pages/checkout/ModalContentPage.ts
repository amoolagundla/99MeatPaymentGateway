import { Component,OnInit } from '@angular/core';
import { NavController,ViewController  } from 'ionic-angular';
import {Address,UserInfo} from '../../app/app.module';
import { ValuesService } from '../../services/ValuesService';
import { LoadingController } from 'ionic-angular';
import {LoginPage} from '../login/login';
import {Events} from 'ionic-angular';
@Component({
    selector: 'New-Adress',
    templateUrl: 'NewAdress.html'
})
export class ModalContentPage {
	public loading :any= this.loadingCtrl.create({
      content: "Please wait...",      
      dismissOnPageChange: true
    });
public address:any={
				Address1:'',
				Address2:'',
				State:'',
				City:'',
				Country:'India',
				Address3:'',
				UserName:'',
				Id:0,
				IsDefault:false,
				PostalCode:''
				};

  constructor(public navCtrl: NavController,
	public loadingCtrl: LoadingController,
	public valuesService:ValuesService,public viewCtrl: ViewController,public events:Events
  ) {
    
   
  }

  	 save(model: Address, isValid: boolean) {
  
		if(isValid)
		{
			this.loading.present();
			
			this.valuesService.InsertAddress(model)
            .subscribe(
                da => {	
				this.loading.dismiss();
				         this.events.publish('myEvent');
							
								
										this.viewCtrl.dismiss();
					});
			
		}
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}