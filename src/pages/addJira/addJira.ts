import { Component } from '@angular/core';
import { IonicPage,  NavController,  NavParams,  AlertController,  ViewController, LoadingController} from 'ionic-angular';
import { WsJira } from "../../providers/wsJira";
import { ScrumMaster } from "../../models/scrumMaster.model";
import { Mudanca } from "../../models/mudanca.model";

@IonicPage()
@Component({
  selector: 'page-add-jira',
  templateUrl: 'addJira.html',
})
export class AddJiraPage {

  private mudanca: Mudanca = new Mudanca();
  usersJira: ScrumMaster[] = [];
  issueType: string;
  scrumMaster: string;

  constructor(private viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, 
              public loadingCtrl: LoadingController, public wsJira: WsJira) {

    if (navParams.get('mudanca')) {
      this.mudanca = navParams.get('mudanca') as Mudanca;
    } else {
      this.mudanca = Mudanca.adatp();
    }
    
  }

  ionViewDidEnter() {
    this.readScrumMasters();

  }  

  readScrumMasters(){

    let loaderJira = this.loadingCtrl.create({
      content: "Buscando Scrum Master..."
    });
    loaderJira.present();

    this.wsJira.getScrumMaster().subscribe(
      (res) => {
        this.usersJira = res;
        loaderJira.dismiss();
      }
    );
  }

  createSubTask(){
    
    if(!this.mudanca.idPAM){
      this.showErrorAlert("A Mudança não possui PAM Principal!");
    }else if(!this.issueType){
      this.showErrorAlert("O campo Tipo da Tarefa é obrigatório!");
    }else if(!this.scrumMaster){
      this.showErrorAlert("O campo Scrum Master é obrigatório!");
    }else{
      this.showConfirm();
    }
  }

  showConfirm() {
    var that = this;
    let confirm = this.alertCtrl.create({
      title: 'Jira',
      message: 'Enviar para o Jira a Mudança '+ this.mudanca.title +'?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
           
          }
        },
        {
          text: 'Sim',
          handler: () => {

            let loaderJira = this.loadingCtrl.create({
              content: "Enviando a Mudanca para o Jira..."
            });
            loaderJira.present();


            that.wsJira.createTask(that.mudanca, that.scrumMaster, that.issueType).subscribe(
              (res) => {
                loaderJira.dismiss();
                this.viewCtrl.dismiss();
                that.showAlert('Foi gerada a SubTask: ' + res.idSubTaskPAM);                
              },
              (err) => {
                loaderJira.dismiss();
                that.showErrorAlert(err);
              }
            )
          }
        }
      ]
    });
    confirm.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
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