class Users { 
    constructor(dao) { 
        this.dao = dao 
    } 
    
    createTable() { 
        const sql = ` 
        CREATE TABLE IF NOT EXISTS users ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, passwrord TEXT, native INTEGER, interestng TEXT)` 
        return this.dao.run(sql) 
    } 

    create(name, password, native, interestng) { 
        return this.dao.run('INSERT INTO users (name, password, native, interesting) VALUES (?, ?, ?, ?)', [name, password, native, interestng]) 
    } 

    update(project) { 
        const { id, name, password, native, interestng } = project 
        return this.dao.run(`UPDATE users SET name = ?, 
        password = ?, 
        native = ?, 
        interestng = ?  WHERE id = ?`, [name, password, native, interestng, id]) 
    }
    
    getById(id) { 
        return this.dao.get( 
        `SELECT * FROM users WHERE id = ?`, 
        [id]) 
    } 

    getAll() { 
        return this.dao.all(`SELECT * FROM users WHERE interestng = ?`, [interestng]) 
    } 
} 
    
module.exports = Users; 
