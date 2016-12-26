import {
    Component
} from '@angular/core';
import {
    NavController,
    AlertController,
    NavParams
} from 'ionic-angular';
import {
    HomePage
} from "../home/home";
import {
    AddressPage
} from "../address/address";
import {
    UserInfo
} from '../../app/app.module';
import {
    CartService
} from '../../services/cart-service';
import {
    ValuesService
} from '../../services/ValuesService';
import {
    LoadingController
} from 'ionic-angular';
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-checkout',
    templateUrl: 'checkout.html'
})
export class CheckoutPage {
    public DeliveyTime: any;
    public DeliveyDate: string = new Date().toISOString();
    public userInfo: UserInfo;
    public addressId: any;
    public paymentMethod: any = 0;
    public total: any;
    public cart: any[] = [];
    public checkouts: any = {
        DeliveryTime: '',
        DeliveryDate: ''

    };
    public loading: any = this.loadingCtrl.create({
        content: "Please wait...",
        dismissOnPageChange: true
    });

    constructor(public nav: NavController,
        public alertController: AlertController,
        public navParams: NavParams,
        public cartService: CartService,
        private valuesService: ValuesService,
        public loadingCtrl: LoadingController) {
        // set data for categories
        this.cart = cartService.getCart();
        let currentUser = localStorage.getItem('UserInfo');
        this.total = this.navParams.get('total');
        if(currentUser != null) {
            this.userInfo = SerializationHelper.toInstance(new UserInfo(), currentUser);
        }
    }

    // edit address
    editAddress() {
        let prompt = this.alertController.create({
            title: 'Address',
            message: "",
            inputs: [{
                name: 'address',
                value: ''
            }, ],
            buttons: [{
                text: 'Cancel',
                handler: data => {
                    console.log('Cancel clicked');
                }
            }, {
                text: 'Save',
                handler: data => {
                    console.log('Saved clicked');
                }
            }]
        });

        prompt.present();
    }
    GetPayMent(id) {
        this.paymentMethod = id;
    }
    GetAddressId(Id) {
        this.addressId = Id;
    }
    GoToAddress() {

            this.nav.push(AddressPage);
        }
        // place order button click
    buy() {
        // show alert
        if(this.addressId > 0 && this.paymentMethod > 0) {
            this.loading.present();
            let OrderDetail = {
                DeliveryTime: this.DeliveyTime,
                DeliveryDate: this.DeliveyDate,
                cart: this.cartService.getCart(),
                AddressId: this.addressId,
                PaymentMethod: this.paymentMethod
            };
            this.PlaceOrder(OrderDetail);

        } else {

        }

    }

    public showAlert() {
        let alert = this.alertController.create({
            title: 'Info',
            subTitle: 'Your order has been sent.',
            buttons: [{
                text: 'OK',
                handler: data => {
           
                    this.cartService.ClearCart();
                    this.nav.setRoot(HomePage);
                }
            }]
        });

        alert.present();
    }

    public PlaceOrder(OrdDetail: any) {
        this.valuesService.PostOrder(OrdDetail).subscribe(
            data => {
                this.getUserInfo();
            },
            error => {
                this.loading.dismiss();
            });
    }
		
		public getUserInfo()
		{
			this.valuesService.getAll().subscribe(
			data=>{
            				localStorage.removeItem("UserInfo");
				          localStorage.setItem('UserInfo',JSON.stringify(data)); 
				         this.loading.dismiss();
                this.showAlert();
			},error =>
			{ this.loading.dismiss();
			});
		}
}
class SerializationHelper {
    static toInstance < T > (obj: T, json: string): T {
        var jsonObj = JSON.parse(json);

        if(typeof obj["fromJSON"] === "function") {
            obj["fromJSON"](jsonObj);
        } else {
            for(var propName in jsonObj) {
                obj[propName] = jsonObj[propName]
            }
        }

        return obj;
    }
}