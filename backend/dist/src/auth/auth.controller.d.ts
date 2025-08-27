import { AuthService } from './auth.service';
declare class LoginDto {
    username: string;
    password: string;
}
declare class RefreshDto {
    refreshToken: string;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(_body: LoginDto, req: any): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: any;
            username: any;
            display_name: any;
            role: any;
        };
    }>;
    refresh(body: RefreshDto): Promise<{
        accessToken: string;
    }>;
}
export {};
