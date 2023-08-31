
//import env files for database connection
// The code above creates a connection pool to the database, which is used to read and write data to the database. The createPool function creates a connection pool that can be used to create connections to the database. The pool variable is the connection pool that is used to create connections to the database.

import { SECRET_DATABASE_URL, SECRET_DATABASE_PORT, SECRET_DATABASE_USER, SECRET_DATABASE_PASSWORD, SECRET_DATABASE_NAME } from '$env/static/private';
import mariadb from "mariadb";

class database{
    constructor() {
        this.pool = mariadb.createPool({
            host: SECRET_DATABASE_URL,
            port: SECRET_DATABASE_PORT,
            user: SECRET_DATABASE_USER,
            password: SECRET_DATABASE_PASSWORD,
            database: SECRET_DATABASE_NAME,
            connectionLimit: 5
        });
    }

    async query(sql, values) {
        let conn;
        let rows = [];
        try {
            conn = await this.pool.getConnection();
            rows = await conn.query(sql, values);
        }
        catch (err) {
            throw err;
        }
        finally {
            if (conn){
                conn.end();
            }
            console.log(rows);
            return rows;
        }
    }

    async get(sql, values) {
        let conn;
        let rows = [];
        try {
            conn = await this.pool.getConnection();
            rows = await conn.query(sql, values);
        }
        catch (err) {
            throw err;
        }
        finally {
            if(conn){
                conn.end();
            }
            return rows;
        }

    }
    async insert(sql, values) {
        let conn;
        let rows = [];
        try {
            conn = await this.pool.getConnection();
            rows = await conn.query(sql, values);
        }
        catch (err) {
            throw err;
        }
        finally {
            if (conn){
                conn.end();
            }
            return rows.insertId;
        }
    }

    async update(sql, values) {
        let conn;
        let rows = [];
        try {
            conn = await this.pool.getConnection();
            rows = await conn.query(sql, values);
        }
        catch (err) {
            throw err;
        }
        finally {
            if (conn){
                conn.end();
            }
            return rows;
        }
    }

    async delete(sql, values) {
        let conn;
        let rows = [];
        try {
            conn = await this.pool.getConnection();
            rows = await conn.query(sql, values);
        }
        catch (err) {
            throw err;
        }
        finally {
            if (conn) {
                conn.end();
            }
            return rows;
        }

    }

    async toggleGameEnabled(id) {
        try {
            const game = await this.get('SELECT * FROM games WHERE id = ?', [id]);
            let enabled = 0;
            if (!game) {
                return false;
            }
            if(game[0].Enabled == 1){
                enabled = 0;
            }else{
                enabled = 1;
            }
            const result = await this.update('UPDATE games SET enabled = ? WHERE id = ?', [enabled,id]);
            return result;
        } catch (err) {
            throw err;
        }

    }
    
}

export const db = new database();


