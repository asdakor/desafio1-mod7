import 'dotenv/config'
import express from 'express';
import estudiantesRoutes from './routes/estudiantes.route.js'
const __dirname = import.meta.dirname;

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/estudiantes', estudiantesRoutes)

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`El servidor se inicio en http://localhost:${PORT}`)
})