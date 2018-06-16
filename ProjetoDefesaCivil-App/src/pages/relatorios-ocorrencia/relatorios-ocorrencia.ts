import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RelatorioService } from '../../services/domain/relatorio.service';

import { RelatorioDTO } from '../../models/relatorio.dto';


@IonicPage()
@Component({
  selector: 'page-relatorios-ocorrencia',
  templateUrl: 'relatorios-ocorrencia.html',
})
export class RelatoriosOcorrenciaPage {

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
