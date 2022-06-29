DROP DATABASE IF EXISTS bisociationnet;
CREATE DATABASE bisociationnet;

\c bisociationnet postgres

CREATE TABLE projects(
	project_id   int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	title        varchar(20),
	date         date DEFAULT CURRENT_DATE,
	description	 text
);

CREATE TABLE nodes(
	node_id      int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	project_id 	 int REFERENCES projects(project_id),
	x_pos		     int,
	y_pos 		   int,
	content		   text
);

CREATE TABLE edges(
	edge_id      int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	project_id 	 int REFERENCES projects(project_id),
	node_1		   int REFERENCES nodes(node_id),
	node_2 		   int REFERENCES nodes(node_id),
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