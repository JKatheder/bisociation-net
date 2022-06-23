DROP DATABASE IF EXISTS bisociationnet;
CREATE DATABASE bisociationnet;

\c bisociationnet postgres

CREATE TABLE projects(
	project_id   int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	title        text,
	date         date,
	description	 text
);

CREATE TABLE nodes(
	node_id      int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	project 	 int REFERENCES projects(project_id),
	x_pos		 int,
	y_pos 		 int,
	content		 text
);