import {  BadRequestException, CanActivate, ConflictException, ExecutionContext, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JsonWebTokenError, JwtService, NotBeforeError, TokenExpiredError } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
import { Protected } from "src/decorators/protected.decorator";

export declare interface RequestInterface extends Request {
    userId: string | undefined,
    role: string | undefined
}

@Injectable()
export class CheckAuthGuard implements CanActivate {
    constructor(private reflector: Reflector, private jwtService:JwtService,private configService:ConfigService) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<RequestInterface>()

        const isProtected = this.reflector.get(Protected, context.getHandler())

        const bearerToken = request.headers["authorization"];

        if(!(bearerToken && bearerToken.startsWith("Bearer ") && bearerToken.split("Bearer ")[1]?.length))
        {
            throw new BadRequestException('Please provide valid bearer token');
        }

        const token = bearerToken.split("Bearer ")[1]
        
        try {
            this.jwtService.verify(token, {secret:this.configService.get<string>('jwt.accessKey')})
        } catch (error) {
            if( error instanceof TokenExpiredError )
            {
                throw new UnprocessableEntityException(error.message)
            }
            if( error instanceof NotBeforeError )
            {
                throw new ConflictException(error.message)
            }
            if( error instanceof JsonWebTokenError )
            {
                throw new BadRequestException(error.message)
            }
        }
        const userDecodedData = this.jwtService.decode(token)
        request.userId = userDecodedData?.userId
        request.role = userDecodedData?.role
        return true;
    }
}