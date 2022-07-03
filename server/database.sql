DROP DATABASE IF EXISTS bisociationnet;
CREATE DATABASE bisociationnet;

\c bisociationnet postgres

CREATE TABLE projects(
	project_id   int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	title        varchar(20),
	date         date DEFAULT CURRENT_DATE,
	description	 varchar(1000)
);

CREATE TABLE nodes(
	node_id      int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	project_id 	 int REFERENCES projects(project_id),
	x_pos		 float,
	y_pos 		 float,
	content		 varchar(100)
);

CREATE TABLE edges(
	edge_id      int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	project_id 	 int REFERENCES projects(project_id),
	node_1		 int REFERENCES nodes(node_id),
	node_2 		 int REFERENCES nodes(node_id),
	content		 varchar(100)
);

-- title will be "project id" if no title given
CREATE FUNCTION change_title() RETURNS TRIGGER AS $new_table$
BEGIN
NEW.title := 'Project ' || NEW.project_id;
RETURN NEW;
END;
$new_table$ LANGUAGE plpgsql;

CREATE TRIGGER Check_title BEFORE INSERT ON projects
FOR EACH ROW
WHEN (NEW.title IS NULL OR NEW.title = '')
EXECUTE PROCEDURE change_title();

-- dummy data
INSERT INTO projects(title, description)
VALUES ('Project 1', 'Contains no default nodes from the database');

INSERT INTO projects(title, description)
VALUES ('Project 2', 'Contains two default nodes with edges from the database (not displayed yet)');

INSERT INTO nodes(project_id, x_pos, y_pos, content)
VALUES (2, 0, 0, 'Node 1');

INSERT INTO nodes(project_id, x_pos, y_pos, content)
VALUES (2, 10, 20, 'Node 2');

INSERT INTO edges(project_id, node_1, node_2)
VALUES (2, 1, 2);