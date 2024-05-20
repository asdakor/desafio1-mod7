import { Router } from "express";
import { estudiantesController } from "../controllers/estudiantes.controller.js";

const router = Router()

// PATH: /estudiantes
router.get('/', estudiantesController.estudiantes)
router.get('/:rut', estudiantesController.buscarRut)
router.post('/agregar', estudiantesController.createEstudiante)
router.put('/:rut/editar', estudiantesController.editarEstudiante)
router.delete('/:rut/eliminar', estudiantesController.eliminarEstudiante)

export default router;