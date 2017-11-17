import { Component } from '@angular/core';
import { NavController, Platform, AlertController, LoadingController, App } from 'ionic-angular';
import { WsJanelas } from "../../providers/wsJanelas";
import { HomePage } from "../home/home";
import { File } from '@ionic-native/file';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
 
  constructor(public navCtrl: NavController, public platform: Platform, public webservice: WsJanelas, public alertCtrl: AlertController, 
  public loadingCtrl: LoadingController, public app: App, private file: File) {
    
  }


  ionViewDidEnter() {

  }

  login(){
    this.app.getRootNav().setRoot(HomePage);
    this.app.getRootNav().popToRoot();

    //document.addEventListener('deviceready', function () {
      // verifica o arquivo de login
      this.file.checkFile(this.file.dataDirectory + "avmud", "login_file.json")
        .then(function (success) {
          // success
          console.log("arqLogin", success);
        }, function (error) {
          // error
          console.log("arqLogin", error);
        });
    //});

    console.log(this.titleize("JOSÉ FERNANDO CAMILO DA SILVA"));
  }

  titleize(text) {
      var loweredText = text.toLowerCase();
      var words = loweredText.split(" ");
      for (var a = 0; a < words.length; a++) {
          var w = words[a];

          var firstLetter = w[0];

          if( w.length > 2){ 
            w = firstLetter.toUpperCase() + w.slice(1);
          } else {
            w = firstLetter + w.slice(1);
          }

          words[a] = w;
      }
      return words.join(" ");
  }

  showAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Sucesso',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  showErrorAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Erro',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

}