import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RelatorioService } from '../../services/domain/relatorio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnderecoService } from '../../services/domain/endereco.service';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';
import { RelatorioDTO } from '../../models/relatorio.dto';



@IonicPage()
@Component({
  selector: 'page-update-relatorio',
  templateUrl: 'update-relatorio.html',
})
export class UpdateRelatorioPage {

  formGroup: FormGroup;
  relatorio:RelatorioDTO;
  id_relatorio: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public relatorioService: RelatorioService,
    public formBuilder: FormBuilder,
    public ruaService: EnderecoService,
    public localStorage: StorageService,
    public alertCrtl: AlertController,
    public auth: AuthService) {

    this.formGroup = this.formBuilder.group({
      endereco: ['', [Validators.required]],  
      
      vistoria: ['', [Validators.required]],
      observacao: ['', [Validators.required]],
      funcionario: ['', [Validators.required]],
      ocorrencia: ['', [Validators.required]]

    });



  }
  ionViewDidLoad() {
    this.id_relatorio = this.navParams.get('id_relatorio');
    this.relatorioService.buscaoRelatoriosIdRel(this.id_relatorio)
      .subscribe(response => {
        this.relatorio = response;      
        this.formGroup.controls.vistoria.setValue(this.relatorio.vistoria);
        this.formGroup.controls.observacao.setValue(this.relatorio.observacao);

      },
        error => { });

  }

  insereRelatorio() {
    this.relatorio.vistoria=this.formGroup.value.vistoria;
    this.relatorio.observacao=this.formGroup.value.observacao;
    this.relatorioService.update(this.relatorio)
      .subscribe(response => {

      this.handleRelatorioInserido();
      },
        error => {
          this.handleRelatorioNaoInserido();
         });
  }


  handleRelatorioInserido() {
    let alert = this.alertCrtl.create({
      title: 'Relatorio Atualizado',
      message: 'Relatorio Atualizado com sucesso',
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



  handleRelatorioNaoInserido() {
    let alert = this.alertCrtl.create({
      title: 'Relatorio Não Atualizado',
      message: 'Relatorio Não Foi Atualizado',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
         
          handler: () => {
            this.navCtrl.setRoot('MenuPage');
          }
        }
      ],
      cssClass: 'alertDanger'
    });
    alert.present();
    
  }

}
