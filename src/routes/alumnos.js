const express = require("express");

const router = express.Router();

const alumnos = require("../data/alumnos");

router.get("/", (peticion, respuesta) => {
  respuesta.json(alumnos);
});


router.post("/", (peticion, respuesta) => {
  const nombre = peticion.body.nombre;
  const correo = peticion.body.correo;
  const idioma = peticion.body.idioma;

  if (!nombre || !correo || !idioma) {
    return respuesta.status(400).json({
      error: "Datos incompletos",
      mensaje: "Los campos nombre, correo e idioma son obligatorios"
    });
  }

  const nuevoAlumno = {
    id: alumnos.length + 1,
    nombre: nombre,
    correo: correo,
    idioma: idioma
  };

  alumnos.push(nuevoAlumno);

  respuesta.status(201).json({
    mensaje: "Alumno registrado correctamente",
    alumno: nuevoAlumno
  });
});
module.exports = router;