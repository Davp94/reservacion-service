import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dto/auth.request.dto';
import { AuthResponseDto } from './dto/auth.response.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post()
    async login(@Body() authRequestDto: AuthRequestDto): Promise<AuthResponseDto> {
        return await this.authService.authUser(authRequestDto);
    }
}
