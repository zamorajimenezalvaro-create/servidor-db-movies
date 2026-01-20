Se trae el nuevo movies (el que usemos la otra vez).
sqlite3 movies.db < schema.sql
sqlite3
.mode csv
.import movies.csv temp -> Crea una tabla temporal con esos datos.

SELECT * FROM temp; -> No devuelve nada.
SELECT * FROM temp LIMIT 10; -> Esto si.

.fullschema -> Ves el schmea de dicha tabla.

INSERT INTO temp (title, genres) SELECT title, genres FROM movies; -> Pasa lo de una tabla a otra.
SELECT * FROM temp LIMIT 10; -> Lo comprobamos y vemos que no toma los ID, los calcula solo.

Sale de sqlite3

sqlite3 movies.db `.dump` > dump.sql -> Crea un archivo que contiene todos los schemas e inserts. Se queda solo con los inserts.