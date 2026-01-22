import { Database } from "bun:sqlite"

export function getMovies(db : Database, filters: {title: string | undefined, genres: string | undefined}) {
const {title, genres} = filters;
let movies 
if(title && genres) movies = getAllMoviesByTitleAndGenre(db, title, genres)
    else if (title) movies = getAllMoviesByTitle(db, title)
    else if (genres) movies = getAllMoviesByGenre(db, genres)
    else movies = getAllMovies(db)
return movies
}

export function getAllMovies(db: Database) {
    const query = db.query(`SELECT * FROM movies`)
    return query.all()
}

export function getAllMoviesById(db: Database, id: number) {
    const query = db.query(`SELECT * FROM movies WHERE id = ?`)
    return query.get(id)
}

export function getAllMoviesByTitle(db: Database, title: string ) {
    const query = db.query(`SELECT * FROM movies WHERE title LIKE ?`)
    return query.all(`%${title}%`)
}

export function getAllMoviesByGenre(db: Database, genres: string ) {
    const query = db.query(`SELECT * FROM movies WHERE title LIKE ? AND genres LIKE ?`)
    return query.all(`%${genres}%`)
}

export function getAllMoviesByTitleAndGenre(db: Database, title: string, genres: string ) {
    const query = db.query(`SELECT * FROM movies WHERE title LIKE ? AND genres LIKE ?`)
    return query.all(`%${title}%`, `%${genres}%`)
}