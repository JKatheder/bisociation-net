DROP DATABASE IF EXISTS bisociationnet;
CREATE DATABASE bisociationnet;

\c bisociationnet postgres

CREATE TABLE projects(
	project_id   int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	title        varchar(20),
	date         date DEFAULT CURRENT_DATE,
	description	 varchar(1000),
	-- data is string in GraphML form, contains all information about graph
	-- maximum chars to be adjusted
	data		 varchar(100000)
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