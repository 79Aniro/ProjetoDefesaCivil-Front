import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { OcorrenciaDTO } from '../../models/ocorrencia.dto';
import { OcorrenciaService } from '../../services/domain/ocorrencia.service';



@IonicPage()
@Component({
  selector: 'page-ocoatendidas',
  templateUrl: 'ocoatendidas.html',
})
export class OcoatendidasPage {
  items: OcorrenciaDTO[];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public ocorrenciaService: OcorrenciaService,
    public alertCrtl: AlertController) {
  }

  ionViewDidLoad() {

    this.ocorrenciaService.findOcoAtendidas()
      .subscribe(response => {
        this.items = response;
        if(this.items.length==0){
          this.handleOcoFechadasAll();
        }
      },
        error => { });

  }

  fecharOcorrencias(id: string) {
    this.ocorrenciaService.fecharOco(id)
    .subscribe(response => {
        
      this.handleOcorrenciaFechada();
      
     
    },
      error => { });
  }

  handleOcorrenciaFechada() {
    let alert = this.alertCrtl.create({
      title: 'Ocorrencia Fechada',
      message: 'Ocorrencia Fechada com sucesso',
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

  handleOcoFechadasAll() {
    let alert = this.alertCrtl.create({
      title: 'Ocorrencias Atendidas',
      message: 'Não há ocorrências para serem fechadas',
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
