-- =====================================
-- SHUSA DATABASE SCHEMA
-- Version: 1.0
-- =====================================

CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,

    role_id INT NOT NULL,

    full_name VARCHAR(150) NOT NULL,

    email VARCHAR(150) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    phone VARCHAR(20),

    profile_photo VARCHAR(255),

    is_active BOOLEAN DEFAULT TRUE,

    last_login TIMESTAMP,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_users_role
        FOREIGN KEY (role_id)
        REFERENCES roles(role_id)
        ON DELETE RESTRICT
);

-- Teams table
CREATE TABLE teams (

    team_id SERIAL PRIMARY KEY,

    team_name VARCHAR(50) UNIQUE NOT NULL,

    age_category VARCHAR(20),

    description TEXT,

    training_days VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_users_email
ON users(email);

CREATE INDEX idx_team_name
ON teams(team_name);

-- PLAYER APPLICATION TABLE
CREATE TABLE player_applications (
    application_id SERIAL PRIMARY KEY,

    application_number VARCHAR(30) UNIQUE NOT NULL,

    first_name VARCHAR(100) NOT NULL,

    middle_name VARCHAR(100),

    last_name VARCHAR(100) NOT NULL,

    gender VARCHAR(10) NOT NULL,

    date_of_birth DATE NOT NULL,

    nationality VARCHAR(100),

    preferred_position VARCHAR(50),

    preferred_foot VARCHAR(20),

    school_name VARCHAR(150),

    class_level VARCHAR(50),

    residential_address TEXT,

    medical_conditions TEXT,

    allergies TEXT,

    emergency_contact_name VARCHAR(150),

    emergency_contact_phone VARCHAR(20),

    status VARCHAR(20) DEFAULT 'Pending',

    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    reviewed_at TIMESTAMP,

    reviewed_by INT,

    remarks TEXT,

    CONSTRAINT fk_reviewed_by
        FOREIGN KEY (reviewed_by)
        REFERENCES users(user_id)
        ON DELETE SET NULL
);

-- GAURDIAN APPLICATION TABLE
CREATE TABLE application_guardians (
    guardian_id SERIAL PRIMARY KEY,

    application_id INT NOT NULL,

    guardian_type VARCHAR(20) NOT NULL,

    full_name VARCHAR(150) NOT NULL,

    relationship VARCHAR(50),

    phone VARCHAR(20),

    whatsapp VARCHAR(20),

    email VARCHAR(150),

    occupation VARCHAR(100),

    national_id VARCHAR(50),

    address TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_application_guardian
        FOREIGN KEY(application_id)
        REFERENCES player_applications(application_id)
        ON DELETE CASCADE
);

-- DOCUMENT APPLICATION TABLE
CREATE TABLE application_documents (
    document_id SERIAL PRIMARY KEY,

    application_id INT NOT NULL,

    document_type VARCHAR(50) NOT NULL,

    file_name VARCHAR(255),

    file_path VARCHAR(255) NOT NULL,

    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_application_document
        FOREIGN KEY(application_id)
        REFERENCES player_applications(application_id)
        ON DELETE CASCADE
);

-- Indexes
CREATE INDEX idx_application_status
ON player_applications(status);

CREATE INDEX idx_application_name
ON player_applications(last_name, first_name);

CREATE INDEX idx_guardian_phone
ON application_guardians(phone);

-- APPROVED PLAYERS TABLE
CREATE TABLE players (
    player_id SERIAL PRIMARY KEY,

    application_id INT UNIQUE,

    registration_number VARCHAR(30) UNIQUE NOT NULL,

    team_id INT,

    first_name VARCHAR(100) NOT NULL,

    middle_name VARCHAR(100),

    last_name VARCHAR(100) NOT NULL,

    gender VARCHAR(10),

    date_of_birth DATE NOT NULL,

    nationality VARCHAR(100),

    preferred_position VARCHAR(50),

    preferred_foot VARCHAR(20),

    school_name VARCHAR(150),

    class_level VARCHAR(50),

    residential_address TEXT,

    medical_conditions TEXT,

    allergies TEXT,

    player_photo VARCHAR(255),

    status VARCHAR(20) DEFAULT 'Active',

    approved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_player_application
        FOREIGN KEY(application_id)
        REFERENCES player_applications(application_id)
        ON DELETE SET NULL,

    CONSTRAINT fk_player_team
        FOREIGN KEY(team_id)
        REFERENCES teams(team_id)
        ON DELETE SET NULL
);

-- GUARDIANS PLAYERS APPROVED
CREATE TABLE guardians (

    guardian_id SERIAL PRIMARY KEY,

    player_id INT NOT NULL,

    full_name VARCHAR(150) NOT NULL,

    relationship VARCHAR(50),

    phone VARCHAR(20),

    whatsapp VARCHAR(20),

    email VARCHAR(150),

    occupation VARCHAR(100),

    national_id VARCHAR(50),

    address TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_guardian_player
        FOREIGN KEY(player_id)
        REFERENCES players(player_id)
        ON DELETE CASCADE
);

-- IMPROVING TEAMS TABLE
ALTER TABLE teams
ADD COLUMN team_color VARCHAR(50),
ADD COLUMN max_players INT DEFAULT 25,
ADD COLUMN season VARCHAR(20);

--COACHES TABLE
CREATE TABLE coaches (

    coach_id SERIAL PRIMARY KEY,

    full_name VARCHAR(150) NOT NULL,

    email VARCHAR(150),

    phone VARCHAR(20),

    qualification TEXT,

    experience TEXT,

    biography TEXT,

    profile_photo VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- COACH TEAM ASSIGNMENT TABLE
CREATE TABLE coach_team (

    coach_team_id SERIAL PRIMARY KEY,

    coach_id INT NOT NULL,

    team_id INT NOT NULL,

    role VARCHAR(50),

    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_ct_coach
        FOREIGN KEY(coach_id)
        REFERENCES coaches(coach_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_ct_team
        FOREIGN KEY(team_id)
        REFERENCES teams(team_id)
        ON DELETE CASCADE
);

-- NEWS TABLE
CREATE TABLE news (
    news_id SERIAL PRIMARY KEY,

    title VARCHAR(255) NOT NULL,

    slug VARCHAR(255) UNIQUE NOT NULL,

    summary TEXT,

    content TEXT NOT NULL,

    featured_image VARCHAR(255),

    category VARCHAR(50),

    is_published BOOLEAN DEFAULT FALSE,

    published_at TIMESTAMP,

    created_by INT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_news_user
        FOREIGN KEY(created_by)
        REFERENCES users(user_id)
        ON DELETE RESTRICT
);

--GALLERY TABLE
CREATE TABLE gallery (
    gallery_id SERIAL PRIMARY KEY,

    title VARCHAR(200) NOT NULL,

    description TEXT,

    media_type VARCHAR(20) NOT NULL,

    media_url VARCHAR(255) NOT NULL,

    thumbnail_url VARCHAR(255),

    category VARCHAR(50),

    uploaded_by INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_gallery_user
        FOREIGN KEY(uploaded_by)
        REFERENCES users(user_id)
        ON DELETE SET NULL
);

-- FIXTURES TABLE
CREATE TABLE fixtures (
    fixture_id SERIAL PRIMARY KEY,

    team_id INT NOT NULL,

    opponent VARCHAR(150) NOT NULL,

    competition VARCHAR(150),

    venue VARCHAR(150),

    match_date DATE NOT NULL,

    kickoff_time TIME,

    home_score INT,

    away_score INT,

    status VARCHAR(30) DEFAULT 'Scheduled',

    created_by INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_fixture_team
        FOREIGN KEY(team_id)
        REFERENCES teams(team_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_fixture_user
        FOREIGN KEY(created_by)
        REFERENCES users(user_id)
        ON DELETE SET NULL
);

-- TRAINING SCHEDULING TABLE
CREATE TABLE training_schedule (
    schedule_id SERIAL PRIMARY KEY,

    team_id INT NOT NULL,

    title VARCHAR(150),

    training_day VARCHAR(20),

    start_time TIME,

    end_time TIME,

    venue VARCHAR(150),

    coach_id INT,

    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_schedule_team
        FOREIGN KEY(team_id)
        REFERENCES teams(team_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_schedule_coach
        FOREIGN KEY(coach_id)
        REFERENCES coaches(coach_id)
        ON DELETE SET NULL
);

-- CONTACT MESSAGES TABLE
CREATE TABLE contact_messages (
    message_id SERIAL PRIMARY KEY,

    full_name VARCHAR(150) NOT NULL,

    email VARCHAR(150),

    phone VARCHAR(20),

    subject VARCHAR(200),

    message TEXT NOT NULL,

    is_read BOOLEAN DEFAULT FALSE,

    received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SETTINGS TABLE
CREATE TABLE settings (
    setting_id SERIAL PRIMARY KEY,

    setting_key VARCHAR(100) UNIQUE NOT NULL,

    setting_value TEXT,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AUDIT LOGS TABLE
CREATE TABLE audit_logs (
    log_id SERIAL PRIMARY KEY,

    user_id INT,

    action VARCHAR(100) NOT NULL,

    table_name VARCHAR(100),

    record_id INT,

    description TEXT,

    ip_address VARCHAR(45),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_audit_user
        FOREIGN KEY(user_id)
        REFERENCES users(user_id)
        ON DELETE SET NULL
);

