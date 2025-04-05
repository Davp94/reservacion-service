import { Injectable } from '@nestjs/common';
import { ReservacionService } from '../reservacion/service/reservacion.service';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { ReservacionResponseDto } from '../reservacion/dto/reservacion.response.dto';
import { text } from 'stream/consumers';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class ReporteService {
    
    constructor(private reservacionService: ReservacionService){}

    async generateReportReservaciones(usuarioId: number): Promise<PDFKit.PDFDocument> {
        const dataReservaciones = await this.reservacionService.getAllReservacionByUsuario(usuarioId);
        const fonts = {
            Roboto: {
                normal: "fonts/Roboto/Roboto-Regular.ttf",
                bold: "fonts/Roboto/Roboto-Medium.ttf",
                italics: "fonts/Roboto/Roboto-Italic.ttf"
            }
        }

        const logo = path.join(__dirname, './assets/nestjs.jpg');
        const logoBase64 = await this.getImageOnBase64(logo);

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
                        image: `data:image/jpg;base64,${logoBase64}`,
                        width: 100,
                        alignment: 'right'
                    }
                ]
            },
            content: [
                {
                    text: 'Reporte de actividades de las reservaciones realizadas',
                    style: '',
                    margin: [0, 20, 0, 20]
                },
                {
                    text: `Fecha de creacion ${new Date().toLocaleDateString()}`,
                    alignment: 'right',
                    margin: [0, 0, 0, 20]
                },
                this.createTable(dataReservaciones),
            ],
            footer: []
        }
        return printer.createPdfKitDocument(docDefinition); 
    }

    createTable(data: ReservacionResponseDto[]){
        const body: any = [
            { text: 'Empresa', style: 'tableHeader'},
            { text: 'Comentario', style: 'tableHeader'},
            { text: 'Fecha', style: 'tableHeader'},
            { text: 'Hora Inicio', style: 'tableHeader'},
            { text: 'Hora Fin', style: 'tableHeader'},
            { text: 'Estado', style: 'tableHeader'}
        ]
        
        data.forEach(reservacion => {
            body.push([
                reservacion.horario.empresaId,
                reservacion.comentario,
                reservacion.horario.fecha,
                reservacion.horario.hora_inicio,
                reservacion.horario.hora_fin,
                this.getEstadoValue(reservacion.horario.estado),
            ])
        })
        return {
            table: {
                headerRows: 1,
                widths: ['15%', '25%', '15%', '15%', '15%', '15%'],
                body: body,
            }
        }
    }

    private getEstadoValue(estado: number): string {
        const estadoMap = {
            0: 'Cancelado',
            1: 'Registrado',
            2: 'Completado',
            3: 'Cancelado'
        }

        return estadoMap[estado]
    }

    async getImageOnBase64(logo: string): Promise<string>{
        const imageBuffer = fs.readFileSync(logo);
        return imageBuffer.toString('base64');
    }
}
