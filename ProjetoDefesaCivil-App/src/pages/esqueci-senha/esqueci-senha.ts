import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { FuncionarioService } from '../../services/domain/funcionario.service';
import { EmailDTO } from '../../models/email.dto';

/**
 * Generated class for the EsqueciSenhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-esqueci-senha',
  templateUrl: 'esqueci-senha.html',
})
export class EsqueciSenhaPage {
 

 creds: EmailDTO = {
  email: ""
    
};
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
  public funcService: FuncionarioService,
  public alertCrtl: AlertController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EsqueciSenhaPage');
  }

  novaSenha(){
    this.funcService.novaSenha(this.creds).
    subscribe(response => {
      this.handleNovaSenha();
    this.navCtrl.setRoot('HomePage');
    },
 error => {this.handlePermissaoNegada();
  this.navCtrl.setRoot('HomePage');
 });

}


handlePermissaoNegada() {
  let alert = this.alertCrtl.create({
    title: 'Nova senha',
    message: 'Não foi possivel cadastrar nova senha',
    enableBackdropDismiss: false,
    buttons: [
      {
        text: 'Ok',
        handler: () => {
          
        }
      }
    ]
  });
  alert.present();
}

handleNovaSenha() {
  let alert = this.alertCrtl.create({
    title: 'Nova senha',
    message: 'Uma nova senha foi enviada ao email',
    enableBackdropDismiss: false,
    buttons: [
      {
        text: 'Ok',
        handler: () => {
         
        }
      }
    ]
  });
  alert.present();
}
}
