import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { OcorrenciaService } from '../../services/domain/ocorrencia.service';

import { FuncionarioService } from '../../services/domain/funcionario.service';
import { StorageService } from '../../services/storage.service';
import { FuncionarioDTO } from '../../models/funcionario.dto';
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
  ruasSol:EnderecoDTO[];
  funcionarioDto: FuncionarioDTO;
desabilitador:boolean=false;
  id_user: string;
  email: string;
 val:any;
 valSol:any;
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
  public modalCtrl: ModalController,
  public loadingCtrl: LoadingController) {

    this.formGroup = this.formBuilder.group({
      origemOcorrencia: ['', [Validators.required]],
      tipoOcorrencia: ['', [Validators.required]],     
      endereco: ['', [Validators.required]],     
      numeroLocal: ['', [Validators.required]],
      historicoInicial: ['', [Validators.required]],
      tipoSolicitante: ['', [Validators.required]],
      endSolicitante: ['', [Validators.required]],      
      nomeSolicitante: ['', [Validators.required]],
      emailSolicitante: ['', [Validators.required, Validators.email]],
      numeroResidenciaSolicitante: ['', [Validators.required]],
      telefoneSolicitante: ['', [Validators.required]],
      telefoneSolicitante2: ['', [Validators.required]],
      funcionario: ['', [Validators.required]],
      departamento:[''],

    });
  }
  ionViewDidLoad() {
   // this.presentModal();
        let varId = this.localStorage.getLocalUser();//recuperando o usuario logado
        this.id_user=varId.iduser;// recuperando o id do usuario logado    
        this.formGroup.controls.funcionario.setValue(this.id_user);//associando o funcionario a nova ocorrencia
       // this.tiposOcorrencia();//recuperando os tipos de ocorrencia para preencher a lista de opções
      //  this.origemOcorrencia();//recuperandoos tipos de origem  de ocorrencia para preencher a lista de opções
       this.initializeItems();
       
  }

  insereOco() {
    this.ocorrenciaService.insert(this.formGroup.value)//inserindo ocorrencia
      .subscribe(response => {        
        this.handleOcorrenciaInserida();// mensagem que ocorrencia foi inserida       
      },
        error => {
          this.handleOcorrenciaNaoInserida();// mensagem que ocorrencia não foi inserida
         });
  }


 
// Função que chama o servico que busca todos os tipos de ocorrencias
  tiposOcorrencia(){

    this.ocorrenciaService.tiposocorrenciaAll().
    subscribe(response=>{
      this.tiposOco=response;

    })
  }

  //Funcao que chama o serviço que busca todos os departamentos
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
    if(this.formGroup.controls.tipoSolicitante.value==2){//quando o solicitante é um departamento
      
      this.formGroup.controls.endSolicitante.setValue(this.dep.id_rua);
      this.formGroup.controls.emailSolicitante.setValue(this.dep.email);
      this.formGroup.controls.nomeSolicitante.setValue(this.dep.nome);
      this.formGroup.controls.telefoneSolicitante.setValue(this.dep.telefone);
      this.formGroup.controls.telefoneSolicitante2.setValue(this.dep.telefone);
      this.formGroup.controls.numeroResidenciaSolicitante.setValue(this.dep.numeroResidencia);
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
    this.ruas=this.localStorage.getRuasDTO();//recupera o array de endereco do localstorage
    this.ruasSol=this.ruas;
    this.departamentos=this.localStorage.getDepartamentos();
    this.tiposOco=this.localStorage.getTipoOcorrencia();
    this.origemOco=this.localStorage.getOrigemOcorrencia();

  }
  initializeItems2() {
    this.ruasSol=this.localStorage.getRuasDTO();//recupera o array de endereco do localstorage
   

  }

recuperaRuaLocal(){

   var x =this.formGroup.controls.endereco.value;
   this.formGroup.controls.endereco.setValue(x)
}

insereRuaLocal(ruaid,ruanome){

  this.formGroup.controls.endereco.setValue(ruaid);
  this.formGroup.controls.enderecoLocal.setValue(ruanome);

}

   

  getItems(ev: any) {
    // Reset items back to all of the items
    
    
    // set val to the value of the searchbar
    
   
    this.val = ev.target.value;
    

    // if the value is an empty string don't filter the items
    if (this.val && this.val.trim() != '') {
      
      this.ruas = this.ruas.filter((rua) => {
       
        return (this.ruaService.getRuaNome(rua).toLowerCase().indexOf(this.val.toLowerCase()) > -1);
      })
    }
    
    else{
     this.initializeItems();
    }
   
    
   
  }

 
  getItemsSol(zx: any) {
    // Reset items back to all of the items
    
    
    // set val to the value of the searchbar
    
   
    this.valSol = zx.target.value;
    

    // if the value is an empty string don't filter the items
    if (this.valSol && this.valSol.trim() != '') {
      
      this.ruasSol = this.ruasSol.filter((rua) => {
       
        return (this.ruaService.getRuaNome(rua).toLowerCase().indexOf(this.valSol.toLowerCase()) > -1);
      })
    }
    
    else{
     this.initializeItems2();
    }
   
    
   
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    return loader;
  }


}
