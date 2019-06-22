DROP DATABASE IF EXISTS climbingtraining;

CREATE DATABASE climbingtraining;

\c climbingtraining;

CREATE TABLE users (
  id SERIAL NOT NULL,
  name VARCHAR NOT NULL,
  weight SMALLINT,
  boudleringgrade SMALLINT,
  sportgrade SMALLINT,
  tradgrade SMALLINT,
  joindate DATE NOT NULL
);

CREATE TABLE exercises (
  id SERIAL NOT NULL,
  type VARCHAR NOT NULL,
  description VARCHAR,
  recommendation VARCHAR,
  routineid SMALLINT
);

CREATE TABLE routines (
 id SERIAL NOT NULL,
 type VARCHAR NOT NULL,
 createdby INTEGER,
 createddate DATE NOT NULL
);

CREATE TABLE sessions (
  id SERIAL NOT NULL,
  type VARCHAR NOT NULL,
  date DATE NOT NULL,
  userid INTEGER NOT NULL
);

CREATE TABLE userroutines (
  id SERIAL NOT NULL,
  userid INTEGER NOT NULL,
  routineid INTEGER NOT NULL
);

CREATE TABLE sessionexercises (
  id SERIAL NOT NULL,
  sessionid INTEGER NOT NULL,
  exerciseid INTEGER NOT NULL
);