-- Inspire Portal Database Schema

CREATE TABLE IF NOT EXISTS departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(10),
  color VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS team_members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  department_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  position VARCHAR(100),
  avatar_url VARCHAR(255),
  email VARCHAR(100),
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE IF NOT EXISTS videos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  department_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  nas_path VARCHAR(500) NOT NULL,
  thumbnail_url VARCHAR(255),
  duration VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE IF NOT EXISTS documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  department_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  nas_path VARCHAR(500) NOT NULL,
  file_type VARCHAR(10) DEFAULT 'pdf',
  file_size BIGINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE IF NOT EXISTS apps (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(10),
  url VARCHAR(255),
  category VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  location VARCHAR(200),
  image_url VARCHAR(255),
  type ENUM('announcement', 'event', 'bulletin') DEFAULT 'announcement',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample seed data

INSERT INTO departments (name, slug, description, icon, color) VALUES
('Customer', 'customer', 'Customer service, support, and relationship management', '🎧', '#06b6d4'),
('Corporate', 'corporate', 'Corporate governance, strategy, stakeholder relations, and compliance', '💼', '#8b5cf6'),
('Admin', 'admin', 'Facilities management, logistics, procurement, and office operations', '🏢', '#10b981'),
('IT', 'it', 'Infrastructure, development, and tech support for the entire organization', '💻', '#2563eb'),
('Solution', 'solution', 'Business solutions, consulting, and technology-driven innovation services', '💡', '#0ea5e9'),
('Iwallet', 'iwallet', 'Digital wallet operations, payment processing, and financial product support', '👛', '#f97316'),
('Real Estate', 'realestate', 'Property acquisition, leasing, portfolio management, and site development', '🏠', '#14b8a6'),
('Joint Business Adventure', 'jba', 'Strategic partnerships, joint ventures, and collaborative business initiatives', '🤝', '#d946ef'),
('Marketing', 'marketing', 'Brand management, digital marketing, campaigns, and communications', '📢', '#ef4444'),
('Utility', 'utility', 'Building maintenance, utilities management, and general support services', '🔧', '#f59e0b');

INSERT INTO apps (name, description, icon, url, category) VALUES
('Email', 'Corporate email system', '📧', '#', 'Communication'),
('Chat', 'Internal messaging platform', '💬', '#', 'Communication'),
('Drive', 'File storage and sharing', '📁', '#', 'Productivity'),
('Calendar', 'Scheduling and events', '📅', '#', 'Productivity'),
('HR Portal', 'Employee self-service', '👤', '#', 'HR'),
('Helpdesk', 'IT support tickets', '🎫', '#', 'Support');

INSERT INTO events (title, description, date, location, type) VALUES
('Q1 Town Hall Meeting', 'Company-wide quarterly review and updates from leadership.', '2026-04-01', 'Main Auditorium', 'announcement'),
('New Training Portal Launch', 'The new Inspire Training Portal is now live for all employees.', '2026-03-26', 'Online', 'announcement'),
('Fire Drill Schedule', 'Monthly fire drill scheduled for all floors. Please review evacuation procedures.', '2026-04-05', 'All Floors', 'bulletin'),
('Parking Lot Maintenance', 'Lot B will be closed for resurfacing. Use Lot C temporarily.', '2026-04-10', 'Parking Lot B', 'bulletin');
