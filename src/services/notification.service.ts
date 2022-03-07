/* eslint-disable @typescript-eslint/no-explicit-any */
import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys} from '../config/keys';

const sgMail = require('@sendgrid/mail');

@injectable({scope: BindingScope.TRANSIENT})
export class NotificationService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * notification by email
   */
  sendEmail(destinatary: string, subject: string, body: string) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: destinatary, // Change to your recipient
      from: Keys.emailFrom, // Change to your verified sender
      subject: subject,
      html: body,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
}
