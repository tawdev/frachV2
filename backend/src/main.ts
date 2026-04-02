import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // --- ÉTAPE CRUCIALE POUR NGINX ---
  app.setGlobalPrefix('api'); 

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*',
  });

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Serve uploads with CORS headers (ServeStaticModule doesn't forward CORS)
  app.use('/uploads', (req: any, res: any, next: any) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  }, express.static(join(process.cwd(), 'uploads')));

  // Utilise le port du fichier .env (qui est 3011 sur le serveur)
  await app.listen(process.env.PORT ?? 3011);
}
bootstrap();
