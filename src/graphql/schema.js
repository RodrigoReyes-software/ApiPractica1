const { buildSchema } = require("graphql");
const conexion = require("../database");

const schema = buildSchema(`
    type Alumno {
        id: ID!
        nombre: String!
        correo: String!
        idioma: String!
    }

    type Query {
        alumnos(materia: String): [Alumno!]!
    }
`);

const rootValue = {
    alumnos: async ({ materia }) => {
        try {
            let consulta = `
                SELECT id, nombre, correo, idioma
                FROM alumnos
            `;

            const parametros = [];

            if (materia) {
                consulta += " WHERE LOWER(idioma) = LOWER(?)";
                parametros.push(materia);
            }

            consulta += " ORDER BY id";

            const [alumnos] = await conexion.execute(
                consulta,
                parametros
            );

            return alumnos;
        } catch (error) {
            console.error(
                "Error al consultar alumnos con GraphQL:",
                error.message
            );

            throw new Error("No fue posible consultar los alumnos");
        }
    }
};

module.exports = {
    schema,
    rootValue
};