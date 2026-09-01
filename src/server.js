const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express")

const alumnosRouter = require("./routes/alumnos");
const { schema, rootValue } = require("./graphql/schema");

const app = express();
const puerto = 3000;


app.get("/", (peticion, respuesta) => {
  respuesta.send("Hola, esta es la API de prueba");
});

app.all(
  "/graphql",
  createHandler({
    schema,
    rootValue
  })
);

app.use(express.json());
app.use("/alumnos", alumnosRouter);

app.listen(puerto, () => {
  console.log(`Servidor funcionando en http://localhost:${puerto}`);
});