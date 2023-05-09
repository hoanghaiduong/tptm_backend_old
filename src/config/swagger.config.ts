import { DocumentBuilder} from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API documentation for your application.')
    .setVersion('3.0')
    .addBearerAuth()
    .build();
    
export { swaggerConfig };   