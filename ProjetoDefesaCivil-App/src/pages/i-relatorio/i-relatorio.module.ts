import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IRelatorioPage } from './i-relatorio';
import { RuaService } from '../../services/domain/rua.service';
import { Camera } from '@ionic-native/camera';
import { RegiaoService } from '../../services/domain/regiao.service';
import { BairroService } from '../../services/domain/bairro.service';
import { TesteAutocompletePage } from '../teste-autocomplete/teste-autocomplete';

@NgModule({
  declarations: [
    IRelatorioPage,
  ],
  imports: [
    IonicPageModule.forChild(IRelatorioPage),
  ],

  providers:[
  
    RuaService,
    Camera,
    RegiaoService,
    BairroService,
    TesteAutocompletePage
  ]
})
export class IRelatorioPageModule {}
