import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RelatorioService } from '../../services/domain/relatorio.service';
import { OcorrenciaService } from '../../services/domain/ocorrencia.service';
import { OcorrenciaDTO } from '../../models/ocorrencia.dto';



@IonicPage()
@Component({
  selector: 'page-ocorrencia-busca-relatorios',
  templateUrl: 'ocorrencia-busca-relatorios.html',
})
export class OcorrenciaBuscaRelatoriosPage {

  items: OcorrenciaDTO[];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public relatorioService: RelatorioService,
    public ocorrenciaService: OcorrenciaService,
    public alertCrtl: AlertController) {
  }

  ionViewDidLoad() {
    this.ocorrenciaService.findOcoAbertas()
      .subscribe(response => {
        this.items = response;
        if (this.items.length == 0) {
          this.handleOcoAbertasAll();
        }
      },
        error => { });
  }


  buscarRelatoriosIdOco(id_ocorrencia: string) {

    this.navCtrl.push('RelatoriosOcorrenciaPage', {id_ocorrencia: id_ocorrencia});  
  }

  
  handleOcoAbertasAll() {
    let alert = this.alertCrtl.create({
      title: 'Ocorrencias Abertas',
      message: 'Não há ocorrências Abertas',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('MenuPage');
          }
        }
      ]
    });
    alert.present();
  }
}
