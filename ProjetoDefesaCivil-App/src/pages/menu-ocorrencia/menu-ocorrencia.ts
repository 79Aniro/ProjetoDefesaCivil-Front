import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular/umd';
import { StorageService } from '../../services/storage.service';
import { FuncionarioService } from '../../services/domain/funcionario.service';
import { FuncionarioDTO } from '../../models/funcionario.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';



@IonicPage()
@Component({
  selector: 'page-menu-ocorrencia',
  templateUrl: 'menu-ocorrencia.html',
})
export class MenuOcorrenciaPage {
  id_user: string;
  funcionarioDto: FuncionarioDTO;
  perfil_user: string;
  regiao: string;
  regiaoPar: string;
  buscaPar: string;
  formGroup: FormGroup;
  dataInicial: string;
  dataFinal: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public funcionarioService: FuncionarioService,
    public localStorage: StorageService,
    public alertCrtl: AlertController,
    public formBuilder: FormBuilder,
    public auth: AuthService) {
    this.formGroup = this.formBuilder.group({
      dataInicial: ['', [Validators.required]],
      dataFinal: ['', [Validators.required]],
    });

  }

  ionViewDidLoad() {

    if (this.localStorage.getLocalUser() == null) {
      this.auth.logout();
      this.navCtrl.setRoot('HomePage');
    }
    else {
      let varId = this.localStorage.getLocalUser();
      this.id_user = varId.iduser;
      this.funcionarioService.buscaPerfil(this.id_user).
        subscribe(response => {
          this.funcionarioDto = response;
          this.perfil_user = this.funcionarioDto.perfil;
        },
          error => { });

    }


  }

  ocorrenciasAbertas() {

    this.navCtrl.push('OcoabertasPage');

  }

  ocorrenciasFechadas() {
    this.navCtrl.push('OcofechadasPage');

  }


  fecharOcorrencias() {
    this.navCtrl.push('OcoatendidasPage');

  }
  ocorrenciasRegiao() {

    this.handleRegioes();
    this.buscaPar = "Regiao";


  }

  ocorrenciasPeriodo() {

 
    this.buscaPar = "Periodo";

    var z = this.dataInicial.toString().split("-");
    var dat2 = z[2] + "-" + z[1] + "-" + z[0];
    this.dataInicial = dat2;


    var x = this.dataFinal.toString().split("-");
    var dat = x[2] + "-" + x[1] + "-" + x[0];
    this.dataFinal = dat;

    
    this.navCtrl.push('OcorrenciasEnderecoPage', { parametro: this.buscaPar, dataInicial: this.dataInicial, dataFinal: this.dataFinal });



  }
  handleRegioes() {
    let alert = this.alertCrtl.create({
      title: 'Relatorio Inserido',
      message: 'Relatorio Inserido  com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Centro',
          handler: () => {
            this.regiao = "Centro",
              this.navCtrl.push('OcorrenciasEnderecoPage', { parametro: this.buscaPar, regiaoPar: this.regiao });
          }
        },
        {
          text: 'Leste',
          handler: () => {
            this.regiao = "Leste",
              this.navCtrl.push('OcorrenciasEnderecoPage', { parametro: this.buscaPar, regiaoPar: this.regiao });
          }
        },
        {
          text: 'Oeste',
          handler: () => {
            this.regiao = "Oeste",
              this.navCtrl.push('OcorrenciasEnderecoPage', { parametro: this.buscaPar, regiaoPar: this.regiao });
          }
        },
        {
          text: 'Norte',
          handler: () => {
            this.regiao = "Norte",
              this.navCtrl.push('OcorrenciasEnderecoPage', { parametro: this.buscaPar, regiaoPar: this.regiao });
          }
        },
        {
          text: 'Sul',
          handler: () => {
            this.regiao = "Sul",
              this.navCtrl.push('OcorrenciasEnderecoPage', { parametro: this.buscaPar, regiaoPar: this.regiao });
          }
        },

        {
          text: 'Sudeste',
          handler: () => {
            this.regiao = "Sudeste",
              this.navCtrl.push('OcorrenciasEnderecoPage', { parametro: this.buscaPar, regiaoPar: this.regiao });
          }
        }
      ]
    });
    alert.present();
  }

}
