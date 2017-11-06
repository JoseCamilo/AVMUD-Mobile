import { Janela } from './../../models/janela.model';
import { Component } from '@angular/core';
import { IonicPage,  NavController,  NavParams,  AlertController,  ViewController} from 'ionic-angular';
import { WsJanelas } from '../../providers/wsJanelas';
import { Empresa } from "../../models/empresa.model";

@IonicPage()
@Component({
  selector: 'page-add-empresa',
  templateUrl: 'addEmpresa.html',
})
export class AddEmpresaPage {

  empresa: Empresa = new Empresa();

  constructor(private viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public webservice: WsJanelas, public alertCtrl: AlertController) {
    if (navParams.get('empresa')) {
      this.empresa = navParams.get('empresa') as Empresa;
    } else {
      this.empresa = Empresa.adatp();
    }
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
  
  // deleteJanela() {
  //   this.showConfirm();
  // }


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
