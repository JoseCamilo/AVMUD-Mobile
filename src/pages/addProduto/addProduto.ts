import { Component } from '@angular/core';
import { IonicPage,  NavController,  NavParams,  AlertController,  ViewController} from 'ionic-angular';
import { WsProdutos } from '../../providers/wsProdutos';
import { Produto } from "../../models/produto.model";

@IonicPage()
@Component({
  selector: 'page-add-produto',
  templateUrl: 'addProduto.html',
})
export class AddProdutoPage {

  private produto: Produto = new Produto();

  constructor(private viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public webservice: WsProdutos, public alertCtrl: AlertController) {
    if (navParams.get('produto')) {
      this.produto = navParams.get('produto') as Produto;
    } else {
      this.produto = Produto.adatp();
    }
  }


  saveProduto(){
    
    this.webservice.saveProduto(this.produto).subscribe(
      (res) => {
        this.showAlert('Item salvo com sucesso!');
        this.viewCtrl.dismiss();
      },
      (err) => {
        this.showErrorAlert(err);
      }
    );    
  }
  
  deleteProduto() {
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
            that.webservice.deleteProduto(that.produto._id).subscribe(
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
