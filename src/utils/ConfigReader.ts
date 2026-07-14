import dotenv from 'dotenv';

dotenv.config({
    path: 'src/config/qa.env'
});

export class ConfigReader {

    static get(key: string): string {

        const value = process.env[key];

        if (!value) {
            throw new Error(`${key} not found in qa.env`);
        }

        return value.trim();
    }
}