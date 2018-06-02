import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { variable } from '@angular/compiler/src/output/output_ast';
import { OcorrenciaService } from '../../services/domain/ocorrencia.service';
import { RegiaoService } from '../../services/domain/regiao.service';
import { BairroService } from '../../services/domain/bairro.service';
import { RegiaoDTO } from '../../models/regiao.dto';
import { BairroDTO } from '../../models/bairro.dto';
import { RuaDTO } from '../../models/rua.dto';
import { RuaService } from '../../services/domain/rua.service';
import { FuncionarioService } from '../../services/domain/funcionario.service';
import { StorageService } from '../../services/storage.service';
import { FuncionarioDTO } from '../../models/funcionario.dto';
import { LocalUser } from '../../models/local_user';



@IonicPage()
@Component({
  selector: 'page-i-ocorrencia',
  templateUrl: 'i-ocorrencia.html',
})
export class IOcorrenciaPage {

  alertCtrl: any;
  formGroup: FormGroup;
  regioes: RegiaoDTO[];
  bairros: BairroDTO[];
  ruas: RuaDTO[];
  ruasSol: RuaDTO[];
  funcionarioDto: FuncionarioDTO;

  id_user: string;
  email: string;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public ocorrenciaService: OcorrenciaService,
    public regiaoService: RegiaoService,
    public bairroService: BairroService,
    public ruaService: RuaService,
    public storage: StorageService,
    public funcionarioService: FuncionarioService,
    public localStorage: StorageService) {


    this.formGroup = this.formBuilder.group({
      origemOcorrencia: ['', [Validators.required]],
      tipoOcorrencia: ['', [Validators.required]],
      regiao: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      ruaLocal: ['', [Validators.required]],
      numeroLocal: ['', [Validators.required]],
      historicoInicial: ['', [Validators.required]],
      tipoSolicitante: ['', [Validators.required]],
      ruaSolicitante: ['', [Validators.required]],
      nomeSolicitante: ['', [Validators.required]],
      emailSolicitante: ['', [Validators.required]],
      numeroResidenciaSolicitante: ['', [Validators.required]],
      telefoneSolicitante: ['', [Validators.required]],
      telefoneSolicitante2: ['', [Validators.required]],
      funcionario: ['', [Validators.required]]

    });
  }
  ionViewDidLoad() {
    this.regiaoService.findAll()
      .subscribe(response => {
        this.regioes = response;
        this.formGroup.controls.regiao.setValue(this.regioes[0].id);
        

        this.updateBairros();
        this.updateRuaAll();

        


      },
        error => { });
        let varId = this.localStorage.getLocalUser();
        this.id_user=varId.iduser;       

        this.formGroup.controls.funcionario.setValue(this.id_user);
  }


  updateBairros() {
    let regiao_id = this.formGroup.value.regiao;
    this.bairroService.findByRegiaoId(regiao_id)
      .subscribe(response => {
        this.bairros = response;
        this.formGroup.controls.bairro.setValue(null)
      },
        error => { });

  }

  updateRuas() {
    let bairro_id = this.formGroup.value.bairro;
    this.ruaService.findByBairroId(bairro_id)
      .subscribe(response => {
        this.ruas = response;
        this.formGroup.controls.ruaLocal.setValue(null)
      },
        error => { });

  }

  updateRuaAll() {

    this.ruaService.findByRuaAll()

      .subscribe(response => {
        this.ruasSol = response;
        this.formGroup.controls.ruaSolicitante.setValue(null)
      },
        error => { });

  }

  insereOco() {
    this.ocorrenciaService.insert(this.formGroup.value)
      .subscribe(response => {
        
        console.log(response.status);
        if (response.status) {
          console.log("gravou");
        }
        this.navCtrl.setRoot('MenuPage');
      },
        error => { });
  }


  recuperaFuncionario() {
    let localUser = this.storage.getLocalUser();
    let emailV= this.funcionarioService.findByEmail(localUser.email)
    .subscribe(response=>{

      this.funcionarioDto=response;

    })

  }
  handleOcorrenciaInserida() {
    let alert = this.alertCtrl.create({
      title: 'Ocorrencia Inserida',
      message: 'Ocorrencia Inserida com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();
  }

}
