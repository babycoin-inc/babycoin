CREATE TABLE IF NOT EXISTS trader (
  id SERIAL,
  username VARCHAR(50),
  password VARCHAR(100),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS coins (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  acronym VARCHAR(50) NOT NULL,
  image VARCHAR(255),
  description TEXT,
  latest_price DECIMAL NOT NULL,
  price_change_percentage NUMERIC NOT NULL
);

CREATE TABLE IF NOT EXISTS trader_watchlist (
  id SERIAL PRIMARY KEY,
  trader_id INTEGER REFERENCES trader(id) UNIQUE,
  watchlist VARCHAR[]
);

CREATE TABLE IF NOT EXISTS portfolio (
  portfolio_id SERIAL PRIMARY KEY,
  trader_id INTEGER NOT NULL,
  coin_id INTEGER NOT NULL,
  dollar_cost DECIMAL NOT NULL,
  avg_price DECIMAL NOT NULL,
  quantity DECIMAL NOT NULL,
  UNIQUE (trader_id, coin_id),
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
  lesson VARCHAR(255) NULL,
  points INTEGER NOT NULL,
  icon VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS trader_achievements (
  id SERIAL PRIMARY KEY,
  trader_id INTEGER REFERENCES trader(id),
  achievement_id INTEGER REFERENCES achievements(id),
  UNIQUE (trader_id, achievement_id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP(2)
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
  purchase_price DECIMAL NOT NULL,
  total_trade_fiat DECIMAL NOT NULL,
  total_trade_coin DECIMAL NOT NULL,
  order_datetime timestamp with time zone,
  trader_id INTEGER NOT NULL,
  coin_id INTEGER NOT NULL,
  CONSTRAINT fk_trader
    FOREIGN KEY(trader_id)
      REFERENCES trader(id),
  CONSTRAINT fk_coin
    FOREIGN KEY(coin_id)
      REFERENCES coins(id)
);

CREATE TABLE IF NOT EXISTS leaderboard (
  id SERIAL PRIMARY KEY,
  trader_id INTEGER REFERENCES trader(id),
  coin_id INTEGER REFERENCES coins(id),
  current_realized_gains DECIMAL,
  alltime_realized_gains DECIMAL,
  UNIQUE (trader_id, coin_id)
);

CREATE TABLE IF NOT EXISTS newsfeed (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  arthur VARCHAR(200) NOT NULL,
  URL VARCHAR(200) NOT NULL,
  tickers TEXT [] NOT NULL,
  image_url VARCHAR(200) NOT NULL,
  publish_date timestamptz,
  topics TEXT,
  type TEXT,
  sentiment TEXT
);

-- CREATE RULE update_leaderboard_on_insert_transactions AS ON INSERT TO transactions DO ALSO
--   (
--   INSERT INTO leaderboard
--   (trader_id, coin_id, current_realized_gains, alltime_realized_gains) VALUES (NEW.trader_id, 1, 0, 0)
--   ON CONFLICT (trader_id, coin_id)
--     DO NOTHING;

--   INSERT INTO leaderboard
--   (trader_id, coin_id, current_realized_gains, alltime_realized_gains) VALUES (NEW.trader_id, NEW.coin_id, 0, 0)
--   ON CONFLICT (trader_id, coin_id)
--     DO NOTHING;

--   UPDATE leaderboard
--       SET current_realized_gains = (
--       CASE
--         WHEN NEW.order_type = 'sell'
--           THEN current_realized_gains - (NEW.total_trade_coin * ((
--             SELECT portfolio.avg_price
--             FROM portfolio
--             WHERE trader_id = NEW.trader_id AND coin_id = NEW.coin_id) - NEW.purchase_price))
--       END)
--       WHERE leaderboard.coin_id = NEW.coin_id AND leaderboard.trader_id = NEW.trader_id;

--   UPDATE leaderboard
--       SET current_realized_gains = (
--       CASE
--         WHEN NEW.order_type = 'sell'
--           THEN current_realized_gains - (NEW.total_trade_coin * ((
--             SELECT portfolio.avg_price
--             FROM portfolio
--             WHERE trader_id = NEW.trader_id AND coin_id = NEW.coin_id) - NEW.purchase_price))
--       END)
--       WHERE leaderboard.coin_id = 1 AND leaderboard.trader_id = NEW.trader_id;

--   UPDATE leaderboard
--     SET alltime_realized_gains = (
--       CASE
--         WHEN leaderboard.current_realized_gains > alltime_realized_gains
--           THEN leaderboard.current_realized_gains
--         ELSE alltime_realized_gains
--       END)
--     WHERE leaderboard.coin_id = NEW.coin_id AND leaderboard.trader_id = NEW.trader_id;

--   UPDATE leaderboard
--   SET alltime_realized_gains = (
--     CASE
--       WHEN leaderboard.current_realized_gains > alltime_realized_gains
--         THEN leaderboard.current_realized_gains
--       ELSE alltime_realized_gains
--     END)
--   WHERE leaderboard.coin_id = 1 AND leaderboard.trader_id = NEW.trader_id;
--   );
