# Weather App
Esta aplicacion tiene la finalidad de permitir al usuario ver el clima de su localizacion actual y la de hasta 5 ciudades mas.
La informacion que se muestra es la del dia que corre y 5 dias mas adelante.

La aplicacion utiliza los servicio de:
* [OpenWeather](https://openweathermap.org)
* [IP Geolocation](https://app.ipgeolocation.io/)

## Diseño
La aplicacion fue diseñado con un modelo tradicional de backend(server) y frontend(client), por lo que quiere decir que la aplicacion de backend es un backend puro (en este caso un proxy/mapper) y el frontend es una aplicacion totalmente CSR.

### Backend
La aplicacion fue desarrollada con las siguientes tecnologias:
* NodeJS
* Express
* Mocha + Chai (Test's - todavia no hay)
* Winston + Morgan (Loggers)

### Frontend
La aplicacion fue desarrolada con las siguientes tecnologias:
* React
* AntDesign (Framework de UI)


## Correr las apps
Para correr ambas aplicaciones es necesario tener la ultima version de NodeJS (12.x.y).

Para los detalles puntuales de como correr cada app ingresar al README de cada una de ellas.
