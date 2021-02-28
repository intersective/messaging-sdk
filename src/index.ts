import Axios from 'axios';
import JWT from 'jsonwebtoken';

export class Messages {
  private static instance: Messages;

  protected service: string;
  protected privateKey: string;
  protected url: string;
  public data: {};

  private constructor(privateKey: string, service: string, url?: string) {
    this.data = {};
    this.service = service;
    this.privateKey = privateKey;
    this.url = url ? url : 'https://messages.practera.com/api';
  }
  public static getInstance(privateKey: string, service: string, url?: string) {
    // Do you need arguments? Make it a regular static method instead.
    return this.instance || (this.instance = new this(privateKey, service, url));
  }

  send(data?: {}) : Promise<any> {
    return new Promise(resolve => {
      Axios.post(this.url, data, {
        timeout: 20000,
        headers: {
          service: this.service,
          'Content-Type': 'application/json',
          Accept: 'application/json',
          apikey: JWT.sign({ role: 'system', uuid: this.service }, this.privateKey, { algorithm: 'RS256' }),
        },
      }).then(response => {
        resolve(response.data);
      });
    });
  }
}
