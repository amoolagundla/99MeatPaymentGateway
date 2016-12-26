import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from '../../pages/login/login';
/*
  Generated class for the MyOrders page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'MyOrdersPage',
  templateUrl: 'my-orders.html'
})
export class MyOrdersPage {
    public orderViewModel:any[];
  constructor(public nav: NavController, public navCtrl: NavController) {
		let UserInfo = 	localStorage.getItem('UserInfo');
	
		if(UserInfo != null)
   {
	 let user = JSON.parse(UserInfo);
	 this.orderViewModel =user.Orders;
   }
  	else
	 {
     	this.nav.setRoot(LoginPage);
	 }
	
	}

  ionViewDidLoad() {
   
  }

}
