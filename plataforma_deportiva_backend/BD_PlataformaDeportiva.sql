DROP DATABASE IF EXISTS BD_PlataformaDeportiva;

CREATE DATABASE BD_PlataformaDeportiva
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE BD_PlataformaDeportiva;

CREATE TABLE usuario (
                         id_usuario INT AUTO_INCREMENT PRIMARY KEY,
                         gmail VARCHAR(100) NOT NULL UNIQUE,
                         password VARCHAR(255) NOT NULL,
                         nombre VARCHAR(100) NOT NULL
);

CREATE TABLE liga (
                      id_liga INT AUTO_INCREMENT PRIMARY KEY,
                      nombre VARCHAR(100) NOT NULL,
                      pais VARCHAR(100) NOT NULL
);

CREATE TABLE equipo (
                        id_equipo INT AUTO_INCREMENT PRIMARY KEY,
                        id_liga INT NOT NULL,
                        nombre VARCHAR(100) NOT NULL,
                        ciudad VARCHAR(100),
                        estadio VARCHAR(100),
                        partidos_jugados INT DEFAULT 0,
                        partidos_ganados INT DEFAULT 0,
                        partidos_empatados INT DEFAULT 0,
                        partidos_perdidos INT DEFAULT 0,
                        goles_favor INT DEFAULT 0,
                        goles_contra INT DEFAULT 0,
                        puntos INT DEFAULT 0,
                        FOREIGN KEY (id_liga) REFERENCES liga(id_liga)
);

CREATE TABLE partido (
                         id_partido INT AUTO_INCREMENT PRIMARY KEY,
                         id_liga INT NOT NULL,
                         id_equipo_local INT NOT NULL,
                         id_equipo_visitante INT NOT NULL,
                         jornada INT NOT NULL,
                         fecha DATE NOT NULL,
                         goles_local INT DEFAULT NULL,
                         goles_visitante INT DEFAULT NULL,
                         estado VARCHAR(50) NOT NULL,
                         FOREIGN KEY (id_liga) REFERENCES liga(id_liga),
                         FOREIGN KEY (id_equipo_local) REFERENCES equipo(id_equipo),
                         FOREIGN KEY (id_equipo_visitante) REFERENCES equipo(id_equipo)
);