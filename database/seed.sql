--SECOND

--ROLES
INSERT INTO roles (role_name, description)
VALUES
('System Admin', 'Full system access'),
('Administrator', 'Academy administrator'),
('Chief Executive Officer', 'Academy CEO'),
('Coach', 'Team coach'),
('Editor', 'Content manager');

--TEAMS
INSERT INTO teams (team_name, age_category, max_players, season)
VALUES
('U8', 'Under 8', 20, '2026'),
('U10', 'Under 10', 20, '2026'),
('U12', 'Under 12', 22, '2026'),
('U14', 'Under 14', 22, '2026'),
('U16', 'Under 16', 25, '2026'),
('U18', 'Under 18', 25, '2026'),
('Senior', 'Senior', 30, '2026');