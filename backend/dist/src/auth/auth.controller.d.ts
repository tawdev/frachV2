import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(signInDto: Record<string, any>): Promise<{
        access_token: string;
        admin: {
            id: number;
            username: string;
            email: string | null;
        };
    }>;
}
