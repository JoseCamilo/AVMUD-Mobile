import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, LoadingController } from 'ionic-angular';
import { WsMudancas } from '../../providers/wsMudancas';
import { Mudanca } from "../../models/mudanca.model";
import { Janela } from "../../models/janela.model";
import { Empresa } from "../../models/empresa.model";
import { Ambiente } from "../../models/ambiente.model";
import { WsEmpresas } from "../../providers/wsEmpresas";
import { WsAmbientes } from "../../providers/wsAmbientes";
import { MudancaPage } from "../mudanca/mudanca";
import { WsJanelas } from "../../providers/wsJanelas";
import { TaskJira } from "../../models/taskJira.model";
import { WsJira } from "../../providers/wsJira";

@IonicPage()
@Component({
  selector: 'page-add-mudanca',
  templateUrl: 'addMudanca.html',
})
export class AddMudancaPage {

  private mudanca: Mudanca = new Mudanca();
  janela: Janela = new Janela();
  janelas: Janela[] = [];
  private empresas : Empresa[] = [];
  private ambientes : Ambiente[] = [];
  tasksJira: TaskJira[] = [];

  constructor(private viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, 
  public webservice: WsMudancas, public alertCtrl: AlertController, public wsAmbientes: WsAmbientes, 
  public wsEmpresas: WsEmpresas, public loadingCtrl: LoadingController, public wsJanelas: WsJanelas, public wsJira: WsJira) {
    
    if (navParams.get('janela')) {
      this.janela = navParams.get('janela') as Janela;
    } else {
      this.janela = Janela.adatp();
    }

    if (navParams.get('mudanca')) {
      this.mudanca = navParams.get('mudanca') as Mudanca;
    } else {
      this.mudanca = Mudanca.adatp();
      this.mudanca.idJanela = this.janela._id;
      this.mudanca.idPAM = this.janela.idPam;
    }

  }

  ionViewDidEnter() {
    this.readEmpresas();
    this.readAmbientes();
    this.readTasksJira();
  }

  readEmpresas() {
    this.empresas = [];

    let loader = this.loadingCtrl.create({
      content: "Buscando Empresas..."
    });
    loader.present();

    this.janela.idProduto.forEach(produto => {

      this.wsEmpresas.getEmpresas(produto).subscribe(
        (res) => {
          res.forEach(empresa => {
            this.empresas.push(empresa);
          });

          loader.dismiss();
        }
      );
    });

    
  }

  readAmbientes() {
    this.ambientes = [];

    let loader = this.loadingCtrl.create({
      content: "Buscando Ambientes..."
    });
    loader.present();

    this.janela.idProduto.forEach(produto => {

      this.wsAmbientes.getAmbientes(produto).subscribe(
        (res) => {
          res.forEach(ambiente => {
            if (this.janela.fase === ambiente.fase) {
              this.ambientes.push(ambiente);
            }
          });
        }
      );
    });

    loader.dismiss();
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


  saveMudanca(){
    
    this.webservice.saveMudanca(this.mudanca).subscribe(
      (res) => {
        this.showAlert('Item salvo com sucesso!');
        this.viewCtrl.dismiss();
      },
      (err) => {
        this.showErrorAlert(err);
      }
    );    
  }
  
  deleteMudanca() {
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
            that.webservice.deleteMudanca(that.mudanca._id).subscribe(
              (res) => {
                that.showAlert('Excluído com sucesso!');
                this.navCtrl.popTo( this.navCtrl.getByIndex(1));
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

  alteraJanela(){
    this.confirmAlteraJanela(); 
  }

  confirmAlteraJanela() {
    var that = this;
    let confirm = this.alertCtrl.create({
      title: 'Alterar Janela',
      message: 'Tem certeza que deseja alterar a Janela desta Mudança?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
           
          }
        },
        {
          text: 'Sim',
          handler: () => {
              let loaderJanela = this.loadingCtrl.create({
                content: "Buscando Janelas..."
              });
              loaderJanela.present();

              this.wsJanelas.getJanelas().subscribe(
                (res) => {
                  this.janelas = res;
                  loaderJanela.dismiss();
                  
                  //monta alert com janelas
                  this.doRadioJanelas();
                },
                (err) => {
                  loaderJanela.dismiss();
                  this.showErrorAlert("Não foi possível buscar Janelas!");
                }
              );
          }
        }
      ]
    });
    confirm.present();
  }

  doRadioJanelas() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Janelas');

    this.janelas.forEach(element => {
      alert.addInput({
        type: 'radio',
        label: element.title,
        value: element._id,
        checked: false
      });
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: (data: string) => {
        this.mudanca.idJanela = data;

        let loaderJanela = this.loadingCtrl.create({
          content: "Buscando Janelas..."
        });
        loaderJanela.present();

        this.wsJanelas.getJanela(data).subscribe(
          (res) => {
            this.janela = res;
            loaderJanela.dismiss();
          },
          (err) => {
            loaderJanela.dismiss();
            this.showErrorAlert("Não foi possível buscar Janela!");
          }
        );
      }
    });

    alert.present();
  }
}


