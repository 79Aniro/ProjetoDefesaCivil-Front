import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RelatorioPdfPage } from './relatorio-pdf';
import{File} from '@ionic-native/file';
import{FileOpener} from '@ionic-native/file-opener';

@NgModule({
  declarations: [
    RelatorioPdfPage,
  ],
  imports: [
    IonicPageModule.forChild(RelatorioPdfPage),
  ],
})
export class RelatorioPdfPageModule {}
