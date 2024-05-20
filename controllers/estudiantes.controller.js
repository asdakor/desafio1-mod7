import { estudiantesModel } from "../models/estudiantes.model.js"

const estudiantes = async (req, res) => {
    try {
        const estudiantes = await estudiantesModel.findAll()
        console.log(estudiantes)
        return res.json(estudiantes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
}

const buscarRut = async (req, res) => {
    try {
        const { rut } = req.params
        const estudiante = await estudiantesModel.buscarRut(rut)
        if (!estudiante) return res.status(404).json({ ok: false, msg: "no se encontró el rut" })
        console.log(estudiante)
        return res.json(estudiante)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
}

const createEstudiante = async (req, res) => {
    try {
        const { rut, nombre, curso, nivel } = req.body
        const newStudent = { rut, nombre, curso, nivel }
        const estudiantesDB = await estudiantesModel.create(newStudent)
        return res.status(201).json(estudiantesDB)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
}

const editarEstudiante = async (req, res) => {
    try {
        const { rut } = req.params
        const estudiante = await estudiantesModel.buscarRut(rut)
        if (!estudiante) return res.status(404).json({ ok: false, msg: "no se encontró el estudiante" })
        const { nombre, curso, nivel } = req.body
        const datos = { rut, nombre, curso, nivel }
        const estudiantesEdit = await estudiantesModel.edit(datos)
        return res.status(201).json(estudiantesEdit)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
}

const eliminarEstudiante = async (req, res) => {
    try {
        const { rut } = req.params;
        const estudiante = await estudiantesModel.buscarRut(rut);
        if (!estudiante) {
            return res.status(404).json({ ok: false, msg: "No se encontró el estudiante" });
        }

        await estudiantesModel.eliminar(estudiante.rut);

        console.log(`Estudiante con RUT ${estudiante.rut} eliminado`);
        return res.status(200).json({ ok: true, msg: "Estudiante eliminado correctamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, msg: "Error interno del servidor" });
    }
};

export const estudiantesController = {
    estudiantes, createEstudiante, buscarRut, editarEstudiante, eliminarEstudiante
}