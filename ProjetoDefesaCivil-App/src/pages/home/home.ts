import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';
import { EnderecoService } from '../../services/domain/endereco.service';
import { EnderecoDTO } from '../../models/endereco.dto';
import { StorageService } from '../../services/storage.service';
import { OcorrenciaService } from '../../services/domain/ocorrencia.service';
import { TipoOcorrenciaDTO } from '../../models/tipoOcorrencia.dto';
import { OrigemOcorrenciaDTO } from '../../models/origemOcorenciaDTO';
import { DepartamentoDTO } from '../../models/departamento.dto';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  ruas: EnderecoDTO[];

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };

  tiposOco: TipoOcorrenciaDTO[];
  origemOco: OrigemOcorrenciaDTO[];
  departamentos: DepartamentoDTO[];
  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService,
    public endService: EnderecoService,
    public storage: StorageService,
    public ocorrenciaService: OcorrenciaService,

  ) {

  }


  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidLoad() {


  }


  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'), response.headers.get('idUser'));
        this.navCtrl.setRoot('MenuPage');
        console.log(this.storage.verificaRuas());
      },

        error => { });
    if (this.storage.verificaRuas()==false) {
      console.log("buscou ruas");
      this.endService.findByEnderecoAll().
        subscribe(response => {
          this.ruas = response;
          this.storage.setLocalEnderecos(this.ruas);

        });
      }
      else{
        console.log(this.storage.getRuaDTO);
      }
      this.ocorrenciaService.departamentos().
        subscribe(response => {
          this.departamentos = response;
          this.storage.setDeparatementos(this.departamentos);
        },
          error => {

          });
      this.ocorrenciaService.tiposocorrenciaAll().
        subscribe(response => {
          this.tiposOco = response;
          this.storage.setTipoOcorrencia(this.tiposOco);

        }, error => {

        });
      this.ocorrenciaService.origemOcorrenciaAll().
        subscribe(response => {
          this.origemOco = response;
          this.storage.setOrigemOcorrencia(this.origemOco);
        }, error => {

        });

    }

    esqueciSenha() {
      this.navCtrl.setRoot('EsqueciSenhaPage');
    }


    // Função que chama o servico que busca todos os tipos de ocorrencias
    tiposOcorrencia() {

      this.ocorrenciaService.tiposocorrenciaAll().
        subscribe(response => {
          this.tiposOco = response;

        })
    }

  }