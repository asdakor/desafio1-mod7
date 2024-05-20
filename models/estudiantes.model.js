import { pool } from "../database/connection.js";

const findAll = async () => {
    const query = {
        text: 'SELECT * FROM estudiantes LIMIT 10',
        values: []
    }
    const { rows } = await pool.query(query)
    return rows
}

const buscarRut = async (rut) => {
    const query = {
        text: "SELECT * FROM estudiantes WHERE rut = $1",
        values: [rut]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}

const create = async ({ rut, nombre, curso, nivel }) => {
    const query = {
        text: "INSERT INTO estudiantes values ($1, $2, $3, $4) RETURNING *",
        values: [rut, nombre, curso, nivel]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}

const edit = async ({ rut, nombre, curso, nivel }) => {
    const query = {
        text: "UPDATE estudiantes SET NOMBRE = $2, CURSO = $3, NIVEL = $4 WHERE RUT = $1",
        values: [rut, nombre, curso, nivel]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}
const eliminar = async ( rut ) => {
    const query = {
        text: "DELETE FROM estudiantes WHERE RUT = $1 RETURNING *",
        values: [rut]
    };
    console.log(query)
    const { rows } = await pool.query(query);
    return;
};

export const estudiantesModel = {
    findAll, create, buscarRut, edit, eliminar
}