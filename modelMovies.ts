import { Database } from "bun:sqlite"

async function initDB() {
    const db = new Database(`movies.db`)
    const schema: string = await Bun.file(`./schema.sql`).text()
    db.run(schema)
    const movies = getAllMovies(db)
    if (movies.length === 0) {
        const dummy: string = await Bun.file(`./dummy.sql`).text()
        db.run(dummy)
    }
    return db
}

function getAllMovies(db: Database) {
    const query = db.query(`SELECT * FROM movies`)
    return query.all()
}

const db = await initDB()
const movies = getAllMovies(db)
console.log(movies)