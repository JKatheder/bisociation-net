CREATE DATABASE bisociationnet;

\c bisociationnet

CREATE TABLE projects(
	id           int,
	title        text,
	date         date,
	description	 text
);

ALTER TABLE projects
	ADD PRIMARY KEY (id);