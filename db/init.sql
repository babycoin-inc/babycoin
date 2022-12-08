CREATE TABLE IF NOT EXISTS trader (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS achievements (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  lesson VARCHAR(255) NOT NULL,
  points INT NOT NULL,
  icon VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS trader_achievements (
  id SERIAL PRIMARY KEY,
  trader_id INTEGER REFERENCES trader(id),
  achievement_id INTEGER REFERENCES achievements(id)
);