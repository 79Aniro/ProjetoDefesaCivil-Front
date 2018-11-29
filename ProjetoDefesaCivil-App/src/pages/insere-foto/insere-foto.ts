import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
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
    public relatorioService: RelatorioService,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
     this.relatorio_id = this.navParams.get('relatorio_id');
    this.getCameraPicture();
  }

  getCameraPicture() {
 let loader= this.presentLoading();
    this.cameraOn = true;
    loader.dismiss();
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
      
    }

    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;
     
    }, (error) => {loader.dismiss();
    });
  }

  sendPicture() {
    let loader= this.presentLoading();
    this.relatorioService.uploadPicture(this.picture,this.relatorio_id)
      .subscribe(response => {
        this.picture = null;
        loader.dismiss();
        this.presentToast();
      },
        error => {loader.dismiss();
        });
  }

  cancel() {
    this.picture = null;
  }
  menuRelatorios(){

    this.navCtrl.setRoot('MenuRelatorioPage');
  }
  
   presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Aguarde...",
      
    });
    loader.present();
    return loader;
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Foto enviada com sucesso',
      duration: 3000,
      position: 'middle'
    });
  
   
    toast.present();
  }

}
