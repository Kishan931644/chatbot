import { launch } from 'puppeteer';
import { promises as fs } from 'fs';
import * as cheerio from 'cheerio';

export default async function fetchData(url) {
    const browser = await launch();
    const page = await browser.newPage();

    await page.goto(url, {
        waitUntil: 'networkidle0',
    });

    const html = await page.content();

    // await fs.writeFile('reactstorefront.html', html);

    await browser.close();
    return html;
}
