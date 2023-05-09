import { Module } from '@nestjs/common';
import { TwilioModule } from 'nestjs-twilio';
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } from 'src/config/constants';

@Module({
  imports: [
    TwilioModule.forRoot({
      accountSid: TWILIO_ACCOUNT_SID,
      authToken: TWILIO_AUTH_TOKEN,
    }),
  ],

  exports:[TwilioModule]
})
export class TwilioCustomModule{}