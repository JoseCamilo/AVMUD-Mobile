import { Component } from '@angular/core';
import { WsEmpresas } from '../../providers/wsEmpresas';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController, ViewController, ModalController, LoadingController } from 'ionic-angular';
import { Produto } from "../../models/produto.model";
import { Empresa } from "../../models/empresa.model";
import { AddEmpresaPage } from "../addEmpresa/addEmpresa";


@Component({
  selector: 'page-empresa',
  templateUrl: 'empresa.html'
})
export class EmpresaPage {

  empresas: Empresa[] = [];
  produto: Produto = new Produto();

  constructor(public webservice: WsEmpresas, public navParams: NavParams, public navCtrl: NavController, public alertCtrl: AlertController, public viewCtrl: ViewController, public modalCtrl: ModalController, public loadingCtrl: LoadingController) {

    if (navParams.get('produto')) {
      this.produto = navParams.get('produto') as Produto;
    }

  }

  ionViewDidEnter() {
    this.readEmpresas();
  }

  readEmpresas() {

    let loader = this.loadingCtrl.create({
      content: "Buscando Empresas..."
    });
    loader.present();

    this.webservice.getEmpresas(this.produto._id).subscribe(
      (res) => {
        this.empresas = res;
        loader.dismiss();
      }
    );
  }


  itemTapped(event, empresa) {
    this.navCtrl.push(AddEmpresaPage, {
      empresa: empresa
    });
  }

  addEmpresa(){
    this.navCtrl.push(AddEmpresaPage, {
      produto: this.produto
    });
  }
  

  showAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Sucesso',
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

  doRefresh(refresher) {
    
    setTimeout(() => {
      this.readEmpresas();
      refresher.complete();
      
    }, 2000);
  }
}

