import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { variable } from '@angular/compiler/src/output/output_ast';
import { OcorrenciaService } from '../../services/domain/ocorrencia.service';
import { RegiaoService } from '../../services/domain/regiao.service';
import { BairroService } from '../../services/domain/bairro.service';
import { RegiaoDTO } from '../../models/regiao.dto';
import { BairroDTO } from '../../models/bairro.dto';



@IonicPage()
@Component({
  selector: 'page-i-ocorrencia',
  templateUrl: 'i-ocorrencia.html',
})
export class IOcorrenciaPage {

  alertCtrl: any;
  formGroup: FormGroup;
  regioes: RegiaoDTO[];
  bairros:BairroDTO[];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public ocorrenciaService: OcorrenciaService,
    public regiaoService: RegiaoService,
    public bairroService: BairroService) {

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
      funcionario: ['1']

    });
  }
  ionViewDidLoad() {
    this.regiaoService.findAll()
    .subscribe(response =>{
      this.regioes=response;
      this.formGroup.controls.regiao.setValue(this.regioes[0].id);
      this.updateBairros();

    },
  error=>{});
  }


  updateBairros(){
let regiao_id =this.formGroup.value.regiao;
this.bairroService.findByRegiaoId(regiao_id)
.subscribe(response=>{
  this.bairros=response;
  this.formGroup.controls.bairro.setValue(null)
},
error=>{});

}
  
  insereOco() {
    this.ocorrenciaService.insert(this.formGroup.value)
      .subscribe(response => {
        console.log("gravou");
        console.log(response.status);
        if(response.status){
          this.handleOcorrenciaInserida();
        }
        this.navCtrl.setRoot('MenuPage');
      },
        error => { });
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
