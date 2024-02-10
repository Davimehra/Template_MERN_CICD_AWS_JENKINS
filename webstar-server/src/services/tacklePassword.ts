import { randomBytes, scrypt } from "crypto";

import { promisify } from 'util';

const asyncHash = promisify(scrypt);

export class TacklePassword {
    static async convertToHash(password: string) {
        const salt = randomBytes(8).toString('hex');
        const buff = (await asyncHash(password, salt, 120)) as Buffer;

        // return bufferConvertedHex.salt
        return `${buff.toString('hex')}.${salt}`

    }

    static async comparePassword(storedPassword: string, password: string) {
        const [hashedPassword, salt] = storedPassword.split('.');
        const buff = (await asyncHash(password, salt, 120)) as Buffer;

        return buff.toString('hex') == hashedPassword;
    }
}



