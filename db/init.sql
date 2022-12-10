CREATE TABLE IF NOT EXISTS trader (
  id SERIAL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS coins (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  acronym VARCHAR(50) NOT NULL,
  image VARCHAR(255),
  description TEXT,
  latest_price DECIMAL NOT NULL
);

CREATE TABLE IF NOT EXISTS portfolio (
  portfolio_id SERIAL PRIMARY KEY,
  trader_id INTEGER NOT NULL,
  coin_id INTEGER NOT NULL,
  dollar_cost DECIMAL NOT NULL,
  avg_price DECIMAL NOT NULL,
  quantity DECIMAL NOT NULL,
  CONSTRAINT fk_trader
    FOREIGN KEY(trader_id)
      REFERENCES trader(id),
  CONSTRAINT fk_coin
    FOREIGN KEY(coin_id)
      REFERENCES coins(id)
);

CREATE TABLE IF NOT EXISTS achievements (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(255) NOT NULL,
  lesson VARCHAR(255) NOT NULL,
  points INTEGER NOT NULL,
  icon VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS newsfeed (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  arthur VARCHAR(200) NOT NULL,
  URL VARCHAR(200) NOT NULL,
  tickers TEXT [] NOT NULL,
  image_url VARCHAR(200) NOT NULL,
  topics TEXT,
  type TEXT,
  sentiment TEXT
);

CREATE TABLE IF NOT EXISTS trader_achievements (
  id SERIAL PRIMARY KEY,
  trader_id INTEGER REFERENCES trader(id),
  achievement_id INTEGER REFERENCES achievements(id)
);

DO $$ BEGIN
    CREATE TYPE transaction_type AS ENUM ('buy', 'sell');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  order_type transaction_type,
  currency VARCHAR(10) NOT NULL,
  purchase_price INTEGER NOT NULL,
  total_trade_fiat INTEGER NOT NULL,
  total_trade_coin INTEGER NOT NULL,
  order_datetime timestamp,
  trader_id INTEGER REFERENCES trader(id),
  coin_id INTEGER REFERENCES coins(id)
);