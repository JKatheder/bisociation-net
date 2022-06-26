CREATE DATABASE bisociationnet;

\c bisociationnet

CREATE TABLE projects(
	project_id   int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	title        text,
	date         date,
	description	 text
);

CREATE TABLE nodes(
	node_id      int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	project_id 	 int REFERENCES projects(project_id),
	x_pos		 int,
	y_pos 		 int,
	content		 text
);