import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
import { Protected } from "src/decorators/protected.decorator";

@Injectable()
export class CheckAuthGuard implements CanActivate {
    constructor(private reflector: Reflector, private jwtService:JwtService,private configService:ConfigService) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>()

        const isProtected = this.reflector.get(Protected, context.getHandler())

        const bearerToken = request.headers["authorization"];

        if(!(bearerToken && bearerToken.startsWith("Bearer ") && bearerToken.split("Bearer ")[1]?.length))
        {
            throw new BadRequestException('Please provide valid bearer token');
        }

        const token = bearerToken.split("Bearer ")[1]
        

        this.jwtService.verify(token, {secret:this.configService.get<string>('jwt.accessKey')})
        
        return true;
    }
}