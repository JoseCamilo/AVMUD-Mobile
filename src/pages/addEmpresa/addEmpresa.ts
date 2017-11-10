import { Janela } from './../../models/janela.model';
import { Component } from '@angular/core';
import { IonicPage,  NavController,  NavParams,  AlertController,  ViewController} from 'ionic-angular';
import { WsEmpresas } from '../../providers/wsEmpresas';
import { Empresa } from "../../models/empresa.model";
import { Produto } from "../../models/produto.model";

@IonicPage()
@Component({
  selector: 'page-add-empresa',
  templateUrl: 'addEmpresa.html',
})
export class AddEmpresaPage {

  empresa: Empresa = new Empresa();
  produto: Produto = new Produto();

  constructor(private viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public webservice: WsEmpresas, public alertCtrl: AlertController) {
    if (navParams.get('empresa')) {
      this.empresa = navParams.get('empresa') as Empresa;
    } else {
      this.empresa = Empresa.adatp();

      if (navParams.get('produto')) {
        this.produto = navParams.get('produto') as Produto;
        this.empresa.idProduto = this.produto._id;
      } else {
        this.produto = Produto.adatp();
      }

    }
  }


  saveEmpresa(){
    
    this.webservice.saveEmpresa(this.empresa).subscribe(
      (res) => {
        this.showAlert('Item salvo com sucesso!');
        this.viewCtrl.dismiss();
      },
      (err) => {
        this.showErrorAlert(err);
      }
    );    
  }
  
  deleteEmpresa() {
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
            that.webservice.deleteEmpresa(that.empresa._id).subscribe(
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
      subTitle: 'Erro: ' + msg,
      buttons: ['OK']
    });
    alert.present();
  }

}
