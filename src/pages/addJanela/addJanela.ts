import { Janela } from './../../models/janela.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, LoadingController } from 'ionic-angular';
import { WsJanelas } from '../../providers/wsJanelas';
import { Ambiente } from "../../models/ambiente.model";
import { WsProdutos } from "../../providers/wsProdutos";
import { Produto } from "../../models/produto.model";
import { WsJira } from "../../providers/wsJira";
import { TaskJira } from "../../models/taskJira.model";

@IonicPage()
@Component({
  selector: 'page-add-janela',
  templateUrl: 'addJanela.html',
})
export class AddJanelaPage {

  janela: Janela = new Janela();
  produtos: Produto[] = [];
  tasksJira: TaskJira[] = [];


  constructor(private viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public webservice: WsJanelas, public alertCtrl: AlertController, public wsProdutos: WsProdutos, public wsJira: WsJira, public loadingCtrl: LoadingController) {
    if (navParams.get('janela')) {
      this.janela = navParams.get('janela') as Janela;
    } else {
      this.janela = Janela.adatp();
    }

  }

  ionViewDidEnter() {
    this.readProdutos();
    this.readTasksJira();
  }

  readProdutos() {

    let loaderProduto = this.loadingCtrl.create({
      content: "Buscando Produtos..."
    });
    loaderProduto.present();

    this.wsProdutos.getProdutos().subscribe(
      (res) => {
        this.produtos = res;
        loaderProduto.dismiss();
      }
    );

  }

  readTasksJira(){

    let loaderJira = this.loadingCtrl.create({
      content: "Buscando Tarefas do Jira..."
    });
    loaderJira.present();

    this.wsJira.getTasks().subscribe(
      (res) => {
        this.tasksJira = res;
        loaderJira.dismiss();
      }
    );
  }

  saveJanela(){
    
    this.webservice.saveJanela(this.janela).subscribe(
      (res) => {
        this.showAlert('Item salvo com sucesso!');
        this.viewCtrl.dismiss();
      },
      (err) => {
        this.showErrorAlert(err);
      }
    );    
  }
  
  deleteJanela() {
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
            that.webservice.deleteJanela(that.janela._id).subscribe(
              (res) => {
                that.showAlert('Excluído com sucesso!');
                this.navCtrl.popToRoot();
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

}
