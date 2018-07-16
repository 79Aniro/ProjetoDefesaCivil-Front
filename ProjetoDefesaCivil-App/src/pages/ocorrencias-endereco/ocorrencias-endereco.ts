import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { OcorrenciaService } from '../../services/domain/ocorrencia.service';
import { OcorrenciaDTO } from '../../models/ocorrencia.dto';
import { FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the OcorrenciasEnderecoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ocorrencias-endereco',
  templateUrl: 'ocorrencias-endereco.html',
})
export class OcorrenciasEnderecoPage {
  parametro: string;
  regiao: string;
  items: OcorrenciaDTO[];
  formGroup: FormGroup;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public ocorrenciaService: OcorrenciaService,
    public alertCrtl: AlertController,
    public formBuilder: FormBuilder) {
  }



  buscarRelatoriosIdOco(id_ocorrencia: string) {

    this.navCtrl.push('RelatoriosOcorrenciaPage', { id_ocorrencia: id_ocorrencia });
  }

  ionViewDidLoad() {

    this.parametro = this.navParams.get('parametro');
    this.regiao = this.navParams.get('regiaoPar');
    if (this.parametro == "Regiao") {
      this.ocorrenciaService.ocoRegiao(this.regiao).
        subscribe(response => {
          this.items = response;
          if (this.items.length == 0) {
            this.handleOcoRegiao();
          }
        },
          error => { });
    }

  }




  handleOcoAbertasAll() {
    let alert = this.alertCrtl.create({
      title: 'Ocorrencias Atendidas',
      message: 'Não há ocorrências Atendidas',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('MenuOcorrenciaPage');
          }
        }
      ]
    });
    alert.present();
  }

  handleOcoPerido() {
    let alert = this.alertCrtl.create({
      title: 'Ocorrencias Periodo',
      message: 'Não há ocorrências neste periodo',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('MenuOcorrenciaPage');
          }
        }
      ]
    });
    alert.present();
  }

  handleOcoRegiao() {
    let alert = this.alertCrtl.create({
      title: 'Ocorrencias Regiao',
      message: 'Não há ocorrências nesta região',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('MenuOcorrenciaPage');
          }
        }
      ]
    });
    alert.present();
  }

}
