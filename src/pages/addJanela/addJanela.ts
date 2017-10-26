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

    element._id = "SSIM";
    element.title = "SSIM";
    element.producao = "111";
    element.preprod = "222";
    element.homolog = "333";
    this.ambientes.push(element);

    element2._id = "TOTVS12";
    element2.title = "TOTVS12";
    element2.producao = "111";
    element2.preprod = "222";
    element2.homolog = "333";
    this.ambientes.push(element2);

    element3._id = "CRM";
    element3.title = "CRM";
    element3.producao = "111";
    element3.preprod = "222";
    element3.homolog = "333";
    this.ambientes.push(element3);

    element4._id = "SERVIÇOS";
    element4.title = "SERVIÇOS";
    element4.producao = "111";
    element4.preprod = "222";
    element4.homolog = "333";
    this.ambientes.push(element4);

  }

  saveJanela(){
    
    this.sqlite.create({
                  name: 'data.db',
                  location: 'default'
            })
            .then((db: SQLiteObject) => {
              
              if(this.janela._id){
                let query = 'UPDATE janela SET title=?,status=?,idAmbiente=?,fase=?,Result=? WHERE _id=?';
                db.executeSql(query, [this.janela.title ,
                                    this.janela.status,
                                    this.convertArrayToString(this.janela.idAmbiente),
                                    this.janela.fase,
                                    this.janela.Result,
                                    this.janela._id])
                      .then(() => console.log('Executed SQL updatejanela addjanela '))
                      .catch(e => console.log(e));
              }else{
                let query = 'INSERT INTO janela (title , status , idAmbiente , fase , Result) VALUES (?,?,?,?,?)';
                db.executeSql(query, [this.janela.title ,
                                    this.janela.status,
                                    this.convertArrayToString(this.janela.idAmbiente),
                                    this.janela.fase,
                                    this.janela.Result])
                      .then(() => console.log('Executed SQL insertjanela addjanela '))
                      .catch(e => console.log(e));
              }
              
              this.viewCtrl.dismiss();

            })
            .catch(e => console.log(e));
  }

  private strSeparator = "__,__";
  public convertArrayToString(array: string[]){
    let str = "";
    for (let i = 0;i<array.length; i++) {
        str = str+String(array[i]);
        // Do not append comma at the end of last element
        if(i<array.length-1){
            str = str+this.strSeparator;
        }
    }
    return str;
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
            
            this.sqlite.create({
                  name: 'data.db',
                  location: 'default'
            })
            .then((db: SQLiteObject) => {

              let query = 'DELETE FROM janela WHERE _id=?';
              db.executeSql(query, [that.janela._id])
                    .then(() => {console.log('Executed SQL deletejanela addjanela ');
                                this.navCtrl.popToRoot();
                                that.showAlert('Excluído com sucesso!');})
                    .catch(e => console.log(e));
            })
            .catch(e => console.log(e));
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
