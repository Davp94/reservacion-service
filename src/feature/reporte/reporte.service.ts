import { Injectable } from '@nestjs/common';
import { ReservacionService } from '../reservacion/service/reservacion.service';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

@Injectable()
export class ReporteService {
    
    constructor(private reservacionService: ReservacionService){}

    //TODO retrieve file && convert to base64
    async generateReportReservaciones(usuarioId: number): Promise<PDFKit.PDFDocument> {
        const dataReservaciones = await this.reservacionService.getAllReservacionByUsuario(usuarioId);
        const fonts = {
            Roboto: {
                normal: "fonts/Roboto/Roboto-Regular.ttf",
                bold: "fonts/Roboto/Roboto-Medium.ttf",
                italics: "fonts/Roboto/Roboto-Italic.ttf"
            }
        }

        const printer = new PdfPrinter(fonts);

        const docDefinition: TDocumentDefinitions = {
            pageSize: 'LETTER',
            pageMargins: [40, 60, 40, 60],
            header: {
                margin: [40, 20, 40 ,20],
                columns: [
                    {
                        text: 'MIS RESERVACIONES',
                        fontSize: 20,
                        alignment: 'center',
                        bold: true,
                        marginRight: 20,
                    },
                    {
                        image: ``,
                        width: 100,
                        alignment: 'right'
                    }
                ]
            },
            content: [
                {
                    text: 'Reporte de actividades de las reservaciones realizadas',
                    style: '',

                },
                {},
                this.createTable()
            ],
            footer: []
        }
        return printer.createPdfKitDocument(docDefinition); 
    }

    async createTable(){}
}
