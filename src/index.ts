import Axios from 'axios';
import JWT from 'jsonwebtoken';
import logger from '@dazn/lambda-powertools-logger';

export class Messages {
  private static privateInstance: Messages | null;

  protected service: string;
  protected privateKey: string;
  protected url: string;
  public data: {};

  private constructor(privateKey: string, service: string, url?: string) {
    this.data = {};
    this.service = service;
    this.privateKey = privateKey.includes('\\n') ? JSON.parse(privateKey) : privateKey;
    this.url = url || 'https://messages.practera.com/api';
  }

  public static create(privateKey: string, service: string, url?: string) {
    if (!this.privateInstance) {
      this.privateInstance = new this(privateKey, service, url);
    }
    return this.privateInstance;
  }

  public static get instance(): Messages {
    if (this.privateInstance == null) {
      throw new Error('You have to create an instance before using it.');
    }
    return this.privateInstance;
  }

  public static delete() {
    this.privateInstance = null;
  }

  async send(data?: {}): Promise<any> {
    try {
      const response = await Axios.post(this.url, data, {
        timeout: 20000,
        headers: {
          service: this.service,
          'Content-Type': 'application/json',
          Accept: 'application/json',
          apikey: JWT.sign({ role: 'system', uuid: this.service }, this.privateKey, { algorithm: 'RS256' }),
        },
      });

      return response.data;
    } catch (err) {
      logger.error('MessageSDK-send()::', { err });
      throw err;
    }
  }
}
