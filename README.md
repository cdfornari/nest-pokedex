<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar repo
2. Instalar dependencias
```
npm install
```
3. Instalar Nest CLI
```
npm i -g @nestjs/cli
```
4. Levantar db
```
docker-compose up -d
```
5. Clonar ```.env.template``` y renombrar a ```.env```
6. Llenar variables de entorno
7. Levantar el servidor
```
npm run start:dev
```
8. Llenar base de datos con la semilla
```
GET request a http://localhost:3000/api/v2/seed
```

# Production build
1. Crear ```.env.prod``
2. Llenar variables de entorno
```
MONGODB=mongodb://mongo-pokedex:27017/nest-pokemon
```
3. Crear imagen
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

## Stack usado
* MongoDB
* NestJS