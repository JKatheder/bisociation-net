CREATE DATABASE bisociationnet;

\c bisociationnet

CREATE TABLE projects(
	node_id      int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	id           int,
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