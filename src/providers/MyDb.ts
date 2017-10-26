import { Janela } from './../models/janela.model';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { Platform } from "ionic-angular";
import { SX6, Tarefa } from "../models/tarefa.model";
import { Mudanca } from "../models/mudanca.model";
import { Ambiente } from "../models/ambiente.model";
import { Aviso } from "../models/aviso.model";


@Injectable()
export class MyDb {
    myDb: SQLiteObject;

    items: any[];
    janelas: Janela[];
    mySqlite = new SQLite();


  constructor() {
       console.log("mydb constructor");

    // this.platform.ready().then(() => {

    //         this.sqlite.create({
    //               name: 'data.db',
    //               location: 'default'
    //             })
    //               .then((db: SQLiteObject) => {

    //                 this.mySqLite = db;

    //                 db.executeSql('create table if not exists janela( _id integer primary key, ' +
    //                                 'title VARCHAR(32), status VARCHAR(32), idAmbiente VARCHAR(32), '+
    //                                 'fase VARCHAR(32), Result VARCHAR(255) )', {})
    //                   .then(() => console.log('Executed SQL create janela'))
    //                   .catch(e => console.log(e));

                     
    //                 db.executeSql('create table if not exists mudanca( _id integer primary key, '+
    //                 'title VARCHAR(32), status VARCHAR(32), responsavel VARCHAR(32), contato VARCHAR(32),'+
    //                 ' idJanela VARCHAR(32), idPAM VARCHAR(32), idSubTaskPAM VARCHAR(32), Result VARCHAR(255) )', {})
    //                 .then(() => console.log('Executed SQL create mudanca'))
    //                 .catch(e => console.log(e));

    //                 db.executeSql('create table if not exists tarefa( _id integer primary key, '+
    //                 ' idMudanca VARCHAR(32), type VARCHAR(32), status VARCHAR(32), path VARCHAR(255), '+
    //                 ' field VARCHAR(32),'+
    //                 ' changeset VARCHAR(32), alias VARCHAR(32), SX6 VARCHAR(255), ordem VARCHAR(32), '+
    //                 ' nickname VARCHAR(32), fonte VARCHAR(255), consulta VARCHAR(32), Result VARCHAR(255) )', {})
    //                 .then(() => console.log('Executed SQL create tarefa'))
    //                 .catch(e => console.log(e));

    //                  db.executeSql('create table if not exists ambiente( _id integer primary key, '+
    //                 'title VARCHAR(32), producao VARCHAR(255),  preprod VARCHAR(255),  homolog VARCHAR(255) )', {})
    //                 .then(() => console.log('Executed SQL create ambiente'))
    //                 .catch(e => console.log(e));

    //                 db.executeSql('create table if not exists aviso( _id integer primary key, '+
    //                 'title VARCHAR(32), comentario VARCHAR(255) )', {})
    //                 .then(() => console.log('Executed SQL create aviso'))
    //                 .catch(e => console.log(e));


    //               })
    //               .catch(e => console.log(e));
       
    //       });

  }

public openDatabase() {
    return this.mySqlite.create({name: 'data.db', location: 'default'})
    .then((db: SQLiteObject) => {
        console.log("database is open now");

        this.myDb = db;
        //this.createJanelaTable();
    })
    .catch(e => console.log(e));
}

// public createJanelaTable(){
//     let query = 'create table if not exists janela( _id integer primary key, ' +
//                 'title VARCHAR(32), status VARCHAR(32), idAmbiente VARCHAR(32), '+
//                 'fase VARCHAR(32), Result VARCHAR(255) )';
//     console.log("createJanela");

//     this.myDb.executeSql(query, {}).then(() => {
//         console.log("janela table created");
//         let element = new Janela();

//         element.title = "CRM 07/10/2017";
//         element.status = "ok";
//         element.idAmbiente = "3";
//         element.Result = "Executada em 06/10/2017 22:09";

//         this.saveJanela(element);
//     })
//     .catch(e => console.log(e));
// }

public saveJanela(janela: Janela){
    let query = 'INSERT INTO janela (title , status , idAmbiente , fase , Result) '+
                                                            'VALUES (?,?,?,?,?)';
    console.log("saveJanela");

    this.myDb.executeSql(query, [janela.title , janela.status, janela.idAmbiente, 
                            janela.fase, janela.Result])
                                .then(() => console.log('Executed SQL 1 '))
                                .catch(e => console.log(e));
}

public getJanelas(){
    console.log("getjanelas");
    return this.myDb.executeSql("SELECT * FROM janela", []);

}

//   public saveMudanca(mudanca: Mudanca){
//     this.mySqLite.executeSql('INSERT INTO mudanca (title , status , responsavel , contato ,'+
//                                                   ' idJanela , idPAM , idSubTaskPAM , Result ) '+
//                                                   'VALUES (?,?,?,?,?,?,?,?)',
//                                                   [mudanca.title , mudanca.status, mudanca.responsavel, mudanca.contato, 
//                                                     mudanca.idJanela, mudanca.idPAM , mudanca.idSubTaskPAM , this.convertArrayToStringResult(mudanca.Result)])
//                       .then(() => console.log('Executed SQL 2 '))
//                       .catch(e => console.log(e));
//   }

//   public saveTarefa(tarefa: Tarefa){
//     this.mySqLite.executeSql('INSERT INTO tarefa (idMudanca , type , status , path , '+
//                                                   ' field '+
//                                                   ' changeset , alias , SX6 , order , '+
//                                                   ' nickname , fonte , consulta , Result ) '+
//                                                   'VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
//                                                   [tarefa.idMudanca , tarefa.type, tarefa.status, tarefa.path,
//                                                     tarefa.field, tarefa.changeset , tarefa.alias, 
//                                                     this.convertArrayToStringSx6(tarefa.SX6) , tarefa.order,
//                                                     tarefa.nickname, tarefa.fonte , tarefa.consulta , this.convertArrayToStringResult(tarefa.Result)])
//                       .then(() => console.log('Executed SQL 3 '))
//                       .catch(e => console.log(e));
//   }

//   public saveAmbiente(ambiente: Ambiente){
//     this.mySqLite.executeSql('INSERT INTO ambiente (title , producao ,  preprod ,  homolog  ) '+
//                                                   'VALUES (?,?,?,?)',
//                                                   [ambiente.title , ambiente.producao, ambiente.preprod, ambiente.homolog])
//                       .then(() => console.log('Executed SQL 4 '))
//                       .catch(e => console.log(e));
//   }

//   public saveAviso(aviso: Aviso){
//     this.mySqLite.executeSql('INSERT INTO aviso (title , comentario ) '+
//                                                   'VALUES (?,?)',
//                                                   [aviso.title , aviso.comentario])
//                       .then(() => console.log('Executed SQL 5 '))
//                       .catch(e => console.log(e));
//   }

//   public getJanelas(){
    
    

//          this.sqlite.create({
//                   name: 'data.db',
//                   location: 'default'
//             })
//             .then((db: SQLiteObject) => {

//                     return db.executeSql("SELECT * FROM janela", []).then((data) => {
//                     let items : Janela[] = [];
//                     let janela: Janela;
//                     if(data.rows.length > 0) {
//                         for(var i = 0; i < data.rows.length; i++) {
                            
//                             janela = new Janela().Janela(data.rows.item(i)._id, data.rows.item(i).title,
//                                 data.rows.item(i).status, data.rows.item(i).idAmbiente,
//                                 data.rows.item(i).fase, this.convertStringToArrayResult( data.rows.item(i).Result ) );

//                                 items.push(janela);
//                         }

//                         console.log(items);
//                         return items;
//                     }
//                 }, (e) => {
//                     console.log("Errot: " + JSON.stringify(e));
//                 });


//             })
//             .catch(e => console.log(e));
       
       
//   }

//   //transformar a saida do result de str pra array de obj
//   public getJanela(id: number){
//     this.mySqLite.executeSql("SELECT * FROM janela WHERE _id=?", [id]).then((data) => {
//                           this.items = [];
//                           if(data.rows.length > 0) {
//                               for(var i = 0; i < data.rows.length; i++) {
//                                   this.items.push(data.rows.item(i));
//                               }
//                               console.log(this.items);

//                               return this.items;
//                           }
//                       }, (e) => {

//                           console.log("Errot: " + JSON.stringify(e));
//                       });
//   }

//   public getMudancas(idJanela: number){
//     this.mySqLite.executeSql("SELECT * FROM mudanca WHERE idJanela = ?", [idJanela]).then((data) => {
//                           this.items = [];
//                           if(data.rows.length > 0) {
//                               for(var i = 0; i < data.rows.length; i++) {
//                                   this.items.push(data.rows.item(i));
//                               }
//                               console.log(this.items);
                              
//                               return this.items;
//                           }
//                       }, (e) => {

//                           console.log("Errot: " + JSON.stringify(e));
//                       });
//   }
  
//   public getMudanca(id: number){
//     this.mySqLite.executeSql("SELECT * FROM mudanca WHERE _id=?", [id]).then((data) => {
//                           this.items = [];
//                           if(data.rows.length > 0) {
//                               for(var i = 0; i < data.rows.length; i++) {
//                                   this.items.push(data.rows.item(i));
//                               }
//                               console.log(this.items);

//                               return this.items;
//                           }
//                       }, (e) => {

//                           console.log("Errot: " + JSON.stringify(e));
//                       });
//   }

//   public getTarefas(idMudanca: number){
//     this.mySqLite.executeSql("SELECT * FROM tarefa WHERE idMudanca=?", [idMudanca]).then((data) => {
//                           this.items = [];
//                           if(data.rows.length > 0) {
//                               for(var i = 0; i < data.rows.length; i++) {
//                                   this.items.push(data.rows.item(i));
//                               }
//                               console.log(this.items);
                              
//                               return this.items;
//                           }
//                       }, (e) => {

//                           console.log("Errot: " + JSON.stringify(e));
//                       });
//   }

//   public gettarefa(id: number){
//     this.mySqLite.executeSql("SELECT * FROM tarefa WHERE _id=?", [id]).then((data) => {
//                           this.items = [];
//                           if(data.rows.length > 0) {
//                               for(var i = 0; i < data.rows.length; i++) {
//                                   this.items.push(data.rows.item(i));
//                               }
//                               console.log(this.items);

//                               return this.items;
//                           }
//                       }, (e) => {

//                           console.log("Errot: " + JSON.stringify(e));
//                       });
//   }

private strSeparator = "__,__";
public convertArrayToStringResult(array: [{mensagem: string}]){
    var str;

    for (var i = 0;i<array.length; i++) {
        str = str+array[i].mensagem;
        // Do not append comma at the end of last element
        if(i<array.length-1){
            str = str+this.strSeparator;
        }
    }
    return str;
}

//   public convertStringToArrayResult(str:string){
//       var arr: string[];
//       var obj: [{mensagem: string}];
//       arr = str.split(this.strSeparator);

//       for (var i = 0;i<arr.length; i++) {
//           obj.push({mensagem: arr[i]});
//       }

//       return obj;
//   }

//   public convertArrayToStringSx6(array: SX6){
//       var str;

//       str = array.x6_var+this.strSeparator + array.x6_conteud+this.strSeparator + array.x6_contspa+this.strSeparator + array.x6_conteng;

//       return str;
//   }

//   public convertStringToArraySx6(str:string){
//       var arr: string[];
//       var obj: SX6;
//       arr = str.split(this.strSeparator);

  
//       obj = {x6_var:arr[1],
//             x6_conteud:arr[2],
//             x6_contspa:arr[3],
//             x6_conteng:arr[4]};


//       return obj;
//   }
  
}