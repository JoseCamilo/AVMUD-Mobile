import { Component } from '@angular/core';
import { WsUtil } from '../../providers/wsUtil';
import { LoadingController, ModalController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Ambiente } from "../../models/ambiente.model";
import { WsAmbientes } from "../../providers/wsAmbientes";
import { Mudanca } from "../../models/mudanca.model";


@Component({
  selector: 'page-explorer',
  templateUrl: 'explorer.html'
})
export class ExplorerPage {

  private ambienteSelect: string; //ambiente selecionado pelo usuario
  private rootpath: string; // root do ambiente slecionado
  private pastas: string[] = []; // pastas atuais listada na view
  private folders: string[] = []; // pastas selecionadas pelo usuario
  private explorerTitle: string = "Explorar pastas"; // titulo da view
  
  private ambientes: Ambiente[] = []; // ambientes que podem ser selecionados pelo usuario
  private allAmbientes: Ambiente[] = []; // todos os ambientes, sem filtro
  private mudanca: Mudanca = new Mudanca(); // mudanca carregada da pagina anterior

  private endereco: string; // endereço completo para return
  private close: any;

  constructor(private viewCtrl: ViewController, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public wsAmbiente: WsAmbientes,
  public navParams: NavParams, public wsUtil: WsUtil, public alertCtrl: AlertController) {
    
    if (navParams.get('mudanca')) {
      this.mudanca = navParams.get('mudanca') as Mudanca;
    } else {
      this.mudanca = Mudanca.adatp();
    }
  }

  ionViewDidEnter() {
    this.readAmbientes();
  }

  readAmbientes() {
    let loaderAmb = this.loadingCtrl.create({
      content: "Listando ambientes de homologação..."
    });
    loaderAmb.present();

    this.wsAmbiente.getAllAmbientes().subscribe(
      (res) => {
        this.allAmbientes = res;

        this.mudanca.ambiente.forEach(elementMud => {

          this.allAmbientes.forEach(elementAll => {
            
            if(elementAll._id == elementMud){
              
              this.wsAmbiente.getAmbientes(elementAll.idProduto).subscribe(
                (res) => {
                  res.forEach(elementRes => {
                    if(elementRes.fase == "Homologação" ){
                      this.ambientes.push(elementRes);

                    }
                  });
                }
              );

            }

          });
          
        });

        loaderAmb.dismiss();
      }
    );
  }

  onChange(event){

    let loaderPastas = this.loadingCtrl.create({
      content: "Listando pastas..."
    });
    loaderPastas.present();

    let indexOf = this.ambientes.findIndex(i => i._id === this.ambienteSelect);

    this.wsUtil.buscaRoot(this.ambientes[indexOf].endereco).subscribe(
      (res) => {
        this.rootpath = res;

        this.wsUtil.buscaPastas(this.rootpath).subscribe(
          (res) => {
            this.pastas = res;
            loaderPastas.dismiss();
          }
        );
      }
    );

  }

  itemTapped(pasta) {
    let loaderPastas = this.loadingCtrl.create({
      content: "Listando pastas..."
    });
    loaderPastas.present();

    this.folders.push(pasta);

    this.endereco = this.rootpath;
    this.folders.forEach(element => {
      this.endereco += "/" + element  
    });

    this.explorerTitle = "..." + this.endereco.substr(this.endereco.length - 20);

    this.wsUtil.buscaPastas(this.endereco).subscribe(
      (res) => {
        this.pastas = res;
        loaderPastas.dismiss();
      },
      (err) => {
        this.showErrorAlert(err);
        loaderPastas.dismiss();
      }
    );
  }

  backPasta(){
    
    if(this.folders.length){
      let loaderPastas = this.loadingCtrl.create({
        content: "Listando pastas..."
      });
      loaderPastas.present();

      this.folders.pop(); //remove a ultima pasta selecionada

      // Monta endereco completo
      this.endereco = this.rootpath;
      this.folders.forEach(element => {
        this.endereco += "/" + element  
      });

      // Altera titulo do explorer
      if(this.endereco){
        this.explorerTitle = "..." + this.endereco.substr(this.endereco.length - 20);
      }else{
        this.explorerTitle = "";
      }
      
      // carrega as pastas atuais da view
      this.wsUtil.buscaPastas(this.endereco).subscribe(
        (res) => {
          this.pastas = res;
          loaderPastas.dismiss();
        }
      );
    }else{
      this.endereco = "";
      this.dismiss();
    }
  }


  dismiss() {
    let data = { endereco: this.endereco };
    this.viewCtrl.dismiss(data);
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
