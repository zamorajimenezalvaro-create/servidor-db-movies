import { Database } from "bun:sqlite"

export function getAllMovies(db: Database) {
    const query = db.query(`SELECT * FROM movies`)
    return query.all()
}

export function getAllMoviesById(db: Database, id: number) {
    const query = db.query(`SELECT * FROM movies WHERE id = ?`)
    return query.get(id)
}

export function getAllMoviesByTitle(db: Database, title: string ) {
    const query = db.query(`SELECT * FROM movies WHERE title LIKE ? LIMIT 1`)
    return query.all(`%${title}%`)
}