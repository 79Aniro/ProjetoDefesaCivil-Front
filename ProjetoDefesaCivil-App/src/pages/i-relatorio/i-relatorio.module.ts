import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IRelatorioPage } from './i-relatorio';

@NgModule({
  declarations: [
    IRelatorioPage,
  ],
  imports: [
    IonicPageModule.forChild(IRelatorioPage),
  ],
})
export class IRelatorioPageModule {}
