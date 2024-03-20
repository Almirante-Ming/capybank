CREATE TABLE IF NOT EXISTS users(name varchar(45) NOT NULL UNIQUE, passphase varchar(22) NOT NULL);
INSERT INTO users(name, passphase) VALUES ('warmup', 'warmup');
DELETE FROM users;
