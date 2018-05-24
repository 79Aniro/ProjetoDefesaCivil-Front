import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RelatorioDTO } from '../../models/relatorio.dto';
import { RelatorioService } from '../../services/domain/relatorio.service';

/**
 * Generated class for the RelatoriosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-relatorios',
  templateUrl: 'relatorios.html',
})
export class RelatoriosPage {

  items: RelatorioDTO[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public relatorioService: RelatorioService) {
  }

  ionViewDidLoad() {
    this.relatorioService.findRelatorios()
    .subscribe(response =>{
      this.items=response;
    },
    error => { });
    
  }

}
