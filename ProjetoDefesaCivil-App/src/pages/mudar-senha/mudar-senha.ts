import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { FuncionarioService } from '../../services/domain/funcionario.service';



@IonicPage()
@Component({
  selector: 'page-mudar-senha',
  templateUrl: 'mudar-senha.html',
})
export class MudarSenhaPage {
  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public funService: FuncionarioService,
    public alertCrtl: AlertController, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MudarSenhaPage');
  }

  trocarSenha() {
    this.funService.trocaSenha(this.creds.email, this.creds.senha).
      subscribe(response => {
this.senhaMudada();

      },
        error => {this.senhaNaoMudada();
          this.navCtrl.setRoot('MenuPage');});
  }

  senhaMudada() {
    let alert = this.alertCrtl.create({
      title: 'Trocar Senha',
      message: 'A senha foi mudada com sucesso',
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

  senhaNaoMudada() {
    let alert = this.alertCrtl.create({
      title: 'Trocar Senha',
      message: 'Não foi possível mudar a senha',
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
