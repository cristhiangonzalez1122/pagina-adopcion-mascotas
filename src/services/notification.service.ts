/* eslint-disable @typescript-eslint/no-explicit-any */
import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys} from '../config/keys';

const sgMail = require('@sendgrid/mail');
const twilio = require('twilio');

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

  sendSms(destinataryPhone: string, sms: string) {
    try {
      const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
      const authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console

      const client = new twilio(accountSid, authToken);

      client.messages
        .create({
          body: sms,
          to: destinataryPhone, // Text this number
          from: Keys.twilioSender, // From a valid Twilio number
        })
        .then((message: any) => {
          console.log(message.sid);
          return true;
        });
      return true;
    } catch {
      return false;
    }
  }
}
