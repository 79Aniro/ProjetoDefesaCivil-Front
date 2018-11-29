import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IRelatorioPage } from './i-relatorio';
import { Camera } from '@ionic-native/camera';
import { EnderecoService } from '../../services/domain/endereco.service';

@NgModule({
  declarations: [
    IRelatorioPage,
  ],
  imports: [
    IonicPageModule.forChild(IRelatorioPage),
  ],


})
export class IRelatorioPageModule {}
