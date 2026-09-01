# API de Academia de Idiomas

API simulada desarrollada para la práctica 1 de Ingeniería de Software.

El proyecto contiene:

- Un servicio REST para registrar alumnos.
- Un servicio GraphQL para consultar alumnos por materia.
- Un almacenamiento temporal compartido en memoria.

## Tecnologías

- Node.js
- Express
- GraphQL
- graphql-http

## Instalación

Clonar o descargar el proyecto y ejecutar:
```
npm install
```
## Iniciar el servidor

```
npm start
```
El servidor estará disponible en:


http://localhost:3000


## Servicio REST

### Registrar un alumno


POST /alumnos


Cuerpo JSON:

```
{
  "nombre": "Powerpuffs",
  "correo": "powerpuff@email.com",
  "idioma": "ingles"
}
```

Los campos `nombre`, `correo` e `idioma` son obligatorios.

## Servicio GraphQL

Endpoint:


POST /graphql


### Consultar alumnos por materia

Cuerpo JSON:

```
{
  "query": "{ alumnos(materia: \"ingles\") { nombre correo idioma } }"
}
```

GraphQL permite seleccionar solamente los campos requeridos.

## Consideraciones

Los datos se guardan temporalmente en memoria. Cuando se reinicia el servidor, la lista de alumnos vuelve a estar vacía.

Este comportamiento es intencional porque el proyecto es una simulación. Posteriormente el arreglo puede sustituirse por una base de datos.