import { Component } from '@angular/core';
import { Janela } from './../../models/janela.model';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Tarefa } from "../../models/tarefa.model";
import { WsTarefas } from "../../providers/wsTarefas";
import { WsMudancas } from "../../providers/wsMudancas";
import { SocialSharing } from '@ionic-native/social-sharing';
import { Mudanca } from "../../models/mudanca.model";

/**
 * Generated class for the EditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {

  private janela: Janela = new Janela();
  private mudanca: Mudanca = new Mudanca();
  private tarefa: Tarefa = new Tarefa();
  private tarefas: Tarefa[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public wsTarefas: WsTarefas, 
  public wsMudancas: WsMudancas, private socialSharing: SocialSharing,public alertCtrl: AlertController, 
  public loadingCtrl: LoadingController) {
    
    if (navParams.get('janela')) {
      this.janela = navParams.get('janela') as Janela;
    } else {
      this.janela = Janela.adatp();
    }

    if (navParams.get('mudanca')) {
      this.mudanca = navParams.get('mudanca') as Mudanca;
    } else {
      this.mudanca = Mudanca.adatp();
    }

    if (navParams.get('tarefa')) {
      this.tarefa = navParams.get('tarefa') as Tarefa;
    } else {
      this.tarefa = Tarefa.adatp();
    }
  }

  ionViewDidLoad() {
  }

  ionViewDidEnter() {
     if (!this.navParams.get('tarefa')) {
        this.readTarefas();
     }
  }


  readTarefas() {
    if (this.janela._id){

      let loaderSts = this.loadingCtrl.create({
        content: "Lendo Tarefas..."
      });
      loaderSts.present();


      this.wsMudancas.getMudancas(this.janela._id).subscribe(
        (resM) => {

          let last = resM.length;
          let atual = 0;

          console.log("total", last);
          resM.forEach(Melement => {

            atual++;
            console.log("incremento", atual);
            
            this.wsTarefas.getTarefas(Melement._id).subscribe(
              (resT) => {
                
                console.log("verifica", last);
                console.log("verifica", atual);

                resT.forEach(Telement => {
                  this.tarefas.push(Telement);
                });

                if(last == atual){
                  loaderSts.dismiss();
                  console.log("fim");
                }

              }
            );

          });

        }
      );

    }else if(this.mudanca._id){

      let loaderSts = this.loadingCtrl.create({
        content: "Lendo Tarefas..."
      });
      loaderSts.present();

      this.wsTarefas.getTarefas(this.mudanca._id).subscribe(
        (resT) => {

          resT.forEach(Telement => {
            this.tarefas.push(Telement);
          });

          loaderSts.dismiss();

        }
      );
      
    }
  }

  shareJanela(){
    var that = this;
    var body: string = "";

    if (this.janela._id){
      body += "Janela Técnica ";
      body += this.janela.title + "\n\n";
      this.tarefas.forEach((elemento) => { // foreach statement
        
        if(elemento.status === "ok"){
          body += "✅"+ " ";
        }else{
          body += "❌" + " ";
        }

        body += elemento.type + " ";

        if(elemento.type === "arquivo"){
          body += elemento.path + " - ";
        } else if(elemento.type === "campo"){
          body += elemento.field + " - ";
        } else if(elemento.type === "changeset"){
          body += elemento.changeset + " - ";
        } else if(elemento.type === "parametro"){
          body += elemento.SX6.x6_var + " - ";
        }

        elemento.Result.forEach((el) => {
          body += el.mensagem + "\n";
        })

        body += "\n";
      });  
    }else if (this.mudanca._id){
      body += "Mudança ";
      body += this.mudanca.title + "\n\n";
      this.tarefas.forEach((elemento) => { // foreach statement

         if(elemento.status === "ok"){
          body += "✅"+ " ";
        }else{
          body += "❌" + " ";
        }

        body += elemento.type + " ";

        if(elemento.type === "arquivo"){
          body += elemento.path + " - ";
        } else if(elemento.type === "campo"){
          body += elemento.field + " - ";
        } else if(elemento.type === "changeset"){
          body += elemento.changeset + " - ";
        } else if(elemento.type === "parametro"){
          body += elemento.SX6.x6_var + " - ";
        }
        
        elemento.Result.forEach((el) => {
          body += el.mensagem + "\n";
        })

        body += "\n";
      });  
    }else{
      
       if(this.tarefa.status === "ok"){
          body += "✅"+ " ";
        }else{
          body += "❌" + " ";
        }

      body += this.tarefa.type + " ";

      if(this.tarefa.type === "arquivo"){
        body += this.tarefa.path + " - ";
      } else if(this.tarefa.type === "campo"){
        body += this.tarefa.field + " - ";
      } else if(this.tarefa.type === "changeset"){
        body += this.tarefa.changeset + " - ";
      } else if(this.tarefa.type === "parametro"){
        body += this.tarefa.SX6.x6_var + " - ";
      }

      this.tarefa.Result.forEach((el) => {
        body += el.mensagem + "\n";
      })     
    }

    console.log("body:",body);
    // Share       
    this.socialSharing.share(body).then(() => {
      // Success!
    }).catch(() => {
      // Error!
      that.showErrorAlert("Não foi possível compartilhar resultado da janela!");
    });

  }

   showAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
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
