import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RelatorioService } from '../../services/domain/relatorio.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RuaService } from '../../services/domain/rua.service';
import { RuaDTO } from '../../models/rua.dto';
import { StorageService } from '../../services/storage.service';



@IonicPage()
@Component({
  selector: 'page-i-relatorio',
  templateUrl: 'i-relatorio.html',
})
export class IRelatorioPage {

  formGroup: FormGroup;
  ruas: RuaDTO[];
  id_user: string;
  oco_id: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public relatorioService: RelatorioService,
    public formBuilder: FormBuilder,
    public ruaService: RuaService,
    public localStorage: StorageService,
    public alertCrtl: AlertController) {

    this.formGroup = this.formBuilder.group({
      rua: ['', [Validators.required]],
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

    let ocorrenciaId = this.navParams.get('ocorrencia_id');
    this.oco_id = ocorrenciaId;
    this.formGroup.controls.ocorrencia.setValue(this.oco_id);

    let varId = this.localStorage.getLocalUser();
    this.id_user = varId.iduser;

    this.formGroup.controls.funcionario.setValue(this.id_user);



    this.updateRuaAll();
  }


  insereRelatorio() {
    this.relatorioService.insert(this.formGroup.value)
      .subscribe(response => {

      this.handleRelatorioInserido();
      },
        error => { });
  }

  updateRuaAll() {

    this.ruaService.findByRuaAll()

      .subscribe(response => {
        this.ruas = response;
        this.formGroup.controls.rua.setValue(null)
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
