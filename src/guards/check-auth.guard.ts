import { BadRequestException, CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

export class CheckAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>()

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