import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';
import { EnderecoService } from '../../services/domain/endereco.service';
import { EnderecoDTO } from '../../models/endereco.dto';
import { StorageService } from '../../services/storage.service';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  ruas:EnderecoDTO[];

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };
  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService,
    public endService:EnderecoService,
    public storage:StorageService
  ) {

  }


  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidLoad(){

   
  }


  login() {
   this.auth.authenticate(this.creds)
      .subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization'),response.headers.get('idUser'));
        this.navCtrl.setRoot('MenuPage');
      },
        
        error => { });
        this.endService.findByEnderecoAll().
        subscribe(response=>{
          this.ruas=response;
          this.storage.setLocalEnderecos(this.ruas);
        },
        error => { });
  }

  esqueciSenha(){
    this.navCtrl.setRoot('EsqueciSenhaPage');
  }

}
