const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const Utils = require('./utils')



class DatabaseManager {
    constructor() {
        const dbDir = path.resolve(__dirname, '../data');
        if (!fs.existsSync(dbDir)) {
            fs.mkdirSync(dbDir, { recursive: true });
        }
        
        this.dbPath = path.join(dbDir, 'db.sqlite');
        this.db = null;
    }

    connect(){
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(this.dbPath, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }

    init(){
        return new Promise((resolve, reject) => {
            this.db.run(`
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY,
                name VARCHAR(250) NOT NULL,
                title VARCHAR(250) NOT NULL,
                time TIME NOT NULL,
                status VARCHAR(250) NOT NULL,
                createdAt DATETIME NOT NULL
            )`, 
            (err) => {
                if (err) return reject(err);
                resolve();
            }); 
        });
    }

    addNewTask( title ){
        let titleSlug = Utils.slugify( title );
        return new Promise((resolve, reject) => {
            let query = `INSERT INTO tasks (name, title, time, status, createdAt)
            VALUES ( ?, ?, '00:00:00', 'in_progress', datetime() );`;
            this.db.run( query, [ titleSlug, title], (err) => {
                if (err) return reject(err);
                resolve();
            } )
        }); 
    }

    getAllTasks(){
        return new Promise((resolve, reject) => {
            let query = ``;
            this.db.get( query, (err) => {
                if (err) return reject(err);
                resolve();
            } )
        });
    }
    
    close() {
        return new Promise((resolve, reject) => {
            if (!this.db) return resolve();
            this.db.close((err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}


module.exports = DatabaseManager;