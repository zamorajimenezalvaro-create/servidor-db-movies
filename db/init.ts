import { Database } from "bun:sqlite"
import { getAllMovies } from "../db/models/movies"

export async function initDB() {
    const db = new Database(`./db/movies.db`)
    const schema: string = await Bun.file(`./db/schema.sql`).text()
    db.run(schema)
    const movies = getAllMovies(db)
    if (movies.length === 0) {
        const dummy: string = await Bun.file(`./db/dummy.sql`).text()
        db.run(dummy)
    }
    return db
}