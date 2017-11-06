import { Janela } from './../../models/janela.model';
import { Component } from '@angular/core';
import { IonicPage,  NavController,  NavParams,  AlertController,  ViewController} from 'ionic-angular';
import { WsJanelas } from '../../providers/wsJanelas';
import { Ambiente } from "../../models/ambiente.model";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

@IonicPage()
@Component({
  selector: 'page-add-janela',
  templateUrl: 'addJanela.html',
})
export class AddJanelaPage {

  janela: Janela = new Janela();
  ambientes: Ambiente[] = [];


  constructor(private viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public webservice: WsJanelas, public alertCtrl: AlertController, private sqlite: SQLite) {
    if (navParams.get('janela')) {
      this.janela = navParams.get('janela') as Janela;
    } else {
      this.janela = Janela.adatp();
    }

  }

  ionViewDidEnter() {
    let element = new Ambiente();
    let element2 = new Ambiente();
    let element3 = new Ambiente();
    let element4 = new Ambiente();

    element._id = "11SSIM";
    element.title = "SSIM";
    this.ambientes.push(element);

    element2._id = "11TOTVS12";
    element2.title = "TOTVS12";
    this.ambientes.push(element2);

    element3._id = "11CRM";
    element3.title = "CRM";
    this.ambientes.push(element3);

    element4._id = "11SERVIÇOS";
    element4.title = "SERVIÇOS";
    this.ambientes.push(element4);

  }

  saveJanela(){

    console.log("save: ", this.janela.idAmbiente);

  }

  // saveJanela(){
    
  //   this.webservice.saveJanela(this.janela).subscribe(
  //     (res) => {
  //       this.showAlert('Item salvo com sucesso!');
  //       this.viewCtrl.dismiss();
  //     },
  //     (err) => {
  //       this.showErrorAlert(err);
  //     }
  //   );    
  // }
  
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
            
            
          }
        }
      ]
    });
    confirm.present();
  }

  // showConfirm() {
  //   var that = this;
  //   let confirm = this.alertCtrl.create({
  //     title: 'Exclusão',
  //     message: 'Tem certeza que deseja excluir?',
  //     buttons: [
  //       {
  //         text: 'Não',
  //         handler: () => {
           
  //         }
  //       },
  //       {
  //         text: 'Sim',
  //         handler: () => {
  //           that.webservice.deleteJanela(that.janela._id).subscribe(
  //             (res) => {
  //               that.showAlert('Excluído com sucesso!');
  //               this.navCtrl.popToRoot();
  //             },
  //             (err) => {
  //               that.showErrorAlert(err);
  //             }
  //           )
  //         }
  //       }
  //     ]
  //   });
  //   confirm.present();
  // }

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
