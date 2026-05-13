const sqlite3 = require('sqlite3').verbose();
const db      = new sqlite3.Database('./demonslayerdb.sqlite');

db.serialize(() => {
    // Users Table
    db.run(`CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT    
    )`);
    
    // Seasons Table
    db.run(`CREATE TABLE IF NOT EXISTS seasons(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT UNIQUE,
        episodes INTEGER,
        release_year INTEGER
    )`);

    // Characters Table
    db.run(`CREATE TABLE IF NOT EXISTS characters(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE,
        role TEXT,
        breathing_style TEXT
    )`);

    // Movies Table
    db.run(`CREATE TABLE IF NOT EXISTS movies(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT UNIQUE,
        duration_min INTEGER,
        release_year INTEGER
    )`);
});

module.exports = db;