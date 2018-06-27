import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IOcorrenciaPage } from './i-ocorrencia';
import { RegiaoService } from '../../services/domain/regiao.service';
import { BairroService } from '../../services/domain/bairro.service';
import { RuaService } from '../../services/domain/rua.service';
import { TesteAutocompletePage } from '../teste-autocomplete/teste-autocomplete';

@NgModule({
  declarations: [
    IOcorrenciaPage,
  ],
  imports: [
    IonicPageModule.forChild(IOcorrenciaPage),
    
  ],
  providers:[
    RegiaoService,
    BairroService,
    RuaService,
    TesteAutocompletePage
  ]
})
export class IOcorrenciaPageModule {}
