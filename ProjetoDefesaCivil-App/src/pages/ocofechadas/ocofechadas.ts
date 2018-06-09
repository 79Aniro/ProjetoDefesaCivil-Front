import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OcorrenciaService } from '../../services/domain/ocorrencia.service';
import { OcorrenciaDTO } from '../../models/ocorrencia.dto';


@IonicPage()
@Component({
  selector: 'page-ocofechadas',
  templateUrl: 'ocofechadas.html',
})
export class OcofechadasPage {

  items: OcorrenciaDTO[];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public ocorrenciaService: OcorrenciaService){
  }

  ionViewDidLoad() {

    this.ocorrenciaService.findOcoFechadas()
    .subscribe(response =>{
      this.items=response;
    },
    error => { });
    
  }

}