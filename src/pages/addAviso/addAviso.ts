import { Component } from '@angular/core';
import { IonicPage,  NavController,  NavParams,  AlertController,  ViewController} from 'ionic-angular';
import { WsAvisos } from '../../providers/wsAvisos';
import { Aviso } from "../../models/aviso.model";


@IonicPage()
@Component({
  selector: 'page-add-aviso',
  templateUrl: 'addAviso.html',
})
export class AddAvisoPage {

  private aviso: Aviso = new Aviso();

  constructor(private viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public webservice: WsAvisos, public alertCtrl: AlertController) {
    if (navParams.get('aviso')) {
      this.aviso = navParams.get('aviso') as Aviso;
    } else {
      this.aviso = Aviso.adatp();
    }
  }


  saveAviso(){

    this.aviso.comentario += " - " + this.getData();
    
    this.webservice.saveAviso(this.aviso).subscribe(
      (res) => {
        this.showAlert('Item salvo com sucesso!');
        this.viewCtrl.dismiss();
      },
      (err) => {
        this.showErrorAlert(err);
      }
    );    
  }
  
  deleteAviso() {
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
            that.webservice.deleteAviso(that.aviso._id).subscribe(
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

  getData(){
    let currentdate = new Date();

    let datetime =  currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " "  
                    + currentdate.getHours() + ":"  
                    + ("00" + currentdate.getMinutes()).slice(-2) ;

    return datetime;
  }

}
