import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    public localStorage: StorageService) {

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
    this.id_user=varId.iduser;       

    this.formGroup.controls.funcionario.setValue(this.id_user);

  
    
    this.updateRuaAll();
  }


  insereRelatorio() {
    this.relatorioService.insert(this.formGroup.value)
      .subscribe(response => {

        console.log(response.status);
        if (response.status) {
          console.log("gravou");
        }
        this.navCtrl.setRoot('MenuPage');
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

}
