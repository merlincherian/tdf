import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  body: string;
}

@Injectable()
export class EmailService {
  private transporter: Transporter;
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly configService: ConfigService) {
    // Initialize the transporter in the constructor.  This ensures
    // it's only created once when the service is instantiated.
    this.initTransporter();
  }

  /**
   * Initializes the nodemailer transporter.
   * This method reads email configuration from the NestJS ConfigService.
   */
  private initTransporter() {
    try {
      // Use the config service to get your email credentials.
      //  This is the recommended way to manage configuration in NestJS.
      const host = this.configService.get<string>('EMAIL_HOST');
      const port = this.configService.get<number>('EMAIL_PORT');
      const user = this.configService.get<string>('EMAIL_USER');
      const pass = this.configService.get<string>('EMAIL_PASS');

      if (!host || !port || !user || !pass) {
        this.logger.error('Email configuration is incomplete.  Check your .env file.');
        //  Don't throw an error here, but the email sending will fail.  Consider
        //  throwing an error if you want the application to crash on startup
        //  if the email configuration is invalid.
        return;
      }

      this.transporter = nodemailer.createTransport({
        host: host,
        port: port,
        secure: port === 465, // Use SSL if port is 465
        auth: {
          user: user,
          pass: pass,
        },
      });

      this.logger.log('Email transporter initialized.');
    } catch (error) {
      this.logger.error('Failed to initialize email transporter:', error);
      //  Again, consider throwing the error if you want the application to
      //  crash on startup.
      throw error; // Re-throw the error so that the application can handle it.
    }
  }

  /**
   * Sends an email with the provided options.
   * @param options - The email options (to, subject, body).
   * @returns A Promise that resolves with the email sending result.
   */
  async sendEmail(options: EmailOptions): Promise<any> {
    // Check if the transporter is initialized
    if (!this.transporter) {
      const errorMessage = 'Email transporter is not initialized.  Cannot send email.';
      this.logger.error(errorMessage);
      throw new Error(errorMessage); // Explicitly throw an error
    }

    try {
      const mailOptions = {
        from: this.configService.get<string>('EMAIL_FROM') || 'your-email@example.com', // Fallback, should also be in config
        to: options.to,
        subject: options.subject,
        html: options.body, // Use "html" for HTML emails
      };

      this.logger.log(`Sending email to ${options.to} with subject "${options.subject}"`);
      const result = await this.transporter.sendMail(mailOptions);
      this.logger.log('Email sent successfully:', result);
      return result; //  Return the result for further processing if needed.
    } catch (error) {
      this.logger.error('Error sending email:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }
}

