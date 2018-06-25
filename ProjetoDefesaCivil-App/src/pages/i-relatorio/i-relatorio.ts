import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RelatorioService } from '../../services/domain/relatorio.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RuaService } from '../../services/domain/rua.service';
import { RuaDTO } from '../../models/rua.dto';
import { StorageService } from '../../services/storage.service';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { RegiaoDTO } from '../../models/regiao.dto';
import { BairroDTO } from '../../models/bairro.dto';
import { RegiaoService } from '../../services/domain/regiao.service';
import { BairroService } from '../../services/domain/bairro.service';



@IonicPage()
@Component({
  selector: 'page-i-relatorio',
  templateUrl: 'i-relatorio.html',
})
export class IRelatorioPage {

  formGroup: FormGroup;
  regioes: RegiaoDTO[];
  bairros: BairroDTO[];
  ruas: RuaDTO[];
  id_user: string;
  oco_id: string;
  picture: string;
  cameraOn: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public relatorioService: RelatorioService,
    public formBuilder: FormBuilder,
    public ruaService: RuaService,
    public localStorage: StorageService,
    public alertCrtl: AlertController,
    public camera: Camera,
    public regiaoService: RegiaoService,
    public bairroService: BairroService,) {

    this.formGroup = this.formBuilder.group({
      regiao: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      ruaLocal: ['', [Validators.required]],
      numeroLocal: ['', [Validators.required]],
      croqui: ['', [Validators.required]],
      aterro: ['', [Validators.required]],
      pessoasAtingidas: ['', [Validators.required]],
      feridosLeves: ['', [Validators.required]],
      obitos: ['', [Validators.required]],
      laje: ['', [Validators.required]],
      piso: ['', [Validators.required]],
      declividade: ['', [Validators.required]],
      taludeNaturalAltura: ['', [Validators.required]],
      observacao: ['', [Validators.required]],
      funcionario: ['', [Validators.required]],
      ocorrencia: ['', [Validators.required]]

    });



  }

  ionViewDidLoad() {
    this.loadData();
  
  }

  loadData(){

    this.regiaoService.findAll()
    .subscribe(response => {
      this.regioes = response;
      this.formGroup.controls.regiao.setValue(this.regioes[0].id);
      
     
      
      

      let ocorrenciaId = this.navParams.get('ocorrencia_id');
    this.oco_id = ocorrenciaId;
    this.formGroup.controls.ocorrencia.setValue(this.oco_id);

    let varId = this.localStorage.getLocalUser();
    this.id_user = varId.iduser;

    this.formGroup.controls.funcionario.setValue(this.id_user);

    this.formGroup.controls.regiao.setValue(this.regioes[0].id);
        

    


    },
    error => { });
    
  }


  insereRelatorio() {
    this.relatorioService.insert(this.formGroup.value)
      .subscribe(response => {

      this.handleRelatorioInserido();
      },
        error => { });
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

 



 

  handleRelatorioInserido() {
    let alert = this.alertCrtl.create({
      title: 'Relatorio Inserido',
      message: 'Relatorio Inserido  com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  

}
