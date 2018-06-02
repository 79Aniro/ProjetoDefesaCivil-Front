import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OcorrenciaService } from '../../services/domain/ocorrencia.service';
import { OcorrenciaDTO } from '../../models/ocorrencia.dto';



@IonicPage()
@Component({
  selector: 'page-ocoabertas',
  templateUrl: 'ocoabertas.html',
})
export class OcoabertasPage {

  items: OcorrenciaDTO[];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public ocorrenciaService: OcorrenciaService) {
  }

  ionViewDidLoad() {

    this.ocorrenciaService.findOcoAbertas()
    .subscribe(response =>{
      this.items=response;
    },
    error => { });
    
  }

}
