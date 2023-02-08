
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



CREATE TABLE public.Statuses (
	"_id" serial NOT NULL,
	"statusName" varchar(255),
    CONSTRAINT "status_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.Pictures (
	"_id" serial NOT NULL,
	"picture" varchar,
    "emojiString" varchar,
    CONSTRAINT "picture_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.Locations (
	"_id" serial NOT NULL,
  "location" varchar NOT NULL,
	CONSTRAINT "location_pk" PRIMARY KEY ("_id")

) WITH (
  OIDS=FALSE
);

-- CREATE TABLE toDoList (
--    _id SERIAL PRIMARY KEY,
--    name VARCHAR(255) NOT NULL,
--    projectId INT NOT NULL,
--    description TEXT NOT NULL,
-- FOREIGN KEY (projectId) REFERENCES project(_id));

  CREATE TABLE Users (
    "_id" SERIAL PRIMARY KEY,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    phoneNumber varchar(255),
    email varchar(255) NOT NULL,
    userName varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    statusname varchar(255),
    locationref bigint,
    statusref bigint,
    pictureref bigint,
    hangoutref bigint,
    FOREIGN KEY (locationref) REFERENCES Locations ("_id"),
    FOREIGN KEY (statusref) REFERENCES Statuses ("_id"),
    FOREIGN KEY (pictureref) REFERENCES Pictures ("_id"),
    FOREIGN KEY (hangoutref) REFERENCES Hangout ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.Hangout (
	"_id" serial NOT NULL,
	"statusRef" varchar NOT NULL,
	"userRef" varchar NOT NULL,
    "locationRef" varchar NOT NULL,
    "pictureRef" varchar NOT NULL,
	CONSTRAINT "hangout_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);


