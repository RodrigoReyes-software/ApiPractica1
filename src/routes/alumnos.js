const express = require("express");
const conexion = require("../database");

const router = express.Router();

router.get("/", async (peticion, respuesta) => {
  try {
    const [alumnos] = await conexion.query(
      `SELECT id, nombre, correo, idioma, fecha_registro
       FROM alumnos
       ORDER BY id`
    );

    respuesta.json(alumnos);
  } catch (error) {
    console.error("Error al consultar alumnos:", error.message);

    respuesta.status(500).json({
      error: "No fue posible consultar los alumnos"
    });
  }
});

router.post("/", async (peticion, respuesta) => {
  const nombre = peticion.body.nombre;
  const correo = peticion.body.correo;
  const idioma = peticion.body.idioma;

  if (!nombre || !correo || !idioma) {
    return respuesta.status(400).json({
      error: "Datos incompletos",
      mensaje: "Los campos nombre, correo e idioma son obligatorios"
    });
  }

  try {
    const [resultado] = await conexion.execute(
      `INSERT INTO alumnos (nombre, correo, idioma)
       VALUES (?, ?, ?)`,
      [nombre, correo, idioma]
    );

    respuesta.status(201).json({
      mensaje: "Alumno registrado correctamente",
      alumno: {
        id: resultado.insertId,
        nombre,
        correo,
        idioma
      }
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return respuesta.status(409).json({
        error: "Correo duplicado",
        mensaje: "Ya existe un alumno con ese correo"
      });
    }

    console.error("Error al registrar alumno:", error.message);

    respuesta.status(500).json({
      error: "No fue posible registrar al alumno"
    });
  }
});

module.exports = router;