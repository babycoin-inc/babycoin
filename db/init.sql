CREATE TABLE IF NOT EXISTS trader (
  id SERIAL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS coins (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  acronym VARCHAR(50) NOT NULL,
  image VARCHAR(255),
  description TEXT,
  latest_price INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS portfolio (
  portfolio_id SERIAL PRIMARY KEY,
  trader_id INTEGER NOT NULL,
  coin_id INTEGER NOT NULL,
  dollar_cost INTEGER NOT NULL,
  avg_price INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
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

CREATE TABLE IF NOT EXISTS leaderboard (
  id SERIAL PRIMARY KEY,
  trader_id INTEGER REFERENCES trader(id),
  coin_id INTEGER REFERENCES coins(id),
  current_gain INTEGER,
  highest_total_gain INTEGER,
  UNIQUE (trader_id, coin_id)
);

CREATE RULE update_current_gain_leaderboard AS ON INSERT TO transactions DO ALSO
  INSERT INTO leaderboard
  (trader_id, coin_id, current_gain, highest_total_gains) VALUES (NEW.trader_id, NEW.coin_id, 0, 0)
  ON CONFLICT (trader_id, coin_id)
    DO UPDATE
      SET current_gain = (
      CASE
        WHEN  NEW.order_type = 'buy'
          THEN leaderboard.current_gain - NEW.total_trade_fiat
        WHEN NEW.order_type = 'sell'
          THEN leaderboard.current_gain + NEW.total_trade_fiat
      END)
      WHERE leaderboard.coin_id = NEW.coin_id AND leaderboard.trader_id = NEW.trader_id;

CREATE RULE update_current_gain_USD_leaderboard AS ON INSERT TO transactions DO ALSO
  INSERT INTO leaderboard
  (trader_id, coin_id, current_gain, highest_total_gains) VALUES (NEW.trader_id, NEW.coin_id, 0, 0)
  ON CONFLICT (trader_id, coin_id)
    DO UPDATE
      SET current_gain = (
      CASE
        WHEN  NEW.order_type = 'buy'
          THEN leaderboard.current_gain - NEW.total_trade_fiat
        WHEN NEW.order_type = 'sell'
          THEN leaderboard.current_gain + NEW.total_trade_fiat
      END)
      WHERE leaderboard.coin_id = 1 AND leaderboard.trader_id = NEW.trader_id;


CREATE RULE update_highest_total_gains_leaderboard AS ON UPDATE TO leaderboard DO ALSO
  UPDATE leaderboard
    SET highest_total_gains = (
      CASE
        WHEN NEW.current_gain > highest_total_gains
          THEN NEW.current_gain
        ELSE highest_total_gains
      END)
    WHERE leaderboard.coin_id = NEW.coin_id AND leaderboard.trader_id = NEW.trader_id;