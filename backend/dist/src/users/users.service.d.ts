import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByUsername(username: string): Promise<any>;
    validatePassword(password: string, passwordHash: string): Promise<boolean>;
}
