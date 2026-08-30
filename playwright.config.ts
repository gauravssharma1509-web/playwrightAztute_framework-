import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({
    path: 'src/config/qa.env'
});

console.log("BASE_URL =", process.env.BASE_URL);

export default defineConfig({

    testDir: './src/tests',

    timeout: Number(process.env.TIMEOUT) || 30000,

    expect: {
        timeout: 10000
    },

    fullyParallel: false,

    forbidOnly: !!process.env.CI,

    retries: process.env.CI ? 2 : 0,

    workers: 1,

    reporter: [
        ['list'],
        ['html', { open: 'never' }],
        ['allure-playwright']
    ],

    use: {


        baseURL: process.env.BASE_URL,


        browserName: (process.env.BROWSER as
            | 'chromium'
            | 'firefox'
            | 'webkit') || 'chromium',

        headless: process.env.HEADLESS === 'true',


        launchOptions: {
            args: ['--start-maximized']
        },


        viewport: null,


        ignoreHTTPSErrors: true,


        actionTimeout: 30000,

        navigationTimeout: 30000,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure'
    }

});