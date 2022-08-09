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
5. Llenar base de datos con la semilla
```
GET request a http://localhost:3000/api/v2/seed
```

## Stack
* MongoDB
* NestJS