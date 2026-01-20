import { initDB } from "./db/init"
import { getAllMovies, getAllMoviesById, getAllMoviesByTitle } from "./db/models/movies"
import express from "express"
const app = express();
const PORT = 3000
const db = await initDB()

app.get("/movies", (req, res) => {
    const movies = getAllMovies(db)
    res.json(movies)
})

app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`)
})
