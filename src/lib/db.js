
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
        try {
            conn = await this.pool.getConnection();
            const rows = await conn.query(sql, values);
            return rows;
        }
        catch (err) {
            console.log("Error");
            console.log(err);
            throw err;
        }
        finally {
            console.log("Fn closed");
            if (conn) return conn.end();
        }
    }

    async get(sql, values) {
        let conn;
        try {
            conn = await this.pool.getConnection();
            const rows = await conn.query(sql, values);
            return rows;
        }
        catch (err) {
            console.log("Error"); 
            console.log(err);
            throw err;
        }
        finally {
            conn.end();
            console.log("Connection closed");
        }

    }
    async insert(sql, values) {
        let conn;
        try {
            conn = await this.pool.getConnection();
            const rows = await conn.query(sql, values);
            return rows.insertId;
        }
        catch (err) {
            throw err;
        }
        finally {
            if (conn) return conn.end();
        }
    }

    async update(sql, values) {
        let conn;
        try {
            conn = await this.pool.getConnection();
            const rows = await conn.query(sql, values);
            console.log("rows changed: " + rows.changedRows);
            return rows.changedRows;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
        finally {
            console.log("Update Connection closed");
            if (conn) return conn.end();
        }
    }

    async delete(sql, values) {
        let conn;
        try {
            conn = await this.pool.getConnection();
            const rows = await conn.query(sql, values);
            return rows.affectedRows;
        }
        catch (err) {
            throw err;
        }
        finally {
            if (conn) return conn.end();
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


