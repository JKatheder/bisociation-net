DROP DATABASE IF EXISTS bisociationnet;
CREATE DATABASE bisociationnet;

\c bisociationnet postgres

CREATE TABLE projects(
	id           int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	title        text,
	date         date,
	description	 text
);