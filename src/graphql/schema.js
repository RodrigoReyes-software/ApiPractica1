const { buildSchema } = require("graphql");

const alumnos = require("../data/alumnos")
const schema = buildSchema(`
    type Alumno {
    id : ID!
    nombre : String!
    correo : String!
    idioma : String!
    }
    
    type Query {
        alumnos(materia:String!): [Alumno!]!
    }`)


const rootValue = {
    alumnos: ({ materia }) => {
        if(!materia){
            return alumnos;
        }
    return alumnos.filter((alumno) => {
        return alumno.idioma.toLowerCase() === materia.toLowerCase()
    });
    }   
};

module.exports = {
    schema,
    rootValue
};