import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './api/api.module';
import { EmailModule } from './email/email.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'database-1.cq9e0ksqmnfl.us-east-1.rds.amazonaws.com',
      port: 5432,
      username: 'postgres',
      password: 'Tgw4th3h',
      database: 'postgres',
      ssl: {
        rejectUnauthorized: false, // Development only!
        // For production:
        // ca: fs.readFileSync('path/to/your/rds-ca-2019-root.pem').toString(), // Replace with your certificate path
      },
    }),
    ConfigModule.forRoot({
      envFilePath: '.env', // Specify the path to your .env file
      isGlobal: true, // Make the configuration globally available
    }),
    ApiModule,
    EmailModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
