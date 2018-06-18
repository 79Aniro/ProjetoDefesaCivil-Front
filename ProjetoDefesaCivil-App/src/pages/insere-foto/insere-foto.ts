import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { RelatorioService } from '../../services/domain/relatorio.service';



@IonicPage()
@Component({
  selector: 'page-insere-foto',
  templateUrl: 'insere-foto.html',
})
export class InsereFotoPage {

  oco_id: string;
  picture: string;
  cameraOn: boolean = false;
  relatorio_id:string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public camera: Camera,
    public relatorioService: RelatorioService) {
  }

  ionViewDidLoad() {
     this.relatorio_id = this.navParams.get('relatorio_id');
    this.getCameraPicture();
  }

  getCameraPicture() {

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;
    }, (err) => {
    });
  }

  sendPicture() {
    this.relatorioService.uploadPicture(this.picture,this.relatorio_id)
      .subscribe(response => {
        this.picture = null;
      
      },
        error => {
        });
  }

  cancel() {
    this.picture = null;
  }

}
