import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { ReporteService } from './reporte.service';
import { Request, Response } from 'express';

@Controller('reporte')
export class ReporteController {

    constructor(private reportService: ReporteService){}


    @Get('reservacion/:usuarioId')
    async generateReport(@Param() usuarioId: number, @Res() res: Response, @Req() req: Request) {
        try {
            const buffer = await this.reportService.generateReportReservaciones(usuarioId);

            res.set({
                 'Content-Type': 'application/pdf',
                 'Content-Disposition': 'attachment; filename: reservaciones.pdf',
                 'Content-Length': buffer.length,
            })
            res.end(buffer);
        } catch (error) {
            res.status(500).send('Error al generar el reporte')
        }

    }
}
