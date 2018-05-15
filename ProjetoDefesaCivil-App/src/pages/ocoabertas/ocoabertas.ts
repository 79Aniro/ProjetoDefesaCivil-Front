import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OcorrenciaService } from '../../services/domain/ocorrencia.service';
import { OcorrenciaDTO } from '../../models/ocorrencia.dto';

/**
 * Generated class for the OcoabertasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    error => {console.log(error);
    });
    
  }

}
