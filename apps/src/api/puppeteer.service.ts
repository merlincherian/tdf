import { Injectable, OnModuleDestroy, Res } from '@nestjs/common';
import { Browser, Page } from 'puppeteer';
import * as puppeteer from 'puppeteer';
import { Response } from 'express'; // Import Response from express
import * as fs from 'fs'; // Import the fs module

@Injectable()
export class PuppeteerService implements OnModuleDestroy {
  private browser: Browser | null = null;

  async launchBrowser(): Promise<Browser> {
    if (!this.browser) {
      this.browser = await puppeteer.launch({ headless: true }); // Correct: Use true for headless mode
    }
    return this.browser;
  }

  async generatePdf(
    htmlContent: string,
    @Res() res?: Response,
  ): Promise<Buffer> {
    // Make res optional
    const browser = await this.launchBrowser();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdfBuffer = (await page.pdf({
      format: 'A4',
      printBackground: true,
    })) as Buffer; // Add this cast to Buffer
    await page.close();
    // If no response object is provided (e.g., in a cron job), save to a file
    const filePath = 'tdf-contract.pdf'; // Choose a filename and path
    fs.writeFileSync(filePath, pdfBuffer);
    console.log(`PDF saved to ${filePath}`);
    return pdfBuffer; //  Added return

    return pdfBuffer;
  }

  async onModuleDestroy() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}
