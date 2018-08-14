import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular/umd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { OcorrenciaService } from '../../services/domain/ocorrencia.service';

import { FuncionarioService } from '../../services/domain/funcionario.service';
import { StorageService } from '../../services/storage.service';
import { FuncionarioDTO } from '../../models/funcionario.dto';
import { TesteAutocompletePage } from '../teste-autocomplete/teste-autocomplete';
import { EnderecoDTO } from '../../models/endereco.dto';
import { EnderecoService } from '../../services/domain/endereco.service';
import { TipoOcorrenciaDTO } from '../../models/tipoOcorrencia.dto';
import { OrigemOcorrenciaDTO } from '../../models/origemOcorenciaDTO';
import { DepartamentoDTO } from '../../models/departamento.dto';




@IonicPage()
@Component({
  selector: 'page-i-ocorrencia',
  templateUrl: 'i-ocorrencia.html',
})
export class IOcorrenciaPage {

 
  formGroup: FormGroup;
ruas:EnderecoDTO[];
  funcionarioDto: FuncionarioDTO;

  id_user: string;
  email: string;
 
  tiposOco:TipoOcorrenciaDTO[];
  origemOco:OrigemOcorrenciaDTO[];
  departamentos:DepartamentoDTO[];
  dep:DepartamentoDTO;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public ocorrenciaService: OcorrenciaService,   
    public ruaService: EnderecoService,
    public storage: StorageService,
    public funcionarioService: FuncionarioService,
    public localStorage: StorageService,
  public alertCrtl: AlertController,
  public modalCtrl: ModalController) {


    this.formGroup = this.formBuilder.group({
      origemOcorrencia: ['', [Validators.required]],
      tipoOcorrencia: ['', [Validators.required]],     
      endereco: ['', [Validators.required]], 
      enderecoLocal:   ['', [Validators.required]], 
      numeroLocal: ['', [Validators.required]],
      historicoInicial: ['', [Validators.required]],
      tipoSolicitante: ['', [Validators.required]],
      endSolicitante: ['', [Validators.required]],
      ruaSol: ['', [Validators.required]],
      nomeSolicitante: ['', [Validators.required]],
      emailSolicitante: ['', [Validators.required, Validators.email]],
      numeroResidenciaSolicitante: ['', [Validators.required]],
      telefoneSolicitante: ['', [Validators.required]],
      telefoneSolicitante2: ['', [Validators.required]],
      funcionario: ['', [Validators.required]],
      departamento:['', [Validators.required]],

    });
  }
  ionViewDidLoad() {
    this.presentModal();
        let varId = this.localStorage.getLocalUser();
        this.id_user=varId.iduser;       

        this.formGroup.controls.funcionario.setValue(this.id_user);
        this.tiposOcorrencia();
        this.origemOcorrencia();
       
       
  }



 



  insereOco() {
    this.ocorrenciaService.insert(this.formGroup.value)
      .subscribe(response => {
        
        this.handleOcorrenciaInserida();
       
      },
        error => {
          this.handleOcorrenciaNaoInserida();
         });
  }


  recuperaFuncionario() {
    let localUser = this.storage.getLocalUser();
    let emailV= this.funcionarioService.findByEmail(localUser.email)
    .subscribe(response=>{

      this.funcionarioDto=response;

    })

  }

  tiposOcorrencia(){

    this.ocorrenciaService.tiposocorrenciaAll().
    subscribe(response=>{
      this.tiposOco=response;

    })
  }

  getDepartamentos(){
    this.ocorrenciaService.departamentos().
    subscribe(response=>{
      this.departamentos=response;
      
      
    })

  }

  getDep(){

    for(let x in this.departamentos){
      if(this.departamentos[x].id=this.formGroup.controls.departamento.value)
      {
        this.dep=this.departamentos[x];
      }
    }
   
    
  }

  chamaRuasSol(){
    for(let x in this.departamentos){
      if(this.departamentos[x].id==this.formGroup.controls.departamento.value)
      {
        this.dep=this.departamentos[x];
        break;
      }
    }
    if(this.formGroup.controls.tipoSolicitante.value==2){
      this.formGroup.controls.ruaSol.setValue(this.dep.rua);
      this.formGroup.controls.endSolicitante.setValue(this.dep.id_rua);
      this.formGroup.controls.emailSolicitante.setValue(this.dep.email);
      this.formGroup.controls.nomeSolicitante.setValue(this.dep.nome);
      this.formGroup.controls.telefoneSolicitante.setValue(this.dep.telefone);
      this.formGroup.controls.telefoneSolicitante2.setValue(this.dep.telefone);
      this.formGroup.controls.numeroResidenciaSolicitante.setValue(this.dep.numeroResidencia);
    }
    else{
      this.presentModal();
    }
  
  }
  origemOcorrencia(){
    this.ocorrenciaService.origemOcorrenciaAll().
    subscribe(response=>{
      this.origemOco=response;
    })
  }
 
  handleOcorrenciaInserida() {
    let alert = this.alertCrtl.create({
      title: 'Ocorrencia Inserida',
      message: 'Ocorrencia Inserida com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler:()=>{
            this.navCtrl.push('MenuPage');
          }
        }
      ]
    });
    alert.present();
  }
  handleOcorrenciaNaoInserida() {
    let alert = this.alertCrtl.create({
      title: 'Ocorrencia Nâo Inserida',
      message: 'Não foi possivel gravar ocorrência',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler:()=>{
            this.navCtrl.push('MenuPage');
          }
        }
      ]
    });
    alert.present();
  }

  initializeItems() {
    this.ruaService.findByEnderecoAll().
    subscribe(response =>{
      this.ruas=response;
      
      
     
    },
    error => { });
    

  }


  send(item,itemNome){

    console.log(item,itemNome);
    
   
    this.insereRuaSol();
    
  }


  presentModal() {
  
    this.navCtrl.push('TesteAutocompletePage');

   
    
  }

  insereRuaSol(){

    let varRua =this.localStorage.getRuaDTO();
    
    
    this.formGroup.controls.ruaSol.setValue(varRua.nome);
    this.formGroup.controls.endSolicitante.setValue(varRua.id);

    
  }

  insereRuaLocal(){

    let varRua =this.localStorage.getRuaDTO();
    
   
    
    this.formGroup.controls.endereco.setValue(varRua.id);
    this.formGroup.controls.enderecoLocal.setValue(varRua.nome);
   
    
  }



}
