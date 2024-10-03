import { Roles } from 'src/decorators';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class CheckRolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get(Roles, context.getHandler());
        const request = context.switchToHttp().getRequest<Request>();

        const { role } = request.body;

        if (!roles?.length) {
            return true;
        }

        if (!role || !roles.includes(role)) {
            return false;
        }

        return true;
    }
}