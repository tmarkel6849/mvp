DROP DATABASE IF EXISTS climbingtraining;

CREATE DATABASE climbingtraining;

\c climbingtraining;

CREATE TABLE users (
  id SERIAL NOT NULL,
  name VARCHAR NOT NULL,
  joindate DATAE NOT NULL
);

CREATE TABLE sessions (
  id SERIAL NOT NULL,

)