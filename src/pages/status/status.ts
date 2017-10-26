import { Component } from '@angular/core';
import { Janela } from './../../models/janela.model';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Tarefa } from "../../models/tarefa.model";
import { WsTarefas } from "../../providers/wsTarefas";
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public wsTarefas: WsTarefas,private socialSharing: SocialSharing,public alertCtrl: AlertController) {
    
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
    // if (this.janela.idJanela){
    //   this.wsTarefas.getTarefas(this.janela.idJanela).subscribe(
    //     (res) => {
    //       this.tarefas = res;
    //     }
    //   );
    // }
    // if (this.mudanca.idMudanca){
    //   this.wsTarefas.getTarefas(this.mudanca.idMudanca).subscribe(
    //     (res) => {
    //       this.tarefas = res;
    //     }
    //   );
    // }

    this.tarefas = [];
    
    let element = new Tarefa();
    let element2 = new Tarefa();
    let element3 = new Tarefa();

    element._id = "1";
    element.type = "campo";
    element.status = "ok";
    element.alias = "SA1";
    element.field = "A1_XSELCT";
    element.Result = [{mensagem: "Campo físico criado"}];
    this.tarefas.push(element);

    element2._id = "2";
    element2.type = "arquivo";
    element2.status = "ok";
    element2.path = "/workflow/FT600CRF.HTM";
    element2.Result = [{mensagem: "Arquivo encontrado no servidor"}];
    this.tarefas.push(element2);

    element3._id = "3";
    element3.type = "parametro";
    element3.status = "erro";
    element3.SX6 = {x6_var:"TI_PARAM",
                        x6_conteud:"55;RT;9I",
                        x6_contspa:"55;RT;9I",
                        x6_conteng:"55;RT;9I"};
    element3.Result = [{mensagem: "Parametro não existe no ambiente"}];
    this.tarefas.push(element3);

    let element4 = new Tarefa();
    let element5 = new Tarefa();
    let element6 = new Tarefa();

    element4._id = "4";
    element4.type = "campo";
    element4.status = "erro";
    element4.alias = "SB1";
    element4.field = "B1_ATRAVA";
    element4.Result = [{mensagem: "Campo físico não criado"}];
    this.tarefas.push(element4);

    element5._id = "5";
    element5.type = "arquivo";
    element5.status = "erro";
    element5.path = "/system/DocAR/por_trad_capa.dot";
    element5.Result = [{mensagem: "Arquivo não encontrado no servidor"}];
    this.tarefas.push(element5);

    element6._id = "6";
    element6.type = "parametro";
    element6.status = "ok";
    element6.SX6 = {x6_var:"PS_TUTORA",
                        x6_conteud:"andre.miller@totvs.com.br",
                        x6_contspa:"andre.miller@totvs.com.br",
                        x6_conteng:"andre.miller@totvs.com.br"};
    element6.Result = [{mensagem: "Parametro confirmado"}];
    this.tarefas.push(element6);
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
      subTitle: 'Erro: ' + msg,
      buttons: ['OK']
    });
    alert.present();
  }

}
