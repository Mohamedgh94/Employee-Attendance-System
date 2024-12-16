CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  department_id INTEGER REFERENCES departments(id),
  position VARCHAR(100),
  role VARCHAR(20) DEFAULT 'employee',
  qr_code VARCHAR(100) UNIQUE,
  default_location_id INTEGER REFERENCES locations(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  manager_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  address TEXT,
  type VARCHAR(50),
  working_hours_start TIME,
  working_hours_end TIME,
  max_capacity INTEGER,
  current_capacity INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE attendance (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  location_id INTEGER REFERENCES locations(id),
  check_in TIMESTAMP NOT NULL,
  check_out TIMESTAMP,
  worked_hours DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);