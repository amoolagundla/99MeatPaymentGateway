import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import {MenuService} from '../../services/menu-service';
import {CartPage} from '../../pages/cart/cart';
import { ValuesService } from '../../services/ValuesService';
import {CategoryPage} from "../category/category";
import{CartService} from '../../services/cart-service';
import {LoginPage} from '../../pages/login/login';
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // slides for slider 

  // list of categories
	public loading :any= this.loadingCtrl.create({
      content: "Please wait...",      
      dismissOnPageChange: true
    });
  public categories: any;
public cartCount:any;
public abc:any;
  constructor(	public loadingCtrl: LoadingController,public nav: NavController, public menuService: MenuService,private valuesService:ValuesService
	, private cartService: CartService) {
    // set data for categories
		let cat =  localStorage.getItem('categories');
		let UserInfo = 	localStorage.getItem('UserInfo');
		let currentUser = 	localStorage.getItem('currentUser');
		
		if(cat != null)
   {
	 this.categories = JSON.parse(cat);
   }
  	else
	 {
     	this.nav.setRoot(LoginPage);
	 }
	
	
		
  if(UserInfo!=null)
	
	{
			this.valuesService.UserInfo=JSON.parse(UserInfo);					
	}
	else
	{
		
	this.nav.setRoot(LoginPage);
	}
	
						 // subscribe to cart changes
      this.cartService
        .statusChanged
        .subscribe(data => {
					this.cartCount =data.totalCount;
				//	this.pages[1].count= int.parse(data.totalCount);
					console.log(this.cartCount +" total count");
              
        });
}
	
	 doRefresh(refresher) {
		 
          this.valuesService.getAllCategories()
            .subscribe(
                data => {				 refresher.complete();			
		              	
                    this.categories = data;										
		               localStorage.setItem('categories',JSON.stringify(data)); 
                }, 
                error => {refresher.complete();			
                  	this.loading.dismiss();
                });		
  }
	
GoToCart()
{

	this.nav.push(CartPage);
}
  // view a category
  ViewCategory(categoryId) {
		
    this.nav.push(CategoryPage, {Id: JSON.stringify(categoryId)});
 }
}
