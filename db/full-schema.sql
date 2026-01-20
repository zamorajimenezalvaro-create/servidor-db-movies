DROP TABLE IF EXISTS movies;

CREATE TABLE movies(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    genres TEXT NOT NULL,
    created_at DATATIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO movies (title, genres) VALUES
('The Matrix', 'Sci-fiction'),
('Evangelion', 'Romantic'),
('Fate', 'Drama');

UPDATE movies
SET title = `pelicula`, genres = `generos`
WHERE id = 1;

DELETE FROM movies
WHERE id = 1;