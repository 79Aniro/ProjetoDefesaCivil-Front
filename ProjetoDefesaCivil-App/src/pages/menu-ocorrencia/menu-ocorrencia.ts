import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-menu-ocorrencia',
  templateUrl: 'menu-ocorrencia.html',
})
export class MenuOcorrenciaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuOcorrenciaPage');
  }

  ocorrenciasAbertas(){

    this.navCtrl.push('OcoabertasPage');
  
  }

  ocorrenciasFechadas(){
    this.navCtrl.push('OcofechadasPage');

  }

  ocorrenciasLocalidade(){
    this.navCtrl.push('OcolocalidadePage');

  }
 

}
