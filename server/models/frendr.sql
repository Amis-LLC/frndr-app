
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

  CREATE TABLE NewUser (
    _id SERIAL PRIMARY KEY,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    phoneNumber varchar(255),
    email varchar(255) NOT NULL,
    userName varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    location varchar(255) NOT NULL,
    profilePicture varchar(255),
    acceptedHangoutsId INT,
    FOREIGN KEY (acceptedHangoutsId) REFERENCES NewHangouts ("_id")
  )

  CREATE TABLE NewHangouts (
    _id SERIAL PRIMARY KEY,
    title varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    markerImg varchar(255),
    lat Decimal(8,6),
    lng Decimal(9,6),
    emojiString varchar(255),
    status varchar(255),   
    creatorId INT NOT NULL,
    FOREIGN KEY (creatorId) REFERENCES NewUser ("_id"),   //we need to add later
  )


