import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InsereFotoPage } from './insere-foto';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    InsereFotoPage,
  ],
  imports: [
    IonicPageModule.forChild(InsereFotoPage),
  ],
  providers:[
  
  
    Camera
  ]
})
export class InsereFotoPageModule {}
