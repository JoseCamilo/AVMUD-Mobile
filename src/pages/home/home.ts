import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Janela } from "../../models/janela.model";
import { MudancaPage } from "../mudanca/mudanca";
import { AddJanelaPage } from "../addJanela/addJanela";
import { StatusPage } from "../status/status";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  janelas: Janela[] = [];

  
  constructor(public navCtrl: NavController, public platform: Platform) {
    
  }


  ionViewDidEnter() {
    this.readJanelas();

  }

  addJanela() {
    this.navCtrl.push(AddJanelaPage, {});
  }
  
  itemTapped(event, janela) {
    this.navCtrl.push(MudancaPage, {
      janela: janela
    });
  }

  readJanelas() {

    // this.webservice.getJanelas().subscribe(
    //   (res) => {
    //     this.janelas = res;
    //   }
    // );


    this.janelas = [];
    let element = new Janela();
    let element2 = new Janela();
    let element3 = new Janela();
    let element4 = new Janela();

    
    element.title = "Janela 11";
    element.idPAM = "PAM-900";
    this.janelas.push(element);

    
    element2.title = "Janela 33";
    element2.idPAM = "PAM-552"
    this.janelas.push(element2);
             
  }

  refresh(){
    
    
   }

  resultJanela(janela){

    this.navCtrl.push(StatusPage, {
      janela: janela
    });

  }
  
  doRefresh(refresher) {
    
    setTimeout(() => {
      this.readJanelas();
      refresher.complete();
      
    }, 2000);
  }

  startJanela(janela){
    
  } 

}



//  let element = new Janela();
//     let element2 = new Janela();
//     let element3 = new Janela();

//     element._id = 1;
//     element.title = "CRM 07/10/2017";
//     element.status = "ok";
//     element.idAmbiente = ["3"];
//     element.Result = [{mensagem: "Executada em 06/10/2017 22:09"}];
//     //this.janelas.push(element);
//     this.mydb.saveJanela(element);

//     element._id = 1;
//     element2.title = "SERVICOS 07/10/2017";
//     element2.status = "";
//     element2.idAmbiente = ["1"];
//     element2.Result = [{mensagem: "Não executada"}];
//     //this.janelas.push(element2);
//     this.mydb.saveJanela(element2);

//     element._id = 1;
//     element3.title = "TOTVS12 07/10/2017";
//     element3.status = "erro";
//     element3.idAmbiente = ["2"];
//     element3.Result = [{mensagem: "Executada em 06/10/2017 21:34"}];
//     //this.janelas.push(element3);
//     this.mydb.saveJanela(element3);

// private strSeparator = "__,__";
//   public convertArrayToStringResult(array: [{mensagem: string}]){
//       var str;

//       for (var i = 0;i<array.length; i++) {
//           str = str+array[i].mensagem;
//           // Do not append comma at the end of last element
//           if(i<array.length-1){
//               str = str+this.strSeparator;
//           }
//       }
//       return str;
//   }

//   public convertStringToArrayResult(str:string){
//       var arr: string[];
//       var obj: [{mensagem: string}];
//       arr = str.split(this.strSeparator);

//       for (var i = 0;i<arr.length; i++) {
//           obj.push({mensagem: arr[i]});
//       }

//       return obj;
//   }

//   public convertArrayToStringSx6(array: {
//           x6_var: string,
//           x6_conteud:string,
//           x6_contspa: string,
//           x6_conteng: string
//       }){
//       var str;

//       str = array.x6_var+this.strSeparator + array.x6_conteud+this.strSeparator + array.x6_contspa+this.strSeparator + array.x6_conteng;

//       return str;
//   }

//   public convertStringToArraySx6(str:string){
//       var arr: string[] = [];
//       var obj: {
//           x6_var: string,
//           x6_conteud:string,
//           x6_contspa: string,
//           x6_conteng: string
//       };
//       arr = str.split(this.strSeparator);


//       obj = {x6_var:arr[1],
//             x6_conteud:arr[2],
//             x6_contspa:arr[3],
//             x6_conteng:arr[4]};


//       return obj;
//   }

//   public convertArrayToString(array: [string]){
//     let str = "";
//     for (let i = 0;i<array.length; i++) {
//         str = str+array[i];
//         // Do not append comma at the end of last element
//         if(i<array.length-1){
//             str = str+this.strSeparator;
//         }
//     }
//     return str;
//   }

//   public convertStringToArray(str: string){
//       var arr: string[];
//       arr = str.split(this.strSeparator);

//       return arr;
//   }
