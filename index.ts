import { initDB } from "./db/init"
import { getAllMovies, getAllMoviesById, getAllMoviesByTitle } from "./db/models/movies"

const db = await initDB()
// const movies = getAllMovies(db)
// console.log(movies)
const moviesById = getAllMoviesById(db, 1)
console.log(moviesById)
const moviesByTitle = getAllMoviesByTitle(db, "Toy")
console.log(moviesByTitle)