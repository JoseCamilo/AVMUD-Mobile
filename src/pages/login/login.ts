import { Component } from '@angular/core';
import { NavController, Platform, AlertController, LoadingController, App } from 'ionic-angular';
import { WsJanelas } from "../../providers/wsJanelas";
import { HomePage } from "../home/home";
import { File } from '@ionic-native/file';
import { WsUtil } from "../../providers/wsUtil";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  public email: string;
  public senha: string;
  public salvar: boolean = false;
  public falhou: boolean = false;

  constructor(public navCtrl: NavController, public platform: Platform, public webservice: WsJanelas, public alertCtrl: AlertController, 
  public loadingCtrl: LoadingController, public app: App, public file: File, public wsUtil: WsUtil) {
    
  }


  ionViewCanEnter() {
    console.log("entrou no can")
    var that = this;

    document.addEventListener('deviceready', function () {
      // verifica o arquivo de login
      that.file.checkFile(that.file.dataDirectory + "avmud/", "login_file.txt")
        .then(function (success) {
          // success
          console.log("checkLe", success);
          
          // le o arquivo de Login
          that.file.readAsText(that.file.dataDirectory + "avmud", "login_file.txt")
            .then(function (success) {

              let retorno = JSON.parse(success);
              // success
              console.log("readLe", JSON.parse(success));
              
              that.email = retorno.email;
              that.senha = retorno.senha;

             
            
            }, function (error) {
              // error
              console.log("readLe", error);

              
              
            });

        
        }, function (error) {
          // error
          console.log("checkLe", error);

          
          
        });
    });

    let loaderLogin = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loaderLogin.present();
    setTimeout(() => {

      loaderLogin.dismiss();
      return true;
    }, 3000);
  }

  login(){

    let loaderLogin = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loaderLogin.present();

    this.wsUtil.authFluig(this.email,this.senha).subscribe(
      (res) => {
        loaderLogin.dismiss();

        if(res.id){
          this.app.getRootNav().setRoot(HomePage);
          this.app.getRootNav().popToRoot();
          
          if(this.salvar){
            this.escreveLogin();
          }

        }
      },
      (err) => {
        loaderLogin.dismiss();
        
        if(err.status == 400){
          this.falhou = true;
        }else{
          this.showErrorAlert("Problema ao tentar se comunicar com o Identity!");
        }
        
      }
    );

    
    
    //console.log(this.titleize("JOSÉ FERNANDO CAMILO DA SILVA"));
  }

  escreveLogin(){
    
    var that = this;
    // Verifica Diretorio
    this.file.checkDir(this.file.dataDirectory, 'avmud')
      .then(function (success) {
        // success
        console.log("checkDirEsc",success);

        var conteudo = '{"email": "'+that.email+'", "senha":"'+that.senha+'" }';
        console.log("conteudo", conteudo);
         // WRITE
        that.file.writeFile(that.file.dataDirectory + "avmud", "login_file.txt", conteudo, {replace: true})
          .then(function (success) {
            // success
            console.log("writeEsc",success);
            
          }, function (error) {
            // error
            console.log("writeEsc",error);
          });

      }, function (error) {
        // error
        console.log("checkDirEsc",error);

        // Cria diretorio
        that.file.createDir(that.file.dataDirectory,"avmud", true)
          .then(function (success) {
            // success
            console.log("createEsc",success);

            var conteudo = '{"email": "'+that.email+'", "senha":"'+that.senha+'" }';
            console.log("conteudo", conteudo);
            // WRITE
            that.file.writeFile(that.file.dataDirectory + "avmud", "login_file.txt", conteudo, {replace: true})
              .then(function (success) {
                // success
                console.log("writeEsc",success);
                
              }, function (error) {
                // error
                console.log("writeEsc",error);
              });

          }, function (error) {
            // error
            console.log("createEsc",error);
          });

      });

  }
  
  

  leLogin(){
    var that = this;

    document.addEventListener('deviceready', function () {
      
      // // verifica se existe a pasta
      // that.file.checkDir(that.file.dataDirectory, "avmud")
      //   .then(function (success) {
      //     // success
      //     console.log("checkDirLe", success);

          // verifica o arquivo de login
          that.file.checkFile(that.file.dataDirectory + "avmud/", "login_file.txt")
            .then(function (success) {
              // success
              console.log("checkLe", success);
              
              // le o arquivo de Login
              that.file.readAsText(that.file.dataDirectory + "avmud", "login_file.txt")
                .then(function (success) {

                  let retorno = JSON.parse(success);
                  // success
                  console.log("readLe", JSON.parse(success));
                    
                  that.email = retorno.email;
                  that.senha = retorno.senha;
                
                
                }, function (error) {
                  // error
                  console.log("readLe", error);
                  
                });

            
            }, function (error) {
              // error
              console.log("checkLe", error);
              
            }); 

        
        // }, function (error) {
        //   // error
        //   console.log("checkDirLe", error);
          
        // });
      
      
    });
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