CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "email" varchar(200) UNIQUE,
  "verified" boolean
);

CREATE TABLE "passwords" (
  "id" serial PRIMARY KEY,
  "user_id" integer unique,
  "hashed_pw" text
);

CREATE TABLE "tokens" (
    "id" serial PRIMARY KEY,
    "user_id" integer unique,
    "token" text
)

ALTER TABLE "passwords" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "tokens" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

