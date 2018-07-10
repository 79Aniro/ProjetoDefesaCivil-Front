import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { OcorrenciaService } from '../../services/domain/ocorrencia.service';

import { FuncionarioService } from '../../services/domain/funcionario.service';
import { StorageService } from '../../services/storage.service';
import { FuncionarioDTO } from '../../models/funcionario.dto';
import { TesteAutocompletePage } from '../teste-autocomplete/teste-autocomplete';
import { EnderecoDTO } from '../../models/endereco.dto';
import { EnderecoService } from '../../services/domain/endereco.service';




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
      ruaLocalidade: ['', [Validators.required]],
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
      funcionario: ['', [Validators.required]]

    });
  }
  ionViewDidLoad() {
    this.presentModal();;
        let varId = this.localStorage.getLocalUser();
        this.id_user=varId.iduser;       

        this.formGroup.controls.funcionario.setValue(this.id_user);
  }




 



  insereOco() {
    this.ocorrenciaService.insert(this.formGroup.value)
      .subscribe(response => {
        
        this.handleOcorrenciaInserida();
       
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


  initializeItems() {
    this.ruaService.findByEnderecoAll().
    subscribe(response =>{
      this.ruas=response;
      
      
     
    },
    error => { });
    

  }

  getItems(ev: any) {
    // Reset items back to all of the items
    
    
    // set val to the value of the searchbar
    const val = ev.target.value;
   
    
    

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.ruas = this.ruas.filter((rua) => {
        
        return (this.ruaService.getRuaNome(rua).toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else{
      this.initializeItems();
    }
   
    
   
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
    
    
    this.formGroup.controls.ruaLocalidade.setValue(varRua.nome);
    this.formGroup.controls.endereco.setValue(varRua.id);
    
  }



}
