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
  hora = new Date().toLocaleTimeString();
  id_relatorio: string;
  img1: string;
  img2: string;
  img3: string;
  img4: string;
  url: string;
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
        console.log(this.items);

        this.relatorioService.buscaoUrlsFoto(this.id_relatorio).
          subscribe(response => {
            this.urlFotos = response;
            this.img1 = this.urlFotos[0]
            console.log(this.img1)
          });






      },
        error => { });

  }

  createPdf() {
    var docDefinition = {
      content: [
        { text: 'COMDEC', style: 'header', alignment: 'center' },
        { text: 'COORDENADORIA MUNICIPAL DE DEFESA CIVL', style: 'header', alignment: 'center' },
        { text: 'SÃO JOSÉ DOS CAMPOS', style: 'header', alignment: 'center' },
        { text: 'R.O- Relatorio de Ocorrência', style: 'header', alignment: 'center' },


        { text: 'Relatorio nº ' + this.items.id + "/2018", style: 'header' },
        { text: new Date().toTimeString(), alignment: 'right' },

        { text: 'From-teste', style: 'subheader' },
        { text: this.letterObj.from },

        { text: 'To', style: 'subheader' },
        this.letterObj.to,

        { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },
        {
          image: this.img1,
          width: 100
        },
      
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
            widths: ['*', '*'],

            body: [

              [{ text: "Solicitante " }, { text: "Telefone  ", bold: true }],

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

              [{ text: "Local da Ocorrencia " }, { text: "Numero ", bold: true }],

            ]
          }
        },





      ],

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
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);

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







}













