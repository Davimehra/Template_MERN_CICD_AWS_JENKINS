import { SignOptions } from 'jsonwebtoken'

class CookiesConfig {
    static todayDate: Date = new Date();
    static expireDays: number = 1;
    signed: boolean = false;
    secure: boolean = !["test", "dev"].includes(process?.env?.NODE_ENV!) // "test" and "dev" as http and "prod" as https
    expires: Date = new Date(CookiesConfig.todayDate.setDate(CookiesConfig.todayDate.getDate() + CookiesConfig.expireDays));
    sameSite: boolean | "strict" | "lax" | "none" | undefined = false    // Default False , if true = 'strict'
    constructor() {
    }
}
const cookiesConfig = new CookiesConfig();


const UserJwtAccessSignOptions: SignOptions = {
    expiresIn: '10s'
}
const UserJwtRefreshSignOptions: SignOptions = {
    expiresIn: '3600s'
}

const AdminJwtSignOptions: SignOptions = {
    expiresIn: '10s'
}




export { cookiesConfig, UserJwtAccessSignOptions, UserJwtRefreshSignOptions, AdminJwtSignOptions };

