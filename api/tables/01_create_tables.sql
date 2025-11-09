CREATE TABLE Cookies (
    ID         INTEGER  PRIMARY KEY AUTOINCREMENT,
    GiverID    TEXT NOT NULL,
    ReceiverID TEXT NOT NULL
);

CREATE TABLE Blacklist (
    ID               INTEGER  PRIMARY KEY AUTOINCREMENT,
    BlacklistedUserDiscordID    TEXT NOT NULL,
    Expires          BOOLEAN NOT NULL,
    ExpirationDate   TEXT NOT NULL
);

CREATE TABLE Users (
    ID INTEGER  PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    DiscordID INTEGER NOT NULL UNIQUE
);

CREATE TABLE Builds (
    ID INTEGER  PRIMARY KEY AUTOINCREMENT,
    UserID INTEGER NOT NULL,
    Name TEXT,
    Description TEXT,
    Settings TEXT,
    Data TEXT, -- in reality these text data types i will use for stringified json
    FOREIGN KEY(UserID) REFERENCES Users(ID)
);

CREATE TABLE BotExtra (
    ID INTEGER  PRIMARY KEY AUTOINCREMENT,
    Data TEXT
);