import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TwilioService } from 'nestjs-twilio';

@Injectable()
export class TFAService {
  constructor(
    private readonly twilioService: TwilioService,
    private readonly configService: ConfigService,
  ) {}

  async sendSms(receiver: string, message: string) {
    await this.twilioService.client.messages.create({
      to: receiver,
      from: this.configService.get('TWILIO_PHONE_NUMBER'),
      body: message,
    });
  }
}
