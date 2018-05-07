CREATE DATABASE movie_planner_db;
USE movie_planner_db;

CREATE TABLE movies(
id INT NOT NULL AUTO_INCREMENT,
movie VARCHAR(255) NOT NULL,
PRIMARY KEY (ID)
);

INSERT INTO movies (movie)  VALUES ('Rush Hour 2');