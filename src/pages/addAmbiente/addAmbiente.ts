import { Janela } from './../../models/janela.model';
import { Component } from '@angular/core';
import { IonicPage,  NavController,  NavParams,  AlertController,  ViewController} from 'ionic-angular';
import { WsAmbientes } from '../../providers/wsAmbientes';
import { Ambiente } from "../../models/ambiente.model";
import { Produto } from "../../models/produto.model";
import { WsUtil } from "../../providers/wsUtil";

@IonicPage()
@Component({
  selector: 'page-add-ambiente',
  templateUrl: 'addAmbiente.html',
})
export class AddAmbientePage {

  ambiente: Ambiente = new Ambiente();
  produto: Produto = new Produto();

  constructor(private viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, 
    public webservice: WsAmbientes, public alertCtrl: AlertController, public wsUtil: WsUtil) {
    if (navParams.get('ambiente')) {
      this.ambiente = navParams.get('ambiente') as Ambiente;
    } else {
      this.ambiente = Ambiente.adatp();

      if (navParams.get('produto')) {
        this.produto = navParams.get('produto') as Produto;
        this.ambiente.idProduto = this.produto._id;
      } else {
        this.produto = Produto.adatp();
      }
    }
  }


  saveAmbiente(){

    if(!this.ambiente.endereco){
      this.showErrorAlert("Preencha o Endereço API Rest!");
    }else{
      //valida endereco informado
      this.wsUtil.vldUrl(this.ambiente.endereco).subscribe(
        (res) => {
          let retorno = res.json();

          // verifica se o endereço é valido
          if(retorno.result){
            // salva ambiente
            this.webservice.saveAmbiente(this.ambiente).subscribe(
              (res) => {
                this.showAlert('Item salvo com sucesso!');
                this.viewCtrl.dismiss();
              },
              (err) => {
                this.showErrorAlert(err);
              }
            );
          }else{
            this.showErrorAlert("O Endereço API Rest não é válido!");
          }  

        },
        (err) => {
          this.showErrorAlert(err);
        }
      );
    }  
  }
  
  deleteAmbiente() {
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
            that.webservice.deleteAmbiente(that.ambiente._id).subscribe(
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
      title: 'Ops!',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

}
