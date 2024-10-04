import { Injectable } from "@nestjs/common";
import { User } from "../users";

@Injectable()
export class AuthService {
    constructor(private readonly usermodel: User) { }

    async login() { }

    async register() { }

    async logout() { }

    async refresh() { }

}