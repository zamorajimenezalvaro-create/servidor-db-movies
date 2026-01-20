import { Database } from "bun:sqlite"
const schema = await Bun.file("./schema.sql").text()

const db = new Database("movies.db")
db.run(schema)

const select = db.query("SELECT * FROM movies")
const movies = select.all()

const express = require("express")
const app = express();
const PORT = 3000;

app.use(express.static("public"))

app.get("/movies", (req, res) => {
    res.json(movies)
})

app.listen(PORT, () => console.log(`Servidor funcionando en el puerto 3000`));