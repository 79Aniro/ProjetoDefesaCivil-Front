import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RelatorioService } from '../../services/domain/relatorio.service';

import { RelatorioDTO } from '../../models/relatorio.dto';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()
@Component({
  selector: 'page-relatorios-ocorrencia',
  templateUrl: 'relatorios-ocorrencia.html',
})
export class RelatoriosOcorrenciaPage {
  url: string;
  items: RelatorioDTO[];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public relatorioService: RelatorioService,
    public alertCrtl: AlertController) {
  }

  ionViewDidLoad() {
    let id_ocorrencia = this.navParams.get('id_ocorrencia');


    this.relatorioService.buscaoRelatoriosIdOco(id_ocorrencia)
      .subscribe(response => {
        this.items = response;
        if (this.items.toString.length==0) {

          this.handleOcorrenciaSemRelatorio();
        }
      },
        error => { });
        
  }



  geraPdf(id_relatorio) {

    this.relatorioService.gerarPdfRelatorio(id_relatorio)
      .subscribe(response => {

        this.handleRelatorioPDFCriado();

      },
        error => { });


  }

  buscarRelatoriosIdRel(id_relatorio: string) {

    this.navCtrl.push('RelatorioPdfPage', { id_relatorio: id_relatorio });
  }


  buscaUrl(): string {

    this.url = `${API_CONFIG.bucketBaseUrl}`
    return this.url;
  }


  handleRelatorioPDFCriado() {
    let alert = this.alertCrtl.create({
      title: 'Relatorio PDF',
      message: 'Relatorio PDF criando com Sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  handleOcorrenciaSemRelatorio() {
    let alert = this.alertCrtl.create({
      title: 'Relatorio por Ocorrencia',
      message: 'Ocorrencia não possui relatorio',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

}
