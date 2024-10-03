import { Roles } from 'src/decorators';
import { CanActivate, ExecutionContext, Injectable, NotAcceptableException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RequestInterface } from './check-auth.guard';

@Injectable()
export class CheckRolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get(Roles, context.getHandler());
        const request = context.switchToHttp().getRequest<RequestInterface>()

        if(!roles.includes(request.role)) {
            throw new NotAcceptableException("User don't have permisson to this endpoint")
        }
        return true
    }
}