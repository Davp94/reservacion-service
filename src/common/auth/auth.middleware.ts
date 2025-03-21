import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if(req.headers.authorization){
      const token = req.headers.authorization;
    }else {
      throw new UnauthorizedException("NO EXISTE TOKEN DE AUTENTICACION");
    }
    next();
  }
}
