-- ADD YOUR DATABASE SCHEMAS

CREATE TABLE IF NOT EXISTS trader (
  id SERIAL PRIMARY KEY,
  cash INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS coins (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  acronym VARCHAR(50) NOT NULL,
  coin_image VARCHAR(255),
  description TEXT,
  latest_price INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS portfolio (
  portfolio_id SERIAL PRIMARY KEY,
  trader_id INTEGER NOT NULL,
  coin_id INTEGER NOT NULL,
  coin_dollar_cost INTEGER NOT NULL,
  coin_avg_price INTEGER NOT NULL,
  CONSTRAINT fk_trader
    FOREIGN KEY(trader_id)
      REFERENCES trader(id),
  CONSTRAINT fk_coin
    FOREIGN KEY(coin_id)
      REFERENCES coins(id)
);