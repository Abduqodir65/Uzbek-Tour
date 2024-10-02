import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

export class CheckAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>()

        const bearerToken = request.headers["authorization"];
        
        return true;
    }
}