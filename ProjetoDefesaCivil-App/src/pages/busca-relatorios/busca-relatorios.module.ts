import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuscaRelatoriosPage } from './busca-relatorios';

@NgModule({
  declarations: [
    BuscaRelatoriosPage,
  ],
  imports: [
    IonicPageModule.forChild(BuscaRelatoriosPage),
  ],
})
export class BuscaRelatoriosPageModule {}
