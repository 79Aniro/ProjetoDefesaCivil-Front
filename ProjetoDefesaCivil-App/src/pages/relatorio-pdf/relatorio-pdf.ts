import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { File } from '@ionic-native/file';
import { RelatorioService } from '../../services/domain/relatorio.service';
import { RelatorioDTO } from '../../models/relatorio.dto';
import { Platform } from 'ionic-angular/platform/platform';
import { FileOpener } from '@ionic-native/file-opener';
import { API_CONFIG } from '../../config/api.config';



@IonicPage()
@Component({
  selector: 'page-relatorio-pdf',
  templateUrl: 'relatorio-pdf.html',
})
export class RelatorioPdfPage {
  items: RelatorioDTO;
  img = new Image;
  urlFotos: string[];
  myIcon: string = "home";
  tramitacao: string;
  tramitacaoCod: string;
  letterObj = {
    to: '',
    from: '',
    text: ''
  }

  cabecalho = {
    sigla: "COMDEC",
    secretaria: 'COORDENADORIA MUNICIPAL DE DEFESA CIVL',
    cidade: "SÃO JOSÉ DOS CAMPOS",
    rel: "R.O- Relatorio de Ocorrência"

  }
  pdfObj = null;
  body = [];
  myDate = new Date().toLocaleDateString();
  hora = new Date().toTimeString().substr(0, 8);
  dia = new Date().getDay();
  mes = new Date().getMonth.toString();

  id_relatorio: string;
  img1: string;
  img2: string;
  img3: string;
  img4: string;
  url: string;
  urlLogo: string;
  teste:string;
  tamanho:number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public relatorioService: RelatorioService,
    private file: File,
    private plt: Platform,
    private fileOpener: FileOpener) {

  }

  ionViewDidLoad() {
    this.id_relatorio = this.navParams.get('id_relatorio');
    this.relatorioService.buscaoRelatoriosIdRel(this.id_relatorio)
      .subscribe(response => {
        this.items = response;


        this.relatorioService.buscaoUrlsFoto(this.id_relatorio).
          subscribe(response => {
            this.urlFotos = response;
            this.tamanho=this.urlFotos.length;
            if(this.tamanho==5){
              this.img1 = 'data:image/jpeg;base64,' + this.urlFotos[0];
              this.img2 = 'data:image/jpeg;base64,' + this.urlFotos[1];
              this.img3 = 'data:image/jpeg;base64,' + this.urlFotos[2];
              this.img4 = 'data:image/jpeg;base64,' + this.urlFotos[3];
              this.urlLogo = 'data:image/jpeg;base64,' + this.urlFotos[4];
            }
            else if(this.tamanho==4){
              this.img1 = 'data:image/jpeg;base64,' + this.urlFotos[0];
              this.img2 = 'data:image/jpeg;base64,' + this.urlFotos[1];
              this.img3 = 'data:image/jpeg;base64,' + this.urlFotos[2];              
              this.urlLogo = 'data:image/jpeg;base64,' + this.urlFotos[3];
            }
            else if(this.tamanho==3){
              this.img1 = 'data:image/jpeg;base64,' + this.urlFotos[0];
              this.img2 = 'data:image/jpeg;base64,' + this.urlFotos[1];                           
              this.urlLogo = 'data:image/jpeg;base64,' + this.urlFotos[2];
            }
        
            else if(this.tamanho==2){
              this.img1 = 'data:image/jpeg;base64,' + this.urlFotos[0];                                     
              this.urlLogo = 'data:image/jpeg;base64,' + this.urlFotos[1];
            }
            else if(this.tamanho==1){                                        
              this.urlLogo = 'data:image/jpeg;base64,' + this.urlFotos[0];
            }

          });






      },
        error => { });

  }

  createPdf() {
    if (this.tamanho == 1) {
      console.log('entrou 1');
      var docDefinition0 = {

        footer: function (currentPage, pageCount) { return { text: 'Rua Saigiro Nakamura, 10- Vila Industrial-São José dos Campos-São Paulo\nCEP:12220-280-Fone/Fax:(012)3913-2926 EMERGENCIA 190- COI', style: 'story', alignment: 'center' } },

        content: [

          {
            table: {

              headerRows: 1,
              widths: [100, 300, 100],

              body:[
                [{ image: this.urlLogo, width: 100, alignment: 'left' },{ text: 'COMDEC\nCOORDENADORIA MUNICIPAL DE DEFESA CIVIL\nSÃO JOSÉ DOS CAMPOS\nR.O- Relatorio de Ocorrência', style: 'header', alignment: 'center' },{ image: this.urlLogo, width: 100, alignment: 'left' },]
              ]
            }
          },





          { text: 'Relatorio nº ' + this.items.id + '/' + this.items.ano, style: 'subheader' },
          { text: this.letterObj.from },

          { text: 'Origem da Ocorrência:  ' + this.items.origemOcorrencia, style: 'subheader' },
          this.letterObj.to,

          { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },


          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*', '*', '*'],

              body: [

                [{ text: "Data " + this.myDate, bold: true }, { text: "Horario " + this.hora, bold: true }, { text: "Relatorio  " + this.id_relatorio + "/2018", bold: true }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [350, '*'],

              body: [

                [{ text: "Solicitante " + this.items.solicitante }, { text: "Telefone  " + this.items.telefone, bold: true }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [350, '*'],

              body: [

                [{ text: "Local da Ocorrencia: \n" + this.items.rua + " Bairro: " + this.items.bairro }, { text: "Numero " + this.items.numeroLocal, bold: true }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*'],

              body: [

                [{ text: "Historico Inicial: \n" + this.items.historicoInicial }],

              ]
            }
          },

          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*'],

              body: [

                [{ text: "Vistoria: \n" + this.items.vistoria }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*'],

              body: [

                [{ text: "Observação: \n" + this.items.observacao }],

              ]
            }
          },


          { text: '\nTramitacao:  ' + this.items.tramitacao_descricao, style: 'footer' },

          { text: 'Concluido por :  \n', style: 'subheader' },




        ],

        pageSize:'A4',
        styles: {
          header: {
            fontSize: 18,
            bold: true,
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 15, 0, 0]
          },
          story: {
            italic: true,
            alignment: 'center',
            width: '50%',
          },
          footer: {
            italic: true,
            width: '50%',
            fontSize: 10,

          }

        }
      }
    }
else if(this.tamanho==2){
  console.log('entrou 2');
      var docDefinition1 = {

        footer: function (currentPage, pageCount) { return { text: 'Rua Saigiro Nakamura, 10- Vila Industrial-São José dos Campos-São Paulo\nCEP:12220-280-Fone/Fax:(012)3913-2926 EMERGENCIA 190- COI', style: 'story', alignment: 'center' } },

        content: [
          {
            table: {

              headerRows: 1,
              widths: [100, 300, 100],

              body:[
                [{ image: this.urlLogo, width: 100, alignment: 'left' },{ text: 'COMDEC\nCOORDENADORIA MUNICIPAL DE DEFESA CIVIL\nSÃO JOSÉ DOS CAMPOS\nR.O- Relatorio de Ocorrência', style: 'header', alignment: 'center' },{ image: this.urlLogo, width: 100, alignment: 'left' },]
              ]
            }
          },
          { text: 'Relatorio nº ' + this.items.id + '/' + this.items.ano, style: 'subheader' },
          { text: this.letterObj.from },

          { text: 'Origem da Ocorrência:  ' + this.items.origemOcorrencia, style: 'subheader' },
          this.letterObj.to,

          { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },


          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*', '*', '*'],

              body: [

                [{ text: "Data " + this.myDate, bold: true }, { text: "Horario " + this.hora, bold: true }, { text: "Relatorio  " + this.id_relatorio + "/2018", bold: true }],

              ]
            }


            
          },

          
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [350, '*'],

              body: [

                [{ text: "Solicitante " + this.items.solicitante }, { text: "Telefone  " + this.items.telefone, bold: true }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [350, '*'],

              body: [

                [{ text: "Local da Ocorrencia: \n" + this.items.rua + " Bairro: " + this.items.bairro }, { text: "Numero " + this.items.numeroLocal, bold: true }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*'],

              body: [

                [{ text: "Historico Inicial: \n" + this.items.historicoInicial }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*',],

              body: [

                [{ image: this.img1, width: 120 }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*'],

              body: [

                [{ text: "Vistoria: \n" + this.items.vistoria }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*'],

              body: [

                [{ text: "Observação: \n" + this.items.observacao }],

              ]
            }
          },
          { text: '\nTramitacao:  ' + this.items.tramitacao_descricao, style: 'footer' },

          { text: 'Concluido por :  \n', style: 'subheader' },




        ],
        pageSize:'A4',
        styles: {
          header: {
            fontSize: 18,
            bold: true,
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 15, 0, 0]
          },
          story: {
            italic: true,
            alignment: 'center',
            width: '50%',
          },
          footer: {
            italic: true,
            width: '50%',
            fontSize: 10,

          }

        }
      }
	
    }
    else
    if(this.tamanho==3){
      console.log('entrou 3');
      var docDefinition2 = {

        footer: function (currentPage, pageCount) { return { text: 'Rua Saigiro Nakamura, 10- Vila Industrial-São José dos Campos-São Paulo\nCEP:12220-280-Fone/Fax:(012)3913-2926 EMERGENCIA 190- COI', style: 'story', alignment: 'center' } },

        content: [
          {
            table: {

              headerRows: 1,
              widths: [100, 300, 100],

              body:[
                [{ image: this.urlLogo, width: 100, alignment: 'left' },{ text: 'COMDEC\nCOORDENADORIA MUNICIPAL DE DEFESA CIVIL\nSÃO JOSÉ DOS CAMPOS\nR.O- Relatorio de Ocorrência', style: 'header', alignment: 'center' },{ image: this.urlLogo, width: 100, alignment: 'left' },]
              ]
            }
          },
          { text: 'Relatorio nº ' + this.items.id + '/' + this.items.ano, style: 'subheader' },
          { text: this.letterObj.from },

          { text: 'Origem da Ocorrência:  ' + this.items.origemOcorrencia, style: 'subheader' },
          this.letterObj.to,

          { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },


          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*', '*', '*'],

              body: [

                [{ text: "Data " + this.myDate, bold: true }, { text: "Horario " + this.hora, bold: true }, { text: "Relatorio  " + this.id_relatorio + "/2018", bold: true }],

              ]
            }


            
          },

          
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [350, '*'],

              body: [

                [{ text: "Solicitante " + this.items.solicitante }, { text: "Telefone  " + this.items.telefone, bold: true }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [350, '*'],

              body: [

                [{ text: "Local da Ocorrencia: \n" + this.items.rua + " Bairro: " + this.items.bairro }, { text: "Numero " + this.items.numeroLocal, bold: true }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*'],

              body: [

                [{ text: "Historico Inicial: \n" + this.items.historicoInicial }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*', '*'],

              body: [

                [{ image: this.img1, width: 120 }, { image: this.img2, width: 120 }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*'],

              body: [

                [{ text: "Vistoria: \n" + this.items.vistoria }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*'],

              body: [

                [{ text: "Observação: \n" + this.items.observacao }],

              ]
            }
          },
          { text: '\nTramitacao:  ' + this.items.tramitacao_descricao, style: 'footer' },

          { text: 'Concluido por :  \n', style: 'subheader' },




        ],
        pageSize:'A4',
        styles: {
          header: {
            fontSize: 18,
            bold: true,
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 15, 0, 0]
          },
          story: {
            italic: true,
            alignment: 'center',
            width: '50%',
          },
          footer: {
            italic: true,
            width: '50%',
            fontSize: 10,

          }

        }
      }
    }
 
   

    else if(this.tamanho == 4){
      console.log('entrou 4');
      var docDefinition3 = {

        footer: function (currentPage, pageCount) { return { text: 'Rua Saigiro Nakamura, 10- Vila Industrial-São José dos Campos-São Paulo\nCEP:12220-280-Fone/Fax:(012)3913-2926 EMERGENCIA 190- COI', style: 'story', alignment: 'center' } },

        content: [
          {
            table: {

              headerRows: 1,
              widths: [100, 300, 100],

              body:[
                [{ image: this.urlLogo, width: 100, alignment: 'left' },{ text: 'COMDEC\nCOORDENADORIA MUNICIPAL DE DEFESA CIVIL\nSÃO JOSÉ DOS CAMPOS\nR.O- Relatorio de Ocorrência', style: 'header', alignment: 'center' },{ image: this.urlLogo, width: 100, alignment: 'left' },]
              ]
            }
          },
          { text: 'Relatorio nº ' + this.items.id + '/' + this.items.ano, style: 'subheader' },
          { text: this.letterObj.from },

          { text: 'Origem da Ocorrência:  ' + this.items.origemOcorrencia, style: 'subheader' },
          this.letterObj.to,

          { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },


          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*', '*', '*'],

              body: [

                [{ text: "Data " + this.myDate, bold: true }, { text: "Horario " + this.hora, bold: true }, { text: "Relatorio  " + this.id_relatorio + "/2018", bold: true }],

              ]
            }


            
          },

          
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [350, '*'],

              body: [

                [{ text: "Solicitante " + this.items.solicitante }, { text: "Telefone  " + this.items.telefone, bold: true }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [350, '*'],

              body: [

                [{ text: "Local da Ocorrencia: \n" + this.items.rua + " Bairro: " + this.items.bairro }, { text: "Numero " + this.items.numeroLocal, bold: true }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*'],

              body: [

                [{ text: "Historico Inicial: \n" + this.items.historicoInicial }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*', '*', '*',],

              body: [

                [{ image: this.img1, width: 130 }, { image: this.img2, width: 130 }, { image: this.img3, width: 130 }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*'],

              body: [

                [{ text: "Vistoria: \n" + this.items.vistoria }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*'],

              body: [

                [{ text: "Observação: \n" + this.items.observacao }],

              ]
            }
          },
          { text: '\nTramitacao:  ' + this.items.tramitacao_descricao, style: 'footer' },

          { text: 'Concluido por :  \n', style: 'subheader' },




        ],
        pageSize:'A4',
        styles: {
          header: {
            fontSize: 18,
            bold: true,
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 15, 0, 0]
          },
          story: {
            italic: true,
            alignment: 'center',
            width: '50%',
          },
          footer: {
            italic: true,
            width: '50%',
            fontSize: 10,

          }

        }
      }
    }



    else if(this.tamanho==5) {
      console.log('entrou 5');
      var docDefinition4 = {
       
        footer: function (currentPage, pageCount) { return { text: 'Rua Saigiro Nakamura, 10- Vila Industrial-São José dos Campos-São Paulo\nCEP:12220-280-Fone/Fax:(012)3913-2926 EMERGENCIA 190- COI', style: 'story', alignment: 'center' } },

        content: [
          {
            table: {

              headerRows: 1,
              widths: [100, 300, 100],

              body:[
                [{ image: this.urlLogo, width: 100, alignment: 'left' },{ text: 'COMDEC\nCOORDENADORIA MUNICIPAL DE DEFESA CIVIL\nSÃO JOSÉ DOS CAMPOS\nR.O- Relatorio de Ocorrência', style: 'header', alignment: 'center' },{ image: this.urlLogo, width: 100, alignment: 'left' },]
              ]
            }
          },
          { text: 'Relatorio nº ' + this.items.id + '/' + this.items.ano, style: 'subheader' },
          { text: this.letterObj.from },

          { text: 'Origem da Ocorrência:  ' + this.items.origemOcorrencia, style: 'subheader' },
          this.letterObj.to,

          { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },


          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*', '*', '*'],

              body: [

                [{ text: "Data " + this.myDate, bold: true }, { text: "Horario " + this.hora, bold: true }, { text: "Relatorio  " + this.id_relatorio + "/2018", bold: true }],

              ]
            }


            
          },

          
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [350, '*'],

              body: [

                [{ text: "Solicitante " + this.items.solicitante }, { text: "Telefone  " + this.items.telefone, bold: true }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [350, '*'],

              body: [

                [{ text: "Local da Ocorrencia: \n" + this.items.rua + " Bairro: " + this.items.bairro }, { text: "Numero " + this.items.numeroLocal, bold: true }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*'],

              body: [

                [{ text: "Historico Inicial: \n" + this.items.historicoInicial }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*', '*', '*', '*'],

              body: [

                [{ image: this.img1, width: 120 }, { image: this.img2, width: 120 }, { image: this.img3, width: 120 }, { image: this.img4, width: 120 }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*'],

              body: [

                [{ text: "Vistoria: \n" + this.items.vistoria }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*'],

              body: [

                [{ text: "Observação: \n" + this.items.observacao }],

              ]
            }
          },
          { text: '\nTramitacao:  ' + this.items.tramitacao_descricao, style: 'footer' },

          { text: 'Concluido por :  \n', style: 'subheader' },




        ],
        pageSize:'A4',
        styles: {
          header: {
            fontSize: 18,
            bold: true,
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 15, 0, 0]
          },
          story: {
            italic: true,
            alignment: 'center',
            width: '50%',
          },
          footer: {
            italic: true,
            width: '50%',
            fontSize: 10,

          }

        }
      }
    }


    if (this.tamanho == 1) {
      this.pdfObj = pdfMake.createPdf(docDefinition0);
    }
    else if(this.tamanho==2){
      this.pdfObj = pdfMake.createPdf(docDefinition1);
    }
    else if(this.tamanho==3){
      this.pdfObj = pdfMake.createPdf(docDefinition2);
    }
    else if(this.tamanho==4){
      this.pdfObj = pdfMake.createPdf(docDefinition3);
    }
    else {
      this.pdfObj = pdfMake.createPdf(docDefinition4);
    }


  }

  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }



  updateTramitacao() {



  }



}













