import { Component } from '@angular/core';
import { IonicPage,  NavController,  NavParams,  AlertController,  ViewController} from 'ionic-angular';
import { WsTarefas } from '../../providers/wsTarefas';
import { Tarefa } from "../../models/tarefa.model";
import { Mudanca } from "../../models/mudanca.model";

@IonicPage()
@Component({
  selector: 'page-add-tarefa',
  templateUrl: 'addTarefa.html',
})
export class AddTarefaPage {

  tarefa: Tarefa = new Tarefa();
  mudanca: Mudanca = new Mudanca();

  constructor(private viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public webservice: WsTarefas, public alertCtrl: AlertController) {
    if (navParams.get('tarefa')) {
      this.tarefa = navParams.get('tarefa') as Tarefa;
    } else {
      this.tarefa = Tarefa.adatp();

      if (navParams.get('mudanca')) {
        this.mudanca = navParams.get('mudanca') as Mudanca;

        this.tarefa.idMudanca = this.mudanca._id;
        this.tarefa.empresa = this.mudanca.empresa;
        this.tarefa.ambiente = this.mudanca.ambiente;

      } else {
        this.mudanca = Mudanca.adatp();
      }

    }
  }


  saveTarefa(){
    
    this.webservice.saveTarefa(this.tarefa).subscribe(
      (res) => {
        this.showAlert('Item salvo com sucesso!');
        this.viewCtrl.dismiss();
      },
      (err) => {
        this.showErrorAlert(err);
      }
    );    
  }
  
  deleteTarefa() {
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
            that.webservice.deleteTarefa(that.tarefa._id).subscribe(
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

}
