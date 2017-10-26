import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AmbientePage } from "../pages/ambiente/ambiente";
import { AvisoPage } from "../pages/aviso/aviso";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  private homePage;
  private ambientePage;
  private avisoPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private sqlite: SQLite) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();


      //criacao do banco de dados
      this.sqlite.create({
                  name: 'data.db',
                  location: 'default'
                })
                  .then((db: SQLiteObject) => {

                    db.executeSql('create table if not exists janela( _id integer primary key, ' +
                                    'title VARCHAR(32), status VARCHAR(32), idAmbiente VARCHAR(32), '+
                                    'fase VARCHAR(32), Result VARCHAR(255) )', {})
                      .then(() => console.log('Executed SQL create janela'))
                      .catch(e => console.log(e));

                     
                    db.executeSql('create table if not exists mudanca( _id integer primary key, '+
                    'title VARCHAR(32), status VARCHAR(32), responsavel VARCHAR(32), contato VARCHAR(32),'+
                    ' idJanela VARCHAR(32), idPAM VARCHAR(32), idSubTaskPAM VARCHAR(32), Result VARCHAR(255) )', {})
                    .then(() => console.log('Executed SQL create mudanca'))
                    .catch(e => console.log(e));

                    db.executeSql('create table if not exists tarefa( _id integer primary key, '+
                    ' idMudanca VARCHAR(32), type VARCHAR(32), status VARCHAR(32), path VARCHAR(255), '+
                    ' field VARCHAR(32),'+
                    ' changeset VARCHAR(32), alias VARCHAR(32), SX6 VARCHAR(255), ordem VARCHAR(32), '+
                    ' nickname VARCHAR(32), fonte VARCHAR(255), consulta VARCHAR(32), Result VARCHAR(255) )', {})
                    .then(() => console.log('Executed SQL create tarefa'))
                    .catch(e => console.log(e));

                     db.executeSql('create table if not exists ambiente( _id integer primary key, '+
                    'title VARCHAR(32), producao VARCHAR(255),  preprod VARCHAR(255),  homolog VARCHAR(255) )', {})
                    .then(() => console.log('Executed SQL create ambiente'))
                    .catch(e => console.log(e));

                    db.executeSql('create table if not exists aviso( _id integer primary key, '+
                    'title VARCHAR(32), comentario VARCHAR(255) )', {})
                    .then(() => console.log('Executed SQL create aviso'))
                    .catch(e => console.log(e));


                  })
                  .catch(e => console.log(e));
       

    });

    this.homePage = HomePage;
    this.ambientePage = AmbientePage;
    this.avisoPage = AvisoPage;
  }

  openPage(p) {
    this.rootPage = p;
  }
  
}

