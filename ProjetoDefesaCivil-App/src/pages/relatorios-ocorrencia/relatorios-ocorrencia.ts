import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RelatorioService } from '../../services/domain/relatorio.service';

import { RelatorioDTO } from '../../models/relatorio.dto';


@IonicPage()
@Component({
  selector: 'page-relatorios-ocorrencia',
  templateUrl: 'relatorios-ocorrencia.html',
})
export class RelatoriosOcorrenciaPage {

  items: RelatorioDTO[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public relatorioService: RelatorioService,public alertCrtl: AlertController) {
  }

  ionViewDidLoad() {
    let id_ocorrencia  = this.navParams.get('id_ocorrencia');
    

    this.relatorioService.buscaoRelatoriosIdOco(id_ocorrencia)
    .subscribe(response =>{
      this.items=response;
     
    },
    error => { });
    
  }

  geraPdf(id_relatorio){
    
    this.relatorioService.gerarPdfRelatorio(id_relatorio)
    .subscribe(response => {
        
      this.handleRelatorioPDFCriado();
     
    },
      error => { });

    
  }

  handleRelatorioPDFCriado() {
    let alert = this.alertCrtl.create({
      title: 'Relatorio PDF',
      message: 'Relatorio PDF criando com Sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler:()=>{
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

}
