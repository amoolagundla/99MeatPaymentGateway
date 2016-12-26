import {Component} from '@angular/core';
import {NavController, AlertController,NavParams} from 'ionic-angular';
import {HomePage } from '../Home/Home';
import {CategoryService} from '../../services/category-service';
import {ItemPage} from "../item/item";
import {ValuesService} from "../../services/ValuesService";
import { CartService} from '../../services/cart-service';
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {
  // category object
  public category: any;
public catId:any;

  constructor(public nav: NavController, public categoryService: CategoryService,public navParams: NavParams,
	public valuesService: ValuesService
	, public alertController: AlertController,
	public cartService:CartService) {
    // get first category as sample data
			this.category =JSON.parse(this.navParams.get('Id'));			
  }

  // view item detail
  viewItem(item:any) {
    this.nav.push(ItemPage, {item: JSON.stringify(item)});
  }
	// add item to cart
  addCart(item:any) {
    let prompt = this.alertController.create({
      title: 'Quanity',
      message: "1=1kg, 1.5 =1500 grams",
      inputs: [
        {
          name: 'quantity',
          value: '1'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
           console.log(data);
            // go to cart
					let orderDetail = {
						Id:'',
						Amount: item.Price,
						Quantity:data.quantity,
						UnitPrice: item.Price,
						Product:item,
						total:0
						
					};		
						 this.cartService.addCartItem(orderDetail);

          }
        }
      ]
    });

    prompt.present();
  }

}
