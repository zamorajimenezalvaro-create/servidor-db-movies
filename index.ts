import { initDB } from "./db/init"
import { getMovies } from "./db/models/movies"
import express from "express"
import type { Request, Response, NextFunction } from "express"
import { createClient } from "redis"

const app = express();
const PORT = 3000
const db = await initDB()

app.use(express.json())

const redisClient = createClient();
await redisClient.connect();

const logMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.method, req.url, new Date().toDateString())
  next()
}

app.use(logMiddleware)

app.get("/movies", async (req, res) => {
  const { title, genre } = req.query

  const filters = {
    title: typeof title === "string" ? title : undefined,
    genres: typeof genre === "string" ? genre : undefined
  }

  const cacheKey = `movies:${filters.title ?? ""}:${filters.genres ?? ""}`

  const cachedData = await redisClient.get(cacheKey)

  if (cachedData) {
    console.log("Desde Redis")
    return res.json(JSON.parse(cachedData))
  }

  console.log("Desde SQLite")
  const movies = getMovies(db, filters)

  await redisClient.set(
    cacheKey,
    JSON.stringify(movies),
    { EX: 120 }
  )

  res.json(movies)
})

app.post("/movies", async (req, res) => {
  const { title, genres } = req.body

  if (!title || !genres) {
    return res.status(400).json({ error: "Faltan datos" })
  }

  db.query(
    `INSERT INTO movies (title, genres) VALUES (?, ?)`
  ).run(title, genres)

  const keys = await redisClient.keys("movies:*")
  if (keys.length > 0) {
    await redisClient.del(keys)
  }

  res.status(201).json({ message: "Película creada" })
})

app.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT}`)
})
