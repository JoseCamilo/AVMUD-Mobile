import { Component } from '@angular/core';
import { IonicPage,  NavController,  NavParams,  AlertController,  ViewController} from 'ionic-angular';
import { WsJanelas } from '../../providers/wsJanelas';
import { Mudanca } from "../../models/mudanca.model";
import { Janela } from "../../models/janela.model";
import { Empresa } from "../../models/empresa.model";
import { Ambiente } from "../../models/ambiente.model";

@IonicPage()
@Component({
  selector: 'page-add-mudanca',
  templateUrl: 'addMudanca.html',
})
export class AddMudancaPage {

  private mudanca: Mudanca = new Mudanca();
  janela: Janela = new Janela();
  empresas : Empresa[] = [];
  ambientes : Ambiente[] = [];

  constructor(private viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public webservice: WsJanelas, public alertCtrl: AlertController) {
    if (navParams.get('mudanca')) {
      this.mudanca = navParams.get('mudanca') as Mudanca;
    } else {
      this.mudanca = Mudanca.adatp();

      if (navParams.get('janela')) {
        this.janela = navParams.get('janela') as Janela;
        this.mudanca.idPAM = this.janela.idPAM;
      } else {
        this.janela = Janela.adatp();
      }
    }


    this.ambientes = [];
    let element = new Ambiente();
    let element2 = new Ambiente();
    let element3 = new Ambiente();
    let element4 = new Ambiente();

    element._id = "1";
    element.title = "Homologação 198";
    element.endereco = "http://erpwstfs.cp.totvs.com.br/ws_ssimxtfs/";
    element.fase = "Homologação";
    this.ambientes.push(element);

    element2._id = "2";
    element2.title = "Pré Oficial";
    element2.endereco = "http://erpwstfs.cp.totvs.com.br/ws_ssimxtfs/";
    element2.fase = "Pré-Produção";
    this.ambientes.push(element2);

    element3._id = "3";
    element3.title = "Produção Oficial";
    element3.endereco = "http://erpwstfs.cp.totvs.com.br/ws_ssimxtfs/";
    element3.fase = "Produção";
    this.ambientes.push(element3);

    element4._id = "4";
    element4.title = "Homologação 191";
    element4.endereco = "http://erpwstfs.cp.totvs.com.br/ws_ssimxtfs/";
    element4.fase = "Homologação";
    this.ambientes.push(element4);

    this.empresas = [];
    let alament = new Empresa();
    let alament2 = new Empresa();
    let alament3 = new Empresa();
    let alament4 = new Empresa();

    alament._id = '1';
    alament.title = "Matriz";
    alament.codSM0 = "00";
    alament.envServer = "";
    this.empresas.push(alament);

    alament2._id = '2';
    alament2.title = "MI Mexico";
    alament2.codSM0 = "03";
    alament2.envServer = "TOTVS_MI";
    this.empresas.push(alament2);

    alament3._id = '3';
    alament3.title = "MI Argentina";
    alament3.codSM0 = "04";
    alament3.envServer = "TOTVS_MI";
    this.empresas.push(alament3);
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
