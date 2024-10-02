import { BadRequestException, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Observable } from "rxjs";
import { Protected } from "src/decorators/protected.decorator";

export class CheckAuthGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>()

        const isProtected = this.reflector.get(Protected, context.getHandler())

        const bearerToken = request.headers["authorization"];

        if(!(bearerToken && bearerToken.startsWith("Bearer ") && bearerToken.split("Bearer ")[1]?.length))
        {
            throw new BadRequestException('Please provide valid bearer token');
        }

        // SPLIT ACCESS TOKEN FROM BEARER TOKEN
        const token = bearerToken.split("Bearer ")[1]
        
        return true;
    }
}