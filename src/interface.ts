/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: number;
}

export interface IUpLoad<T = any> {
  mode: string;
  service?: T;
  files?: string[];
  fields?: object;
}

declare module 'nodemailer' {
  interface MailMessageInfo extends SentMessageInfo {
    accepted?: any[];
    rejected?: any[];
    envelopeTime?: number;
    messageTime?: number;
    messageSize?: number;
    response?: string;
    envelope?: {
      form?: string;
      to?: any[];
    };
    messageId?: string;
  }
}
