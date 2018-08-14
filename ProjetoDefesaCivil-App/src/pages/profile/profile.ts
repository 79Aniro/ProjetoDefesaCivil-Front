import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular/umd';
import { StorageService } from '../../services/storage.service';
import { FuncionarioDTO } from '../../models/funcionario.dto';
import { FuncionarioService } from '../../services/domain/funcionario.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  funcionario: FuncionarioDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public funcionarioService: FuncionarioService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.funcionarioService.findByEmail(localUser.email)
        .subscribe(response => {
          this.funcionario = response;
         // this.getImageIfExists();
        },
          error => { 

            if (error.status == 403) {
              this.navCtrl.setRoot('HomePage');
            }
          });
    }
    else {
      this.navCtrl.setRoot('HomePage');
    }

  }

  getImageIfExists() {
    this.funcionarioService.getImageFromBucket(this.funcionario.id)
      .subscribe(response => {
        this.funcionario.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.funcionario.id}.jpg`;
      },
        error => { });
  }
}