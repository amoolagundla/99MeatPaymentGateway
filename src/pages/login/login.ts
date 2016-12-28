import { Platform} from 'ionic-angular';
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {AuthenticationService} from "../../services/login-service";
import {ValuesService} from "../../services/ValuesService";
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {RegisterPage} from "../register/register";
import 'rxjs/add/operator/catch';
import  'rxjs/add/operator/mergeMap'; 
import * as Rx from 'rxjs/rx';
import { Facebook, NativeStorage } from 'ionic-native';
/*import {Facebook, Google, LinkedIn} from "ng2-cordova-oauth/core";
import {OauthCordova} from 'ng2-cordova-oauth/platform/cordova';*/
declare const facebookConnectPlugin: any;
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

/*private oauth: OauthCordova = new OauthCordova();
    private facebookProvider: Facebook = new Facebook({
      clientId: "172669669872080",
      appScope: ["email"]
    })*/
    
public username:string;
public token:string;
public loading :any= this.loadingCtrl.create({
      content: "Please wait...",      
      dismissOnPageChange: true
    });
public password:string;
  constructor(public nav: NavController, 
              private authenticationService: AuthenticationService,
              public loadingCtrl: LoadingController,
              public valuesService: ValuesService,
              public alertCtrl: AlertController,public platform:Platform,)
              {           
              this.platform = platform;
                localStorage.removeItem("UserInfo");
                localStorage.removeItem('currentUser');       
  }

   // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }
  // login and go to home page
  login() { 
  
    this.loading.present();
     this.authenticationService.login(this.username, this.password)
            .subscribe(
                data => {
                    this.getUserInfo();                   
  
                }, 
                error => {
                  this.loading.dismiss();
                  this.nav.setRoot(LoginPage);
                });
    
  }
  
  
  getUserInfo()
  {
    this.valuesService.getAll()
            .subscribe(
                data => {   
                        this.getCatogories();       
                localStorage.setItem('UserInfo',JSON.stringify(data)); 
                }, 
                error => {
                  this.loading.dismiss();
                  
                });
                
  }
  
  getCatogories()
  {
    this.valuesService.getAllCategories()
            .subscribe(
                data => {     this.loading.dismiss();             
    
     localStorage.setItem('categories',JSON.stringify(data)); this.nav.setRoot(HomePage);
                }, 
                error => {
                    this.loading.dismiss();
                });   
  }
  /*ll() {
     this.platform.ready().then(() => {
            this.oauth.logInVia(this.facebookProvider).then(success => {
                console.log("RESULT: " + JSON.stringify(success));
            }, error => {
                console.log("ERROR: ", error);
            });
        });
}
     loginFB() {
       this.ll();
    }*/
     
     FB_APP_ID: number = 1828020577450397;

  loginFB(){
    let permissions = new Array();
    let nav = this.nav;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];

    Facebook.login(permissions)
    .then(function(response){
      let userId = response.authResponse.userID;
      let params = new Array();

      //Getting name and gender properties
      Facebook.api("/me?fields=name,gender", params)
      .then(function(user) {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        //now we have the users info, let's save it in the NativeStorage
        alert(JSON.stringify(user));
      })
    }, function(error){
      console.log(error);
    });
  }


    getdetails() {
        facebookConnectPlugin.getLoginStatus((response) => {
            if(response.status == "connected") {
                facebookConnectPlugin.api('/' + response.authResponse.userID + '?fields=id,name,gender',[], 
                function onSuccess(result) {
                    alert(JSON.stringify(result));
                },
                function onError(error) {
                    alert(error);
                }
                );
            }
            else {
                alert('Not logged in');
            }
        })
    }
    
    logout() {
        facebookConnectPlugin.logout((response) => {
            alert(JSON.stringify(response));
        })
    }
}

