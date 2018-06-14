import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IRelatorioPage } from './i-relatorio';
import { RuaService } from '../../services/domain/rua.service';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    IRelatorioPage,
  ],
  imports: [
    IonicPageModule.forChild(IRelatorioPage),
  ],

  providers:[
  
    RuaService,
    Camera
  ]
})
export class IRelatorioPageModule {}
