import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OcorrenciaService } from '../services/domain/ocorrencia.service';
import { RelatorioService } from '../services/domain/relatorio.service';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { FuncionarioService } from '../services/domain/funcionario.service';
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';
import { ImageUtilService } from '../services/image-util.service';
import { InsereFotoPage } from '../pages/insere-foto/insere-foto';



import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { EnderecoService } from '../services/domain/endereco.service';
import { MenuRelatorioPage } from '../pages/menu-relatorio/menu-relatorio';
import { EsqueciSenhaPage } from '../pages/esqueci-senha/esqueci-senha';
import { MudarSenhaPage } from '../pages/mudar-senha/mudar-senha';
import { UpdateRelatorioPage } from '../pages/update-relatorio/update-relatorio';
import { IOcorrenciaPage } from '../pages/i-ocorrencia/i-ocorrencia';
import { OcorrenciasAbertasAgentePage } from '../pages/ocorrencias-abertas-agente/ocorrencias-abertas-agente';








@NgModule({
  declarations: [
    MyApp,
   




  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
   
    
 
   

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    



  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    OcorrenciaService,
    AuthInterceptorProvider,
    RelatorioService,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    FuncionarioService,
    ImageUtilService,
    InsereFotoPage,
    IOcorrenciaPage,
    File,
    FileOpener,
    FileTransfer,
    FileTransferObject,
    EnderecoService,
    MenuRelatorioPage,
    EsqueciSenhaPage,
    MudarSenhaPage,
    UpdateRelatorioPage,   
    OcorrenciasAbertasAgentePage
    
    
   
 






  ]
})

export class AppModule { }