-- Create Users Table
CREATE TABLE Users (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    FirstName TEXT NOT NULL,
    LastName TEXT NOT NULL,
    Email TEXT NOT NULL,
    PhoneNumber TEXT NOT NULL,
    Gender TEXT NOT NULL,
    IsActive INTEGER NOT NULL
);

-- Create Todos Table
CREATE TABLE Todos (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Title TEXT NOT NULL,
    DueOn TEXT,  -- Use TEXT for DateTime in SQLite
    IsCompleted INTEGER NOT NULL,
    UserId INTEGER NOT NULL
);
