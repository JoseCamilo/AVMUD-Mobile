import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, LoadingController, ModalController } from 'ionic-angular';
import { WsTarefas } from '../../providers/wsTarefas';
import { Tarefa } from "../../models/tarefa.model";
import { Mudanca } from "../../models/mudanca.model";
import { WsUtil } from "../../providers/wsUtil";
import { ExplorerPage } from "../explorer/explorer";

@IonicPage()
@Component({
  selector: 'page-add-tarefa',
  templateUrl: 'addTarefa.html',
})
export class AddTarefaPage {

  tarefa: Tarefa = new Tarefa();
  mudanca: Mudanca = new Mudanca();
  arquivos: {title: string}[] = [];

  constructor(private viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, 
    public webservice: WsTarefas, public alertCtrl: AlertController, public wsUtil: WsUtil, 
    public loadingCtrl: LoadingController, public modalCtrl: ModalController) {
    if (navParams.get('tarefa')) {
      this.tarefa = navParams.get('tarefa') as Tarefa;

      if(this.tarefa.type == "arquivo"){
        this.loadArquivos();
      }
    } else {
      this.tarefa = Tarefa.adatp();

      if (navParams.get('mudanca')) {
        this.mudanca = navParams.get('mudanca') as Mudanca;

        this.tarefa.idMudanca = this.mudanca._id;
        this.tarefa.empresa = this.mudanca.empresa;
        this.tarefa.ambiente = this.mudanca.ambiente;

      } else {
        this.mudanca = Mudanca.adatp();
      }

    }
  }

  saveTarefa(){
    
    this.webservice.saveTarefa(this.tarefa).subscribe(
      (res) => {
        this.showAlert('Item salvo com sucesso!');
        this.viewCtrl.dismiss();
      },
      (err) => {
        this.showErrorAlert(err);
      }
    );    
  }
  
  deleteTarefa() {
    this.showConfirm();
  }


  showConfirm() {
    var that = this;
    let confirm = this.alertCtrl.create({
      title: 'Exclusão',
      message: 'Tem certeza que deseja excluir?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
           
          }
        },
        {
          text: 'Sim',
          handler: () => {
            that.webservice.deleteTarefa(that.tarefa._id).subscribe(
              (res) => {
                that.showAlert('Excluído com sucesso!');
                this.navCtrl.pop();
              },
              (err) => {
                that.showErrorAlert(err);
              }
            )
          }
        }
      ]
    });
    confirm.present();
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

  // Tela Explorer para type Arquivos
  loadPastas() {
   let explorerModal = this.modalCtrl.create(ExplorerPage, { mudanca: this.mudanca });
   explorerModal.onDidDismiss(data => {
     this.tarefa.path = data.endereco;

     this.loadArquivos();

   });
   explorerModal.present();
 }

 loadArquivos(){

    if(this.tarefa.path){
      let loaderArq = this.loadingCtrl.create({
        content: "Listando arquivos..."
      });
      loaderArq.present();

      this.wsUtil.buscaArquivo(this.tarefa.path).subscribe(
        (res) => {
          let retorno = res.json();
          retorno.forEach(element => {
            this.arquivos.push({"title" : element.arquivo});
          });
          loaderArq.dismiss();
        },
        (err) => {
          loaderArq.dismiss();
          this.showErrorAlert(err);
        }
      );
    }
 }

}
