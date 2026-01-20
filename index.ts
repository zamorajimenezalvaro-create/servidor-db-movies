import { initDB } from "./db/init"
import { getAllMovies } from "./db/models/movies"

const db = await initDB()
const movies = getAllMovies(db)
console.log(movies)