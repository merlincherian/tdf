import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
// import { EmailService } from './email.service';
import { ApiService } from 'src/api/api.service';

@Module({
  controllers: [EmailController],
  providers: [ApiService],
})
export class EmailModule {}
